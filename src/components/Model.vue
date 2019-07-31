<template>
    <div class="models">  
    <div v-for="(model,index) in models" class="list" v-bind:key="model.id">
        <label>{{model.name}} </label>
        <input  v-model="model.native" name="text"  contenteditable="true" spellcheck class="noBorder" ref="natives" v-on:blur="handleBlur(model)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Model',
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
        this.$store.dispatch("list").then(() =>
          this.$refs.natives[0].focus()
        )
    },
    refresh: function() {
      this.$store.dispatch("refresh")
    },
    handleBlur: function(model) {
        this.$store.dispatch("updatenative",model).then(() =>
          console.log('model saved'))
    }
  }
    
}
</script>

<style lang="sass">
.list 
	display: flex 
	justify-content: space-between 
	max-width: 382px 
	margin: auto 
	border-bottom: 1px  solid #eee 
input 
	border: none 
h3 
	margin: 40px 0 0 
ul 
	list-style-type: none 
	padding: 0 
li 
	display: inline-block 
	margin: 0 10px 
a 
	color: #42b983 
</style>
