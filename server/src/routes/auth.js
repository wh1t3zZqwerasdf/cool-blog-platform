const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const { authenticateToken } = require('../middleware/auth')

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - 认证
 *     summary: 用户注册
 *     description: 注册新用户
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 邮箱地址
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 密码
 *     responses:
 *       201:
 *         description: 注册成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 注册成功
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 userInfo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: 用户名或邮箱已存在
 *       500:
 *         description: 服务器错误
 */
router.post('/register', authController.register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - 认证
 *     summary: 用户登录
 *     description: 使用用户名/邮箱和密码登录
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名（用户名和邮箱二选一）
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 邮箱地址（用户名和邮箱二选一）
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 密码
 *     responses:
 *       200:
 *         description: 登录成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 userInfo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: 用户名/邮箱或密码错误
 *       500:
 *         description: 服务器错误
 */
router.post('/login', authController.login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - 认证
 *     summary: 用户登出
 *     description: 退出登录
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 登出成功
 *       401:
 *         description: 未授权
 *       500:
 *         description: 服务器错误
 */
router.post('/logout', authenticateToken, authController.logout)

module.exports = router
