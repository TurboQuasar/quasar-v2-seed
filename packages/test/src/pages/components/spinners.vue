<template>
  <div class="q-pa-md q-gutter-xs">
    <div class="q-gutter-md row justify-center" style="font-size: 3em;margin-bottom:20px">
      <q-spinner-audio color="secondary" />
      <q-spinner-ball color="red" />
      <q-spinner-bars color="purple" />
      <q-spinner-comment color="deep-purple" />
      <q-spinner-cube color="indigo" />
      <q-spinner-dots color="blue" />
      <q-spinner-facebook color="light-blue" />
      <q-spinner-gears color="cyan" />
      <q-spinner-grid color="teal" />
      <q-spinner-hearts color="green" />
      <q-spinner-hourglass color="light-green" />
      <q-spinner-infinity color="lime" />
      <q-spinner-ios color="yellow" />
      <q-spinner-oval color="amber" />
      <q-spinner-pie color="orange" />
      <q-spinner-puff color="deep-orange" />
      <q-spinner-radio color="brown" />
      <q-spinner-rings color="grey" />
      <q-spinner-tail color="blue-grey" />
    </div>
    <q-btn color="teal" @click="showLoading" label="Show Loading (Sanitized)" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useQuasar} from 'quasar'
import {delay} from 'lodash'
export default defineComponent({
  setup() {
    const $q= useQuasar()
    const showLoading =()=> {
      $q.loading.show({
        message: 'Some important <b>process</b> is in progress.<br/><span class="text-primary">Hang on...</span>',
      });
      delay(()=> {
        $q.loading.hide()
      }, 3000)
    }
    return {
      showLoading
    }
  }
})
</script>

<style scoped lang='scss'>
</style>
