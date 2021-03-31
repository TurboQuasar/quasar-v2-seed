<template>
  <div class="animated fadeIn" style="height: 100%">
    <q-layout view="hHh Lpr lff">
      <!-- header -->
      <q-header elevated class="bg-white text-white">
        <q-toolbar class="bg-primary">
          <q-btn dense flat round :icon="drawerLeft ? 'menu_open' : 'menu'" @click="setLeftDrawerOpen" />
          <q-toolbar-title class="row a-center">
            <q-breadcrumbs active-color="white" separator-color="white" class="fs-14 h-16" :key="+new Date()">
              <q-breadcrumbs-el :label="$t(`routes.${route.meta.title}`)" :name="curRouteFather" v-for="(route, index) in breadcrumbs" :key="index" />
            </q-breadcrumbs>
          </q-toolbar-title>
          <q-btn-dropdown stretch flat align="center" :label="version"></q-btn-dropdown>
          <q-separator dark vertical />
          <q-btn stretch flat icon="refresh" @click="refreshCurPage">
            <q-tooltip>{{ $t('tip.refreshCurPage') }}</q-tooltip>
          </q-btn>
          <q-separator dark vertical />
          <q-btn stretch flat @click="$q.fullscreen.toggle()" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'">
            <q-tooltip>{{ !$q.fullscreen.isActive ? `${$t('tip.fullscreen')}` : `${$t('tip.cancelFullscreen')}` }}</q-tooltip>
          </q-btn>
          <q-separator dark vertical />
          <q-btn-dropdown stretch flat align="center" icon="font_download">
            <q-list>
              <q-item
                v-for="langOp in langOptions"
                :key="langOp.value"
                :clickable="langOp.value !== lang" v-close-popup="langOp.value === lang" :disable="lang === langOp.value" @click="checkLang(langOp
               .value)">
                <q-item-section>
                  <q-item-label>{{langOp.label}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-separator dark vertical />
          <q-btn-dropdown stretch flat align="center">
            <template v-slot:label>
              <q-avatar class="m-r-10">
                <img :src="avatar" />
              </q-avatar>
            </template>
            <q-list>
              <q-item clickable v-close-popup @click="toProfile">
                <q-item-section>
                  <q-item-label>{{ $t('layouts.profile') }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset spaced />
              <q-item clickable v-close-popup @click="logOut">
                <q-item-section>
                  <q-item-label>{{ $t('layouts.logout') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>
      <!-- left -->
      <q-drawer v-model="drawerLeft" show-if-above side="left" :width="250" :breakpoint="700" bordered content-class="text-black2" class="h-full">
        <q-scroll-area class="fit">
          <div class="row p-16 a-center fs-20 text-bold cursor-pointer" @click="toHome" v-if="showSideBarLogo">
            <img src="~assets/slogo.png" class="sidebar-slogo" />
            <span class="m-l-5 ellipsis w-170">{{ title }}</span>
          </div>
          <Sidebaritem v-for="(item, index) in routes" :route="item" :key="index" :base-path="item.path" ref="sidebaritem" />
        </q-scroll-area>
      </q-drawer>
      <!-- container -->
      <q-page-container>
        <div class="h-48 layout-header-label bg-white text-black2 p-t-10 p-l-15 p-r-15 visited b-bottom" :style="drawerLeft ? 'left:250px' : ''">
          <div class="q-gutter-sm row no-wrap scroll">
            <router-link
              v-for="(tag, index) in visitedViews"
              :key="index"
              :ref="setTagRef(index)"
              :class="['bg-white p-l-10  b-radius-4 flex row relative border h-30 lh-30 p-r-20', isActive(tag) ? 'text-light-blue  p-r-10' : '']"
              :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
              tag="div"
              v-ripple
            >
              <span>{{ $t(`routes.${tag.meta.title}`) }}</span>
              <q-icon name="close" right @click.prevent="closeTag(tag)"></q-icon>
              <q-menu touch-position context-menu>
                <q-list dense>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="closeAll"> 关闭所有 </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </router-link>
          </div>
        </div>
        <transition-group enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <q-page class="m-t-70 p-l-20 p-r-20 p-b-20" :key="key">
            <router-view v-if="refreshPage" />
            <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
              <q-btn fab icon="keyboard_arrow_up" color="blue-8" />
            </q-page-scroller>
          </q-page>
        </transition-group>
      </q-page-container>
      <!-- footer -->
      <q-footer class="bg-white text-center fs-12 text-gray row a-center j-center p-b-5" v-if="showFooter">
        <a :href="policy" target="_blank">{{ policy }}</a>
      </q-footer>
    </q-layout>
  </div>
</template>

<script lang="ts">
import Sidebaritem from './components/sidebaritem.vue';
import { AppModule } from 'src/store/modules/app';
import { UserModule } from 'src/store/modules/user';
import settings from 'src/settings.json';
import { PermissionModule } from 'src/store/modules/permission';
import { TagsViewModule, ITagView } from 'src/store/modules/tags';
import { RouteRecord, useRoute, useRouter,RouteLocationMatched } from 'vue-router';
import languages from 'quasar/lang/index.json';
import {watch, watchEffect, computed, ref, nextTick, onMounted, defineComponent , reactive, onBeforeUpdate, onUpdated, unref, toRaw} from 'vue'
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n';
import {useRefs} from 'src/hooks/useRefs';
import pkg from '../../package.json'
import {cloneDeep, delay} from 'lodash'
export default defineComponent({
  name: 'Layouts',
  components: {
    Sidebaritem
  },
  setup(props, context) {
    const $q = useQuasar()
    const $route = useRoute()
    const $router = useRouter()
    const $i18 = useI18n()
    const username = computed(() => UserModule.username)
    const avatar = computed(() => UserModule.avatar)
    const lang = computed(() => AppModule.language)
    const routes = computed(() => PermissionModule.routes)
    const key = computed(() => $route.path)
    const curRouteFather = computed(() => $route.matched[0])
    const visitedViews = computed(()=>TagsViewModule.visitedViews)
    const refreshPage = computed(() => AppModule.refreshPage)
    const drawerLeft = ref(true)
    const visible = ref(false)

    const policy = settings.policy;
    const title = settings.title;
    const adminName = settings.adminName;
    const showSideBarLogo = settings.showSideBarLogo;
    const showFooter = settings.showFooter;


    let breadcrumbs = ref<RouteLocationMatched[]>([]);

    const isDashboard = (route: RouteRecord)=> {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (name as string).trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
    }

    const isActive = (r: ITagView)=> {
      return r.path === $route.path;
    }


    const getBreadcrumb =()=> {
      let matched = $route.matched.filter((item) => item.meta && item.meta.title);
      const first = matched[0];
      if (!isDashboard(first)) {
        matched = [{ path: '/', meta: { title: 'dashboard' } } as any].concat(matched);
      }
      breadcrumbs.value = matched.filter((item) => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false;
      });
    }
    const addTags = ()=> {
      TagsViewModule.addView($route);
    }
    const [tagRefs, setTagRef] = useRefs()

    const moveToCurrentTag =() =>{
      nextTick(() => {
        if (tagRefs) {
          for (const tag of tagRefs.value) {
            if ((tag.to as ITagView).path === $route.path) {
              // When query is different then update
              if ((tag.to as ITagView).fullPath !== $route.fullPath) {
                TagsViewModule.updateVisitedView($route);
              }
              break;
            }
          }
        }
      });
    }
    watch(computed(() => $route.path), () => {

      nextTick(() => {
        addTags();
        // moveToCurrentTag();
        getBreadcrumb();
      })
    }, {immediate: true});

    const toHome = ()=> {
      if ($route.name === 'Dashboard') {
        return;
      }
      $router.push({ path: '/' });
    }
    const toProfile = () => {
      $router.push({ path: '/profile/index' });
    }
    const appLanguages = languages.filter((lang) => ['zh-CN', 'en-US'].includes(lang.isoName));
    const langOptions = ref<{label: string, value: string}[]>([]);

    const checkLang =(value: string) =>  {
      AppModule.SET_LANGUAGE(value);
      $q.notify({
        color: 'primary',
        multiLine: true,
        icon: 'mood',
        actions: [
          {
            label: 'Close',
            color: 'white',
          },
        ],
        message: `${$i18.t('messages.success')}`,
      });
    }

    const logOut = async () => {
      await UserModule.LogOut();
      await $router.push(`/login?redirect=${$route.fullPath}`);
      $q.notify({
        color: 'primary',
        multiLine: true,
        icon: 'mood',
        actions: [
          {
            label: 'Close',
            color: 'white',
          },
        ],
        message: 'Sign out successfully',
      });
    }

    const setLeftDrawerOpen = ()=> {
      drawerLeft.value = !drawerLeft.value;
    }

    const closeAll = ()=> {
      TagsViewModule.delAllViews();
      $router.push('/').catch((err) => 0);
    }

    onMounted(() => {
      langOptions.value = appLanguages.map((lang) => ({
        label: lang.nativeName,
        value: lang.isoName,
      }));
    })

    const refreshCurPage = async () => {
      await AppModule.refreshCurPage();
    }

    const closeTag = async (view: ITagView) => {
      if (visitedViews.value.length > 1) {
        let last;
        if ($route.fullPath === view.fullPath) {
          // 如果删除的是当前路由，那么就删除当前路由并跳转到最后一个
          TagsViewModule.delView(view);
          // 重新获取下左后一个
          last = visitedViews.value[visitedViews.value.length - 1];
          await $router.push({path: last.fullPath as string});
        } else {
          // 如果删除不是当前路由，删了自己就好
          TagsViewModule.delView(view);
          last = visitedViews.value[visitedViews.value.length - 1];
        }
      } else {
        closeAll();
      }
    }
    const version = pkg.version
    return {
      version,
      username,
      avatar,
      lang,
      policy,
      title,
      visible,
      adminName,
      showSideBarLogo,
      showFooter,
      visitedViews,
      drawerLeft,
      breadcrumbs,
      curRouteFather,
      routes,
      refreshPage,
      langOptions,
      key,
      toHome,
      toProfile,
      setLeftDrawerOpen,
      logOut,
      checkLang,
      closeAll,
      refreshCurPage,
      addTags,
      closeTag,
      isActive,
      setTagRef
    }
  }
})
</script>
<style lang="scss">
.layout-header-label {
  cursor: pointer;
  padding-right: 30px;
  position: relative;
  .scroll {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      background-color: transparent;
      display: none;
    }
  }
  .q-icon {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    right: 5px;
    cursor: pointer;
  }
}
</style>
<style scoped lang="scss">
.sidebar-slogo {
  width: 32px;
  height: 32px;
}
</style>
<style scoped lang="scss">
.visited {
  position: fixed;
  width: 100%;
  z-index: 10000;
  left: 0;
  // box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  .close-all {
    position: fixed;
    right: 0;
  }
}
</style>
