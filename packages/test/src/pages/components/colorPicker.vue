<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-color v-model="hex" class="my-picker" />
      <q-color v-model="hexa" class="my-picker" />
      <q-color v-model="rgb" class="my-picker" />
      <q-color v-model="rgba" class="my-picker" />
    </div>
    <div class="q-gutter-md row items-start">
      <q-input filled v-model="color" class="my-input">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="color" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input filled v-model="secondColor" :rules="['anyColor']" hint="With validation" class="my-input">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="secondColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
export default defineComponent({
  setup() {
    const hex = ref('#e93030');
    const hexa = ref('#0f0');
    const rgb = ref('rgb(0,0,0)');
    const rgba = ref('rgba(66,0,1,0.8)');
    const color = ref('#FF00FF');
    const secondColor = ref('#027be3');
    return {
      hex,
      hexa,
      rgb,
      rgba,
      color,
      secondColor
    }
  }
})
</script>

<style scoped lang='scss'>
</style>
