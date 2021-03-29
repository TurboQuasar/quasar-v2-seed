<template>
  <div>
    <div class="row a-center j-center m-t-20">
      <PanThumb  :height="'100px'" :width="'100px'" :hoverable="false" :image="avatar">
        <div>Hello</div>
        {{username}}
      </PanThumb>
    </div>
    <q-card class="m-t-50">
      <q-card-section>
        <div class="text-h6">Profile</div>
        <q-input :model-value="username" type="outline" label="Username" readonly />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import PanThumb from 'src/components/PanThumb/index.vue'
import {UserModule} from 'src/store/modules/user';
import settings from 'src/settings.json';
export default defineComponent({
  name: 'Profile',
  components: {
    PanThumb,
  },
  setup() {
    const username = computed(() => UserModule.username)
    const avatar = computed(() => UserModule.avatar)
    const adminName = settings.adminName
    return {
      username,
      avatar,
      adminName
    }
  },
})
</script>

<style scoped lang='scss'>
</style>
