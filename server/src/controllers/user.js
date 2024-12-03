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
      role: user.role,
      createdAt: user.createdAt
    }));
    
    // 获取总数
    const total = await User.countDocuments();
    console.log('用户总数:', total);
    
    // 返回结果
    res.json(Response.success({
      list: formattedList,
      total
    }));
  } catch (error) {
    console.error('获取用户列表失败:', error);
    res.status(500).json(Response.error('获取用户列表失败', 500));
  }
}

module.exports = {
  getUserList
};
