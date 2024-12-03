const express = require('express');
const router = express.Router();
const { getUserList, getUsersByRole } = require('../controllers/user');
const { authenticateToken, isAdmin } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 用户ID
 *         username:
 *           type: string
 *           description: 用户名
 *         email:
 *           type: string
 *           description: 邮箱
 *         role:
 *           type: string
 *           enum: [Admin, Guest]
 *           description: 用户角色
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 创建时间
 */

/**
 * @swagger
 * /api/users/test:
 *   get:
 *     summary: 测试用户路由
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 成功
 */
// 测试路由 - 不需要认证
router.get('/test', (req, res) => {
    res.json({ message: '用户路由测试成功' });
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 获取用户列表
 *     description: 获取系统中的用户列表，支持分页
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 当前页码
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 每页条数
 *     responses:
 *       200:
 *         description: 成功获取用户列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 0
 *                 msg:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     list:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           description: 总记录数
 *                         page:
 *                           type: integer
 *                           description: 当前页码
 *                         pageSize:
 *                           type: integer
 *                           description: 每页条数
 *       401:
 *         description: 未授权访问
 *       500:
 *         description: 服务器错误
 */

// 获取用户列表
router.get('/', authenticateToken, getUserList);

// 根据角色查询用户
router.post('/by-role', authenticateToken, getUsersByRole);

module.exports = router;
