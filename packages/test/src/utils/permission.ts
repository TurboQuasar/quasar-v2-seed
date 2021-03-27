// import settings from 'src/settings.json';
// import { getToken, setToken } from './cookies';
//
// import { PermissionModule } from 'src/store/modules/permission';
// import { UserModule } from 'src/store/modules/user';
// import { LoadingBar } from 'quasar';
// import {useI18n} from 'vue-i18n';
// import {useRouter} from 'vue-router'
// const i18n = useI18n()
// const router = useRouter()
// const getPageTitle = (key: string) => {
//   const hasKey = i18n.t(`routes.${key}`);
//   if (hasKey) {
//     const pageName = i18n.t(`routes.${key}`);
//     return `${pageName} - ${settings.title}`;
//   }
//   return `${settings.title}`;
// };
// const whiteList = ['/login'];
// router.beforeEach(async (to: any, _, next) => {
//   if (getToken()) {
//     if (to.path === '/login') {
//       next({ path: '/' });
//       LoadingBar.stop();
//     } else {
//       if (!UserModule.introduction) {
//         try {
//           await UserModule.getUserInfo();
//           const pagePermissionId = UserModule.pagePermissionId;
//           const pageEditPermission = UserModule.pageEditPermission;
//           // Generate accessible routes map based on role
//           await PermissionModule.GenerateRoutes({ pagePermissionId, pageEditPermission });
//           // Dynamically add accessible routes
//           PermissionModule.dynamicRoutes.forEach(_ => {
//             router.addRoute(_)
//           })
//           // Hack: ensure addRoutes is complete
//           // Set the replace: true, so the navigation will not leave a history record
//           next({ ...to, replace: true });
//         } catch (err) {
//           console.log(err)
//           // Remove token and  to login page
//           UserModule.ResetToken();
//           next(`/login?redirect=${to.path}`);
//           LoadingBar.stop();
//         }
//       } else {
//         next();
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next();
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`);
//       LoadingBar.stop();
//     }
//   }
// });
// router.afterEach((to) => {
//   // Finish progress bar
//   LoadingBar.stop();
//   // set page title
//   document.title = getPageTitle(to.meta.title);
// });
