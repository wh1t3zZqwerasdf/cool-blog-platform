const User = require('../models/User');
const Response = require('../utils/response');

/**
 * 获取用户列表
 * @param {Object} req Express 请求对象
 * @param {Object} res Express 响应对象
 */
async function getUserList(req, res) {
  try {
    console.log('获取用户列表 - 请求参数:', req.body);
    // 获取分页参数和角色参数
    const { page = 1, pageSize = 10, role } = req.body;
    
    // 计算跳过的文档数
    const skip = (Number(page) - 1) * Number(pageSize);
    console.log('分页参数:', { page, pageSize, skip });
    
    // 构建查询条件
    const query = {};
    if (role) {
      // 如果提供了角色，添加到查询条件中（不区分大小写）
      query.role = role.toLowerCase();
    }
    console.log('查询条件:', query);
    
    // 获取总数
    const total = await User.countDocuments(query).catch(error => {
      console.error('获取用户总数失败:', error);
      throw error;
    });
    
    // 查询用户列表，排除密码字段
    const list = await User.find(query)
      .select('username email role createdAt')  // 只选择需要的字段
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })  // 按创建时间倒序
      .lean().catch(error => {
        console.error('获取用户列表失败:', error);
        throw error;
      });  // 转换为普通 JavaScript 对象
    
    // 处理返回的数据
    const formattedList = list.map(user => ({
      id: user._id.toString(),  // 将 ObjectId 转换为字符串
      username: user.username,
      email: user.email,
      role: user.role || 'guest',
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

module.exports = {
  getUserList
};
