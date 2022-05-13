import request from '../../utils/request'

/**
 * 分类列表
 */
export function listSpuWithPage(params) {
    return request({
        url: '/product/app/goods/page',
        params,
        method: 'GET',
        headers: {
            'auth': true
        }
    })
}

/**
 * 获取商品详情
 *
 * @param {Object} spuId
 */
export function getSpuDetail(spuId) {
    return request({
        url: '/product/app/goods/' + spuId,
        method: 'get',
        headers: {
            'auth': true
        }
    })
}
