const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - summary
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: 文章标题
 *         content:
 *           type: string
 *           description: 文章内容
 *         summary:
 *           type: string
 *           description: 文章摘要
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: 文章标签
 *         category:
 *           type: string
 *           description: 文章分类
 *         coverImage:
 *           type: string
 *           description: 封面图片URL
 *         published:
 *           type: boolean
 *           description: 是否发布
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: 获取所有文章
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: 成功获取文章列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/', articleController.getAllArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: 获取单个文章
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 文章ID
 *     responses:
 *       200:
 *         description: 成功获取文章
 *       404:
 *         description: 文章不存在
 */
router.get('/:id', articleController.getArticle);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: 创建新文章
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: 文章创建成功
 *       401:
 *         description: 未授权
 *       403:
 *         description: 没有权限
 */
router.post('/', authenticateToken, isAdmin, articleController.createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: 更新文章
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 文章ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: 文章更新成功
 *       401:
 *         description: 未授权
 *       403:
 *         description: 没有权限
 *       404:
 *         description: 文章不存在
 */
router.put('/:id', authenticateToken, isAdmin, articleController.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: 删除文章
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 文章ID
 *     responses:
 *       200:
 *         description: 文章删除成功
 *       401:
 *         description: 未授权
 *       403:
 *         description: 没有权限
 *       404:
 *         description: 文章不存在
 */
router.delete('/:id', authenticateToken, isAdmin, articleController.deleteArticle);

module.exports = router;
