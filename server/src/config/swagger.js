const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cool Blog API',
            version: '1.0.0',
            description: 'Cool Blog 的API文档',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: '开发服务器',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        }
    },
    apis: ['./src/routes/*.js'], // API路由文件的位置
};

const specs = swaggerJsdoc(options);

module.exports = specs;
