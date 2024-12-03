const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require('dotenv').config();

// 导入路由
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// Swagger文档
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 打印环境变量（不包含敏感信息）
console.log('环境变量检查:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI ? '已设置' : '未设置',
    JWT_SECRET: process.env.JWT_SECRET ? '已设置' : '未设置'
});

// 数据库连接
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('MongoDB connected 数据库连接成功');
    console.log('数据库连接状态:', mongoose.connection.readyState);
})
.catch(err => {
    console.error('MongoDB connection error 数据库连接失败:', err);
    console.error('连接字符串检查:', process.env.MONGODB_URI ? '已提供' : '未提供');
});

// 基础路由
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to Cool Blog API',
        docs: 'Access API documentation at /api-docs'
    });
});

// API路由注册
console.log('注册路由...');
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);
console.log('路由注册完成');

// 404处理
app.use((req, res, next) => {
    console.log('404 - 未找到路由:', req.method, req.url);
    res.status(404).json({ message: '未找到请求的资源' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('全局错误处理:', err);
    res.status(500).json({ message: '服务器内部错误' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
