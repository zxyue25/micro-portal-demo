import { messageBus as eventCenter } from '@/utils/message-bus';
import router from '@/router';
import { logout } from '@/utils/util';
import { Message } from 'element-ui';

const showMessage = ({ showClose = true, message, type = 'error' } = {}) => {
  Message({
    showClose,
    message,
    type,
  });
};

const SYSTEM_FORBIDDEN = 'SYSTEM_FORBIDDEN';
const SYSTEM_USER_INVALID = 'SYSTEM_USER_INVALID';
const SYSTEM_LOGOUT = 'SYSTEM_LOGOUT';
const SYSTEM_FULL_SCREEN = 'SYSTEM_FULL_SCREEN';
const SYSTEM_EXIT_FULL_SCREEN = 'SYSTEM_EXIT_FULL_SCREEN';

/**
 * 401 跳转无权限页
 * @param router
 */
const forbidden = () => {
  showMessage({
    message: '真抱歉！您没有权限访问',
  });
  setTimeout(() => {
    router.push('/403');
  }, 500);
};

/**
 * 触发事件
 * @param type
 */
const eventEmit = (type) => {
  if (window.eventCenter) {
    window.eventCenter.emit(type);
  }
};

/**
 * 初始化 Event
 * @param router
 */
export const initEvent = () => {
  if (window.eventCenter) return;

  // 声明事件总线
  window.eventCenter = eventCenter;

  // 监听全局系统 403无权限页
  window.eventCenter.on(SYSTEM_FORBIDDEN, () => forbidden());

  // 监听全局系统 登录态失效
  window.eventCenter.on(SYSTEM_USER_INVALID, () => logout());

  // 监听全局登出操作
  window.eventCenter.on(SYSTEM_LOGOUT, () => logout());

  // 全屏
  window.eventCenter.on(SYSTEM_FULL_SCREEN, () => {
    window.__IS_FULL_SCREEN = true;
    const headDom = document.querySelector('.sys-head');
    const asideDom = document.querySelector('.portal-app-aside');
    if (headDom) {
      headDom.style.display = 'none';
    }
    if (asideDom) {
      asideDom.style.display = 'none';
    }
  });

  window.eventCenter.on(SYSTEM_EXIT_FULL_SCREEN, () => {
    window.__IS_FULL_SCREEN = false;
    const headDom = document.querySelector('.sys-head');
    const asideDom = document.querySelector('.portal-app-aside');
    if (headDom) {
      headDom.style.display = 'none';
    }
    if (asideDom) {
      asideDom.style.display = 'none';
    }
  });
};

/**
 * 主应用直接调用、防止第一次加载时 Event 没有注册
 */
export const baseSystemLogout = () => logout();
export const baseSystemForbidden = () => forbidden();

/**
 * 子应用必须通过 Emit 通知、通过 active 子应用去下发
 */
export const systemForbidden = () => eventEmit(SYSTEM_FORBIDDEN);
export const systemLogout = () => eventEmit(SYSTEM_LOGOUT);
