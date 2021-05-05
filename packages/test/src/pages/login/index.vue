<template>
  <div class="login-container relative w-full h-full">
    <img src="~assets/login-bg.jpg" alt class="absolute left-0 top-0 w-full h-full" />
    <div :class="['row j-end  a-center window-height',!$q.platform.is.mobile?'p-100':'p-20']">
      <q-card :class="['my-card ',!$q.platform.is.mobile?'w-p-28':'w-full']">
        <q-card-section>
          <h3 class="text-subtitle2 text-center fs-20 relative">{{PrdTitle}}</h3>
          <span class="sub"></span>
        </q-card-section>
        <q-card-section class="col justify-center p-b-20">
          <q-input v-model="username" type="text" label="Username" class="m-b-10" />
          <q-input v-model="password" type="password" label="Password" class="m-b-10" />
          <div class="row a-center text-primary fs-14 j-end m-t-20 cursor-pointer">
            <span>修改密码</span>
            <q-icon name="keyboard_arrow_right" class="fs-18" />
          </div>
          <q-btn
            color="primary"
            icon="login"
            label="Login"
            @click.prevent="handLogin"
            class="w-full m-t-20 h-44"
            :loading="loginLoading"
            :disable="loginLoading"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, watch} from 'vue'
import {UserModule} from 'src/store/modules/user';
import settings from 'src/settings.json';
import {useRoute, useRouter} from 'vue-router'
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n/index';
export default defineComponent( {
  name: 'LoginIndex',
  setup() {
    const loginLoading = computed(() => {
      return UserModule.loginLoading;
    })
    const username = ref('admin');
    const password = ref('123456');
    const PrdTitle = settings.title
    let redirect: string
    let otherQuery;

    const $route = useRoute()
    const $router = useRouter()
    const $q = useQuasar()
    const $i18n = useI18n()
    const getOtherQuery = (query)=> {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
    const handLogin = ()=> {
      UserModule.SET_LOGIN_LOADING(true);
      setTimeout(async () => {
        await UserModule.Login({ username: username.value, password: password.value });
        if (!redirect) {
          await $router.push('/dashboard');
        } else {
          await $router.push(
            {path: redirect || '/dashboard'},
          );
        }
        setTimeout(() => {
          UserModule.SET_LOGIN_LOADING(false);
          $q.notify({
            message: `${$i18n.t('messages.success')}`,
            color: 'primary',
            multiLine: true,
            icon: 'mood',
            actions: [
              {
                label: 'Close',
                color: 'white',
              },
            ],
          });
        }, 1000);
      }, 1000);
    }

    watch(computed(() => $route.path), () => {
      // See https://github.com/vuejs/vue-router/pull/2050 for details
      const query = $route.query;
      if (query) {
        redirect = query.redirect as string;
        otherQuery = getOtherQuery(query);
      }
    }, {immediate: true})
    return {
      loginLoading,
      username,
      password,
      PrdTitle,
      handLogin
    }
  }
})
</script>
<style lang="scss" scoped>
.sub {
  width: 30px;
  height: 4px;
  background: $blue;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
}
</style>
