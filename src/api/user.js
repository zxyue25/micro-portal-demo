import restful from '@/utils/https'
const COTENT_TYPE_JSON = 'application/json'

const fetch = (url, data, method, _, contentType) => {
    return restful[method](url, data, {}, contentType === COTENT_TYPE_JSON ? 'json' : 'urlencoded')
}
// 登录
export const getUserInfo = () => fetch('/common/user/info', '', 'get')
// 退出登录
export const logout = () => fetch('/logout','', 'post')