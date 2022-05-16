/**
 * 用户相关api
 */
import request from "../utils/request";

export function login(parameter) {
    // 密码模式
    const grant_type = 'password'

    return request({
        url: '/auth/oauth/token',
        method: 'post',
        data: parameter,
        headers: {
            // 'Authorization': 'Basic c3dhZ2dlcjoxMjM0NTY=' // swagger:123456 避免验证验证码 http://localhost:8301/auth/captcha?key=77777439生成验证码
            // fxz:123456
            'Authorization': 'Basic bWFsbC1hcHA6MTIzNDU2'
        },
        params: {grant_type, username: parameter.username, password: parameter.password}
    })
}

export function getUserInfo () {
    return request({
        url: '/system/user/info',
        method: 'get',
		params: { client_id:'mall-app' },
        headers: {
            'auth': true
        }
    })
}

export function logout() {
    return request({
        url: '/auth/myLogout',
        method: 'delete',
        headers: {
            'auth': true // 需要认证，通过
        }
    })
}

export function sendSmsCode(phoneNumber) {
    return request({
        url: '/youlai-auth/sms-code',
        method: 'post',
        params: {
            phoneNumber: phoneNumber
        }
    })
}
