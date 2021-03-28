import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { StateInterface } from '../store';
import {constantRoutes} from './routes';
import {i18n} from '../boot/i18n';
import settings from '../settings.json';
import {getToken} from '../utils/cookies';
import {LoadingBar} from 'quasar';
import {UserModule} from '../store/modules/user';
import {PermissionModule} from '../store/modules/permission';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const createHistory =
  process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: constantRoutes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(
    process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
  ),
});
export default route<StateInterface>(function (/* { store, ssrContext } */) {
  const getPageTitle = (key: string) => {
    const hasKey = i18n.global.t(`routes.${key}`);
    if (hasKey) {
      const pageName = i18n.global.t(`routes.${key}`);
      return `${pageName} - ${settings.title}`;
    }
    return `${settings.title}`;
  };
  const whiteList = ['/login'];
  router.beforeEach(async (to: any, _, next) => {
    const token = getToken();
    if (token) {
      if (to.path === '/login') {
        next({ path: '/' });
        LoadingBar.stop();
      } else {
        if (!UserModule.introduction) {
          try {
            await UserModule.getUserInfo();
            const pagePermissionId = UserModule.pagePermissionId;
            const pageEditPermission = UserModule.pageEditPermission;
            // Generate accessible routes map based on role
            await PermissionModule.GenerateRoutes({ pagePermissionId, pageEditPermission });
            // Dynamically add accessible routes
            PermissionModule.dynamicRoutes.forEach(_ => {
              router.addRoute(_)
            })
            // Hack: ensure addRoutes is complete
            // Set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true });
          } catch (err) {
            console.log(err)
            // Remove token and  to login page
            UserModule.ResetToken();
            next(`/login?redirect=${to.path}`);
            LoadingBar.stop();
          }
        } else {
          next();
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`);
        LoadingBar.stop();
      }
    }
  });
  router.afterEach((to) => {
    // Finish progress bar
    LoadingBar.stop();
    // set page title
    document.title = getPageTitle(to.meta.title);
  });
  return router;
});
export function resetRouter() {
  console.log('resetRouter')
}

export {
  router
}
