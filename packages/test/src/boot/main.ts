// 指令过滤器
import * as directives from 'src/directives/';

import {boot} from 'quasar/wrappers';
import {Directive} from 'vue'

export default boot(({ app }) => {
  // 注册全局指令
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives as Directive);
  });
});
