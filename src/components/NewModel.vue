<template>
    <div class="models">  
    <div class="list">
        <input
           v-model="newModel.name"
           name="text"
           placeholder="+🆕"
           contenteditable="true"
           spellcheck class="noBorder"
           ref="names"
           />
        <input
           v-if="newModel.name"
           v-model="newModel.lexicon"
           name="text"
           placeholder="lexicon"
           contenteditable="true"
           spellcheck class="noBorder"
           ref="natives"
           v-on:blur="newModelAdd(newModel)"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MewModel',
  data() {
    return {
      newModel: {name:'', lexicon:''},
    };
  },    
  methods: {
    newModelAdd: function(newModel) {
          this.$store.dispatch("newModelAdd",newModel).then(() =>
            this.newModel = {name:'', lexicon:''})
     },
    newModelName: function(model) {
       // if (model.native == null) { model.native = ""}  - why api write "" disabled?
        if (model.native !== null) { 
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
