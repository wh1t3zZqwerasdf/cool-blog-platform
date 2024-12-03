const express = require('express');
const router = express.Router();
const { getUserList } = require('../controllers/user');
const { authenticateToken } = require('../middleware/auth');

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
 * /api/users:
 *   post:
 *     summary: 获取用户列表
 *     description: 获取系统中的用户列表，支持分页和角色筛选
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 description: 页码
 *               pageSize:
 *                 type: number
 *                 description: 每页数量
 *               role:
 *                 type: string
 *                 enum: [admin, guest]
 *                 description: 用户角色（可选）
 *     responses:
 *       200:
 *         description: 成功返回用户列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     list:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     total:
 *                       type: number
 *                     page:
 *                       type: number
 *                     pageSize:
 *                       type: number
 */

// 获取用户列表
router.post('/list', authenticateToken, getUserList);

module.exports = router;
