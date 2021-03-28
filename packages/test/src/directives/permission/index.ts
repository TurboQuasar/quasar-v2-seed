import router from 'src/router';
import {Directive} from 'vue'
export const permission: Directive = {
  beforeMount(el, binding) {
    const { value } = binding;
    const r: any = router;
    const that: any = r.apps[0];
    !that.$route.meta.modify ? el.remove() : () => 0;
  },
};
