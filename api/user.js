/**
 * 用户相关api
 */
import request from "../utils/request";

// #ifdef MP
export function login(parameter) {
    // 密码模式
    const grant_type = 'password'

    return request({
        url: '/auth/oauth/token',
        method: 'post',
        data: parameter,
        headers: {
            // mall-app:123456
            'Authorization': 'Basic bWFsbC1hcHA6MTIzNDU2'
        },
        params: {grant_type, username: parameter.username, password: parameter.password}
    })
}
// #endif

// #ifndef MP
export function login(parameter) {
    return request({
        url: '/auth/oauth/token',
        method: 'post',
        headers: {
            // mall-app:123456
            'Authorization': 'Basic bWFsbC1hcHA6MTIzNDU2'
        },
        params: {
            mobile: parameter.mobile,
            code: parameter.code,
            grant_type: 'sms_code'
        }
    })
}
// #endif


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

