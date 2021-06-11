import env from '@/utils/env'

/**
 * 退出登录
 */
export const logout = () => {
  window.location.href =
    env.VUE_APP_LOGIN_URL + encodeURIComponent(location.href)
}
