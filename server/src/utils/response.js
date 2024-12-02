/**
 * 统一响应格式
 */
class Response {
    static success(data = null, message = '操作成功') {
        return {
            code: 200,
            success: true,
            message,
            data
        }
    }

    static error(message = '操作失败', code = 400) {
        return {
            code,
            success: false,
            message,
            data: null
        }
    }

    static serverError(message = '服务器内部错误') {
        return this.error(message, 500)
    }

    static unauthorized(message = '未授权') {
        return this.error(message, 401)
    }

    static forbidden(message = '无权限访问') {
        return this.error(message, 403)
    }
}

module.exports = Response;
