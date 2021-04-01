import {Directive} from 'vue'
export const permission: Directive = {
  beforeMount(el, binding, vNode) {
    const modify = (binding.instance as any).$router.currentRoute.value.meta.modify
    if(!modify) {
      el.style.display = 'none'
    }
  },
};
