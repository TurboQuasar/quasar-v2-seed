<template>
  <div>
    editor和admin
    <q-btn color="primary" icon="check" label="ADMIN" v-permission />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'AuthB'
})
</script>
<style lang="scss" scoped>
</style>
