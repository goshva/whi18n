<template>
 <div class="home" >

   <form class="login" @submit.prevent="login">
 <div class="list">
     <label>Name</label>
     <input required v-model="username" type="text" placeholder="Name" autofocus />
 </div>
 <div class="list">
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
 </div>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
export default {
  data() {
    return {
      username: "test",
      password: "notasecret"
    };
  },

  methods: {
    login: function() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
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
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active 
	-webkit-box-shadow: 0 0 0 30px white inset !important 
    
button
  border: none
  border-bottom: 1px  solid #ccc
  padding: 9px
  font-size: 16px
  background: #fff
  &:hover
    background: #ddd

  
</style>
