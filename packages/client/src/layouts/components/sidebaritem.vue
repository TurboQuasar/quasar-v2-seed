<template>
  <div v-if="!route.meta || !route.meta.hidden" class="sidebar-item">
    <q-list class="q-list text-black2" v-if="!route.children || route.children.length === 1">
      <q-expansion-item
        :to="resolvePath(route)"
        :icon="iconName(route)"
        :content-inset-level="1"
        :label="label(route)"
        class="theOnlyOneChild"
        :caption="resolvePath(route)"
        :active-class="$route.path === resolvePath(route) ? 'bg-small-blue text-light-blue active-tab' : 'text-black2'"
      ></q-expansion-item>
    </q-list>
    <q-list class="q-list" v-else>
      <template>
        <q-expansion-item
          :icon="route.meta.icon"
          :content-inset-level="1"
          :label="$t(`routes.${route.meta.title}`)"
          v-model="opened"
          :ref="route.meta.title"
        >
          <Sidebaritem v-for="(item, index) in route.children" :route="item" :key="index" :basePath="route.path" />
        </q-expansion-item>
      </template>
    </q-list>
  </div>
</template>

<script lang="ts">
import Sidebaritem from './sidebaritem.vue';
import path from 'path';
import {RouteLocationNormalizedLoaded}  from 'vue-router'
import {useRoute} from 'vue-router'
import {watch, nextTick, ref, PropType} from 'vue'
import {propTypes} from 'src/utils/propTypes';
import {useI18n} from 'vue-i18n';


export default  {
  name: 'Sidebaritem',
  components: {
    Sidebaritem,
  },
  props: {
    route: {
      type: Object as PropType<RouteLocationNormalizedLoaded>,
      required: true,
      default: {}
    },
    basePath: propTypes.string.def('')
  },
  setup(props)  {
    const $route = useRoute()
    watch($route, (newVal) => {
      nextTick(() => {
        const father = newVal.matched[0];
        const title = father.meta.title;
        if (father.meta && title) {
          opened.value = true;
        }
      })
    })
    const opened = ref(false)
    const visible = ref(false)

    const resolvePath = (route: any)=> {
      if (route.children && route.children.length) {
        return path.resolve(route.path, route.children[0].path);
      } else {
        return path.resolve(props.basePath, route.path);
      }
    }
    const iconName = (route)=> {
      return !route.children || (route.children.length === 1 && route.meta && route.meta.icon) ? route.meta.icon : route.children[0].meta.icon;
    }
    const {t} = useI18n()
    const label = (route)=> {
      return !route.children || (route.children.length === 1 && route.meta && route.meta.icon)
        ? t(`routes.${route.meta.title}`)
        : t(`routes.${route.children[0].meta.title}`);
    }
    return {
      opened,
      visible,
      $route,
      label,
      resolvePath,
      iconName
    }
  }
}
</script>

<style  lang='scss'>
.sidebar-item {
  .q-list {
    .active-tab::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      background: $light-blue;
      top: 0;
      right: 0;
    }
    .q-item__section--avatar {
      padding-right: 0;
    }
    .q-item__section {
      min-width: 40px;
    }
    .q-expansion-item__content {
      padding-left: 0 !important;
      .q-expansion-item__container a {
        padding-left: 50px;
      }
    }
    .theOnlyOneChild {
      .q-item {
        .relative-position {
          display: none;
        }
      }
    }
  }
}
</style>
