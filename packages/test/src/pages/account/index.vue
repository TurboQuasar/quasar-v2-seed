<template>
  <div>
    <Construction />
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'
  import Construction from 'src/components/Construction/index.vue'
export default defineComponent({
  name: 'Account',
  components: {
    Construction,
  },
})
</script>

<style scoped lang='scss'>
</style>
