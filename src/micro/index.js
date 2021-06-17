import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  removeGlobalUncaughtErrorHandler,
  initGlobalState,
  start as s,
} from 'qiankun'
import { initEvent } from './event'
import { Loading, Message } from 'element-ui'
import subAppList from './app'
import store from '@/store'

const initialState = {
  preActiveApp: store.state.preActiveApp,
}

// 主应用与子应用通信
const actions = initGlobalState(initialState)
actions.onGlobalStateChange((state) => {
  //监听公共状态的变化
  store.commit('CHANGE_PREACTIVEAPP', state.preActiveApp)
})

const consoleStyle = 'color:#fff;background:#2c68ff;line-height:28px;padding:0 40px;font-size:16px;'

/**
 * 注册-子应用集合
 * @param subAppList
 */
export const register = () => {
  let loading
  try {
    const subApps = subAppList.map((subApp) => {
      const { APP_NAME, FE_ADDRESS } = subApp
      return {
        name: APP_NAME,
        entry:
          process.env.VUE_APP_ENV === 'production'
            ? `/${APP_NAME}`
            : FE_ADDRESS,
        container: '#micro-sub-app',
        activeRule: (location) => location.pathname.startsWith(`/${APP_NAME}`),
        props: { preActiveApp:  store.state.preActiveApp},
      }
    })
    registerMicroApps(subApps, {
      beforeLoad: [
        async (app) => {
          console.log(`%c${app.name} before load`, consoleStyle)
          loading = Loading.service({
            target: '#micro-sub-app',
            lock: true,
            text: ' ',
            spinner: 'base-loading-type1',
            background: 'hsla(0,0%,100%,.8)',
          })
        },
      ],
      beforeMount: [
        async (app) => {
          console.log(`%c${app.name} before mount`, consoleStyle)
          const body = document.getElementsByTagName('body')[0]
          if (body) {
            body.setAttribute('id', app.name)
            body.setAttribute('class', app.name)
          }
        },
      ],
      afterMount: [
        async (app) => {
          console.log(`%c${app.name} after mount`, consoleStyle)
          setTimeout(() => {
            loading.close()
          }, 1000)
        },
      ],
      beforeUnmount: [
        async (app) => {
          actions.setGlobalState({
            preActiveApp: app.name ? app.name : store.state.preActiveApp, // 在上一个微应用卸载前记录appName
          })
        },
      ],
      afterUnmount: [
        async (app) => {
          console.log(`%c${app.name} after unmount`, consoleStyle)
          const body = document.getElementsByTagName('body')[0]
          if (body) {
            body.setAttribute('id', '')
          }
        },
      ],
    })
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * 初始化事件
 */
const microEvent = () => {
  // 监听子应用加载失败
  addGlobalUncaughtErrorHandler((e) => {
    if (
      e instanceof PromiseRejectionEvent ||
      e.message === 'ResizeObserver loop limit exceeded'
    ) {
      return
    }
    const eMessage = e.message || ''
    if (
      eMessage.search('died in status LOADING_SOURCE_CODE') !== -1 ||
      eMessage.search('died in status SKIP_BECAUSE_BROKEN') !== -1
    ) {
      Message({
        message: '系统注册失败，请稍后重试',
        type: 'error',
      })
    } else if (eMessage.search('Failed to fetch') !== -1) {
      Message({
        message: '资源未找到，请检查是否部署',
        type: 'error',
      })
    }
    removeGlobalUncaughtErrorHandler((error) => console.log('remove', error))
  })

  /**
   * 初始化全局事件
   */
  initEvent()
}

microEvent()

function getPublicPath(entry) {
  if (typeof entry === 'object') {
    return '/'
  }
  try {
    // URL 构造函数不支持使用 // 前缀的 url
    const { origin, pathname } = new URL(
      entry.startsWith('//') ? `${location.protocol}${entry}` : entry,
      location.href
    )
    const paths = pathname.split('/')
    const r = `${origin}${paths.join('/')}/`
    return r
  } catch (e) {
    console.warn(e)
    return ''
  }
}

/**
 * 启动路由监听
 * @param prefetch
 * @param appList
 * @returns {Promise<unknown>}
 */
export function start({ prefetch = false } = {}) {
  return new Promise((resolve, reject) => {
    try {
      // 注册
      register()
      // 启动
      s({ prefetch, sandbox: false, getPublicPath })
      resolve()
    } catch (e) {
      Message({
        message: '系统注册失败，请稍后重试',
        type: 'error',
      })
      reject(e)
    }
  })
}
