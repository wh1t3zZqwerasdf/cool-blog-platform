/**
 * 统一响应格式
 */
class Response {
    static success(res, data = null, message = '操作成功') {
        return res.json({
            code: 200,
            success: true,
            message,
            data
        });
    }

    static error(res, message = '操作失败', code = 400) {
        return res.json({
            code,
            success: false,
            message,
            data: null
        });
    }

    static serverError(res) {
        return this.error(res, '服务器内部错误', 500);
    }

    static unauthorized(res) {
        return this.error(res, '未授权访问', 401);
    }

    static forbidden(res) {
        return this.error(res, '禁止访问', 403);
    }

    static notFound(res) {
        return this.error(res, '资源不存在', 404);
    }
}

module.exports = Response;
