import request  from '../../utils/request'

/**
 * 分类列表
 */
export function listSpuWithPage (params) {
    return request({
        url: '/product/app/goods/page',
        params,
        method: 'GET',
        headers: {
            'auth': true
        }
    })
}

