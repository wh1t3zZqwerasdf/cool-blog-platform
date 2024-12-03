const User = require('../models/User');
const Response = require('../utils/response');

/**
 * 获取用户列表
 * @param {Object} req Express 请求对象
 * @param {Object} res Express 响应对象
 */
async function getUserList(req, res) {
  try {
    console.log('获取用户列表 - 请求参数:', req.query);
    // 获取分页参数
    const { page = 1, pageSize = 10 } = req.query;
    
    // 计算跳过的文档数
    const skip = (Number(page) - 1) * Number(pageSize);
    console.log('分页参数:', { page, pageSize, skip });
    
    // 获取总数
    const total = await User.countDocuments({});
    
    // 查询用户列表，排除密码字段
    const list = await User.find({})
      .select('username email role createdAt')  // 只选择需要的字段
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })  // 按创建时间倒序
      .lean();  // 转换为普通 JavaScript 对象
    
    // 处理返回的数据
    const formattedList = list.map(user => ({
      id: user._id.toString(),  // 将 ObjectId 转换为字符串
      username: user.username,
      email: user.email,
      role: user.role || 'user',
      createdAt: user.createdAt
    }));

    // 返回带有总数的响应
    return Response.success(res, {
      list: formattedList,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    });
  } catch (error) {
    console.error('获取用户列表失败:', error);
    return Response.serverError(res);
  }
}

/**
 * @swagger
 * /api/users/by-role:
 *   post:
 *     summary: 根据角色查询用户
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [Admin, Guest]
 *                 description: 用户角色
 *               page:
 *                 type: number
 *                 description: 页码
 *               pageSize:
 *                 type: number
 *                 description: 每页数量
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
async function getUsersByRole(req, res) {
  try {
    const { role, page = 1, pageSize = 10 } = req.body;
    console.log('按角色查询用户 - 请求参数:', { role, page, pageSize });

    // 验证角色是否有效，统一转换为小写进行比较
    const validRoles = ['admin', 'guest'];
    if (!validRoles.includes(role.toLowerCase())) {
      return Response.error(res, '无效的角色类型');
    }

    // 计算跳过的文档数
    const skip = (Number(page) - 1) * Number(pageSize);

    // 构建查询条件，使用小写进行匹配
    const query = { role: role.toLowerCase() };
    console.log('查询条件:', query);

    // 获取总数
    const total = await User.countDocuments(query);
    console.log('符合条件的用户总数:', total);

    // 查询用户列表
    const list = await User.find(query)
      .select('username email role createdAt')
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })
      .lean();

    console.log('查询结果:', list);

    // 处理返回的数据
    const formattedList = list.map(user => ({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }));

    return Response.success(res, {
      list: formattedList,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    });
  } catch (error) {
    console.error('获取用户列表失败:', error);
    return Response.serverError(res);
  }
}

module.exports = {
  getUserList,
  getUsersByRole
};
