const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Response = require('../utils/response');

// 注册
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // 检查用户名是否已存在
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json(Response.error('用户名已存在'));
        }

        // 检查邮箱是否已存在
        const existingEmail = await User.findOne({ email: email.toLowerCase() });
        if (existingEmail) {
            return res.status(400).json(Response.error('邮箱已被注册'));
        }

        // 验证角色
        const validRole = role === 'admin' ? 'admin' : 'guest';

        // 创建新用户
        const user = new User({
            username,
            email: email.toLowerCase(),
            password,
            role: validRole
        });

        await user.save();

        // 生成token
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return Response.success(res, {
            token,
            userInfo: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }, '注册成功');
    } catch (error) {
        console.error('Registration error:', error);
        return Response.serverError(res);
    }
};

// 登录
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 查找用户
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json(Response.error('用户不存在'));
        }

        // 验证密码
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json(Response.error('密码错误'));
        }

        // 生成token
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return Response.success(res, {
            token,
            userInfo: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }, '登录成功');
    } catch (error) {
        console.error('Login error:', error);
        return Response.serverError(res);
    }
};

// 退出登录
exports.logout = async (req, res) => {
    try {
        // 这里可以添加token黑名单等逻辑
        res.json(Response.success(null, '退出成功'));
    } catch (error) {
        console.error('Logout error:', error);
        res.json(Response.serverError());
    }
};

// 获取用户信息
exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.json(Response.error('用户不存在'));
        }

        res.json(Response.success({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }));
    } catch (error) {
        console.error('Get user info error:', error);
        res.json(Response.serverError());
    }
};
