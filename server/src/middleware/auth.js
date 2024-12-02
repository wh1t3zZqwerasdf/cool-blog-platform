const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 验证 JWT token
exports.authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: '未提供认证令牌' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: '令牌已过期，请重新登录' });
        }
        return res.status(403).json({ message: '无效的认证令牌' });
    }
};

// 检查管理员权限
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: '需要管理员权限' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
