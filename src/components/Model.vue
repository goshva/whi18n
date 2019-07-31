<template>
    <div class="models">  
    <div v-for="model in models" class="list" v-bind:key="model.id">
        <input
           v-model="model.name"
           name="text"
           contenteditable="true"
           spellcheck class="noBorder"
           ref="names"
           v-on:blur="newModelName(model)"/>
        <input
           v-model="model.native"
           name="text"
           contenteditable="true"
           spellcheck class="noBorder"
           ref="natives"
           v-on:blur="newModelNative(model)"/>
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
    newModelNative: function(model) {
        console.log(model.native)
       // if (model.native == null) { model.native = ""}  - why api write "" disabled?
        if (model.native == "") {model.native = ' '}
          this.$store.dispatch("updatenative",model).then(() =>
            console.log('model saved'))
     },
    newModelName: function(model) {
        if (model.name == "") { 
          this.$store.dispatch("removemodel",model).then(() =>
            console.log('model delete'))
        } else { 
          this.$store.dispatch("updatename",model).then(() =>
            console.log('model saved'))
        }
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
label
    &:hover 
      text-decoration: underline
</style>
