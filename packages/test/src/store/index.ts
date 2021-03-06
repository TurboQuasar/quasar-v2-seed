import { store as s } from 'quasar/wrappers';
import { createStore, Store, createLogger } from 'vuex';

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
}
// let store: Store<unknown>
const store = createStore<StateInterface>({
  modules: {
    // example
  },
  plugins: [createLogger()],
  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: false //!!process.env.DEBUGGING,
});
// store = Store
export default s(function (/* { ssrContext } */) {
  return store;
});
export {
  store
}
