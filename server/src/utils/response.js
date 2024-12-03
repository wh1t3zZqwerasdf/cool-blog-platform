/**
 * 统一响应格式
 */
class Response {
    static success(res, data = null, message = '操作成功') {
        if (!res || typeof res.json !== 'function') {
            console.error('Response.success: res 参数无效');
            throw new Error('Invalid response object');
        }
        return res.json({
            code: 200,
            success: true,
            message,
            data
        });
    }

    static error(message = '操作失败', code = 400) {
        return {
            code,
            success: false,
            message,
            data: null
        };
    }

    static serverError(res) {
        if (!res || typeof res.json !== 'function') {
            console.error('Response.serverError: res 参数无效');
            throw new Error('Invalid response object');
        }
        return res.status(500).json(this.error('服务器内部错误', 500));
    }

    static unauthorized(res) {
        if (!res || typeof res.json !== 'function') {
            console.error('Response.unauthorized: res 参数无效');
            throw new Error('Invalid response object');
        }
        return res.status(401).json(this.error('未授权访问', 401));
    }

    static forbidden(res) {
        if (!res || typeof res.json !== 'function') {
            console.error('Response.forbidden: res 参数无效');
            throw new Error('Invalid response object');
        }
        return res.status(403).json(this.error('禁止访问', 403));
    }
}

module.exports = Response;
