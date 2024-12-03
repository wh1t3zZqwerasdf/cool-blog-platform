const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Response = require('../utils/response');

// 验证 JWT token
exports.authenticateToken = async (req, res, next) => {
    try {
        console.log('开始验证token...');
        console.log('请求头:', req.headers);
        
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            console.log('未提供Authorization头');
            return res.status(401).json(Response.error('未提供认证令牌', 401));
        }
        
        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log('Authorization头格式错误');
            return res.status(401).json(Response.error('认证令牌格式错误', 401));
        }
        
        console.log('JWT密钥是否存在:', !!process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('token解码成功:', decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token验证失败:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json(Response.error('令牌已过期，请重新登录', 401));
        }
        return res.status(403).json(Response.error('无效的认证令牌', 403));
    }
};

// 检查管理员权限
exports.isAdmin = async (req, res, next) => {
    try {
        console.log('检查管理员权限...');
        console.log('用户信息:', req.user);
        
        const user = await User.findById(req.user.userId);
        console.log('数据库中的用户:', user);
        
        if (!user) {
            console.log('未找到用户');
            return res.status(404).json(Response.error('用户不存在', 404));
        }
        
        if (user.role !== 'admin') {
            console.log('用户不是管理员');
            return res.status(403).json(Response.error('需要管理员权限', 403));
        }
        
        console.log('管理员权限验证通过');
        next();
    } catch (error) {
        console.error('权限检查错误:', error);
        res.status(500).json(Response.error(error.message, 500));
    }
};
