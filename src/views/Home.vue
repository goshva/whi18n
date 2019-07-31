<template>
  <div class="home">
    <NewModel/>
    <Model/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewModel from '@/components/NewModel.vue'
import Model from '@/components/Model.vue'

export default {
  name: 'home',
  components: {
    NewModel,
    Model
  }
}
</script>
