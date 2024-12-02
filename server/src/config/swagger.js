const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Blog backend',
    },
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              example: 400
            },
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: '操作失败'
            },
            data: {
              type: 'null',
              example: null
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              example: 200
            },
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: '操作成功'
            },
            data: {
              type: 'object'
            }
          }
        },
        UserInfo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '674d5247e39a224953bdf393'
            },
            username: {
              type: 'string',
              example: 'admin'
            },
            email: {
              type: 'string',
              example: 'admin@example.com'
            },
            role: {
              type: 'string',
              example: 'admin'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              example: 200
            },
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: '登录成功'
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                userInfo: {
                  $ref: '#/components/schemas/UserInfo'
                }
              }
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'], // 路由文件的路径
};

const specs = swaggerJsdoc(options);

module.exports = specs;
