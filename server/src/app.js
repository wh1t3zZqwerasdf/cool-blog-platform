const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require('dotenv').config();

const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/auth');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// Swagger文档
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 数据库连接
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// 路由
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to Cool Blog API',
        docs: 'Access API documentation at /api-docs'
    });
});

// API路由
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: '服务器内部错误' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
