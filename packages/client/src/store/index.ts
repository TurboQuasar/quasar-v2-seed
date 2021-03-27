import { store as s } from 'quasar/wrappers';
import { createStore, Store } from 'vuex';
export let store: Store<unknown>
export default s(function (/* { ssrContext } */) {
  const Store = createStore({
    strict: !!process.env.DEBUGGING,
  });
  store = Store;
  return Store;
});
