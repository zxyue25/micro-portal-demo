
window.globalVariables = window.globalVariables || {};
delete window.globalVariables.NODE_ENV

const {
    VUE_APP_ABTEST_URL = '',
    VUE_APP_AUTH_URL = '',
    VUE_APP_RES_URL = '',
    VUE_APP_LEGO_URL = '',
    VUE_APP_MOLO_URL = '',

    VUE_APP_CDN_URL = '',
    VUE_APP_LOGIN_URL  = '',
    VUE_APP_LOGOUT_URL = '',
    VUE_APP_CROWD_URL = '',
    ...othersEnv
} = { ...process.env, ...window.globalVariables };

// 所有环境变量
const obEnv = {
    ...othersEnv,
    VUE_APP_ABTEST_URL, // abtest
    VUE_APP_AUTH_URL, // 权限管理
    VUE_APP_RES_URL, // 资源管理
    VUE_APP_LEGO_URL, // 乐高
    VUE_APP_MOLO_URL, // 摹略

    VUE_APP_CROWD_URL, // 人群标签
    VUE_APP_LOGOUT_URL, // 退登地址
    VUE_APP_LOGIN_URL, // 登录地址
    VUE_APP_CDN_URL, // 图片 cdn 地址
};

export default obEnv;

