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

const consoleStyle =
  'color:#fff;background:#2c68ff;line-height:28px;padding:0 40px;font-size:16px;'

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
        container: '#marketing-sub-app',
        activeRule: (location) => location.pathname.startsWith(`/${APP_NAME}`),
        props: { store },
      }
    })
    registerMicroApps(subApps, {
      beforeLoad: [
        async (app) => {
          console.log(`%c${app.name} before load`, consoleStyle)
          loading = Loading.service({
            target: '#marketing-sub-app',
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
            preActiveApp: app.name ? app.name : store.state.preActiveApp,
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
      // errorPage = true;
      // 临时解决License失效导致的子应用加载错误
      // 问题原因：微前端监听浏览器变化是同步触发事件，校验License发请求是异步事件，导致校验完成跳转失效地址 微前端加载失败
      const excludePaths = ['/expire', '/not-valid']
      const { pathname } = window.location
      if (!excludePaths.includes(pathname)) {
        Message({
          message: '系统注册失败，请稍后重试',
          type: 'error',
        })
      }
    } else if (eMessage.search('Failed to fetch') !== -1) {
      Message({
        message: '资源未找到，请检查是否部署',
        type: 'error',
      })
    }
    removeGlobalUncaughtErrorHandler((error) => console.log('remove', error))
    // if (errorPage) {
    //   setTimeout(() => {
    //     window.location.href = '/500';
    //   }, 300);
    // }
  })

  /**
   * 监听single-spa的URL-change事件
   * 未命中子应用的url，将子应用区域状态清空处理
   */
  // window.addEventListener('single-spa:app-change', () => {
  //   // 匹配到的子应用name
  //   const appsThatShouldBeActive = getCurrentSubApp(window.location);
  //   console.info(`%cmicroActive : ${appsThatShouldBeActive}`, consoleStyle);
  //   // 记录当前显示的应用名称，数组类型
  //   store.commit('app/TOGGLE_CURRENTAPP', appsThatShouldBeActive);
  // });

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
    // paths.pop();
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
