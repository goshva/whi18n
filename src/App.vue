<template>
  <div id="app">
      <div id="nav">
      <dropdown
          :options="arrayOfObjects" 
          :selected="mylang" 
          v-on:updateOption="methodToRunOnSelect" 
          :placeholder="'Choose Language'">
      </dropdown>
      <span v-if="isLoggedIn"> | <a @click="logout">🔓</a></span>
      <span v-else> | 
        <router-link to="/login">🔓</router-link>
        </span>
    </div>
    <router-view/>
  </div>
</template>


<script>
import dropdown from 'vue-dropdowns';

export default {
  data() {
    return {
      mylang: {}
    };
  },
  components: {
    'dropdown': dropdown,
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    arrayOfObjects: function() {
      return this.$store.getters.langs;
    }
  },
  created: function(){
      this.langs()
  },
  methods: {
    langs: function() {
      this.$store.dispatch("langs")
    },
    methodToRunOnSelect(payload) {
         console.log(payload);
      this.mylang = payload;
         console.log(this.mylang);
      this.$store.dispatch("mylang", payload.code)
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
