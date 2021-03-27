import { getLanguage } from 'src/utils/cookies';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { getSidebarStatus, getSize, setSidebarStatus, setLanguage, setSize } from 'src/utils/cookies';
import {store} from '../index';
import {nextTick} from 'vue';
import {useI18n} from 'vue-i18n';
export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  language: string;
}
const name = 'app';
@Module({ dynamic: true, store, name })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop;
  public refreshPage = true;
  public language = getLanguage() || 'en';
  get i18n() {
    return useI18n()
  }
  @Mutation
  public SET_LANGUAGE(status: any) {
    this.i18n.locale = status;
    this.language = status;
    setLanguage(this.language);
  }
  @Mutation
  public SET_REFRESH_PAGE(status: any) {
    this.refreshPage = status;
  }
  @Action({rawError: true})
  public async refreshCurPage() {
    this.SET_REFRESH_PAGE(false);
    await nextTick(() => {
      this.SET_REFRESH_PAGE(true);
    });
  }
}

export const AppModule = getModule(App);
