const jwt = require('jsonwebtoken');
const Response = require('../utils/response');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return Response.unauthorized(res);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token验证失败:', err);
            return Response.unauthorized(res);
        }
        req.user = user;
        next();
    });
}

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

module.exports = {
    authenticateToken,
    isAdmin: exports.isAdmin
};
