<template>
  <div class="home">
    <Model msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Model from '@/components/Model.vue'

export default {
  name: 'home',
  components: {
    Model
  }
}
</script>
