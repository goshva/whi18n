<template>
  <div class="models">  
    <h1 > list{{ msg }}</h1>
    <div v-for="model in models" class="hello">
      {{model.name}}

    </div>
  </div>
</template>

<script>
export default {
  name: 'Model',
  props: {
    msg: String
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    models: function() {
      return this.$store.getters.models;
    }
  },
    mounted: function(){
        this.list();
    },  
  methods: {
    list: function() {
      this.$store
        .dispatch("list")
    //    .then(() => this.model = this.$store.getters.models)
        .catch(err => console.log(err));
    }
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
