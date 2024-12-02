const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// 注册
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 检查用户名是否已存在
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: '用户名已存在' });
        }

        // 检查邮箱是否已存在
        const existingEmail = await User.findOne({ email: email.toLowerCase() });
        if (existingEmail) {
            return res.status(400).json({ message: '邮箱已被注册' });
        }

        // 创建新用户
        const user = new User({
            username,
            email,
            password,
            role: 'admin' // 默认设置为admin角色
        });

        await user.save();

        // 生成token
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: '注册成功',
            token,
            userInfo: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};

// 登录
exports.login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('Login attempt:', { username, email });

        // 查找用户（支持用户名或邮箱登录）
        let query;
        if (username) {
            query = { username }; // 用户名区分大小写
        } else if (email) {
            query = { email: email.toLowerCase() }; // 邮箱不区分大小写
        } else {
            return res.status(400).json({ message: '请提供用户名或邮箱' });
        }

        console.log('Query:', query);
        const user = await User.findOne(query);
        console.log('Found user:', user ? {
            username: user.username,
            email: user.email,
            passwordHash: user.password
        } : 'no');

        if (!user) {
            return res.status(401).json({ message: '用户名/邮箱或密码错误' });
        }

        // 验证密码
        try {
            console.log('Comparing passwords:', {
                provided: password,
                stored: user.password
            });
            const isValidPassword = await bcrypt.compare(password, user.password);
            console.log('Password valid:', isValidPassword);

            if (!isValidPassword) {
                return res.status(401).json({ message: '用户名/邮箱或密码错误' });
            }

            // 生成 token
            const token = jwt.sign(
                { userId: user._id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            // 返回用户信息和token
            res.json({
                token,
                userInfo: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Password verification error:', error);
            return res.status(500).json({ message: '密码验证错误' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};

// 退出登录
exports.logout = async (req, res) => {
    try {
        // 简单返回成功响应
        // 实际的登出操作（清除token）由前端完成
        res.json({ message: '退出成功' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
