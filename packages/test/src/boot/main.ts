// 指令过滤器
import * as directives from 'src/directives/';

import {boot} from 'quasar/wrappers';
import {Directive} from 'vue'
import router from '../router';
export default boot(({ app }) => {
  // 注册全局指令
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key] as Directive);
  });
  // app.directive('permission', {
  //   beforeMount(el, binding, vNode) {
  //     const modify = (binding.instance as any).$router.currentRoute.value.meta.modify
  //     if(!modify) {
  //       el.style.display = 'none'
  //     }
  //   },
  // })
});
