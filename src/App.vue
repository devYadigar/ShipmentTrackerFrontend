<template>
  <div id="app">
    <div class="nav-container" v-if="isAuthenticated || !this.$route.name">
      <nav v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
      <nav v-if="isAuthenticated">
        <button @click="logout">Logout</button>
      </nav>
      <h2 v-if="!this.$route.name">Welcome to the website. Please log in or register in order to proceed.</h2>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { computed } from 'vue';
import { store } from './store'
export default {
  name: 'App',
  methods: {
    logout(){
      localStorage.removeItem('userToken');
      store.userToken = null;
      this.$router.push({ name: 'Login' });
    }
  },
  setup() {
    const isAuthenticated = computed(() => {
      return store.userToken;
    });

    return {
      isAuthenticated
    };
  },
  mounted() {
    if (store.userToken) {
      this.$router.push({name: 'ShipmentList'});
    }
  },
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .nav-container {
    border: 1px solid lightgray;
    box-shadow: 0 0 10px lightgray;
    margin: 10px auto;
    width: 70%;
    padding: 15px;
  }

  button, button:focus, nav a {
    padding: 5px;
    border: 1px solid lightgray;
    box-shadow: 0 0 3px lightgray;
    cursor: pointer;
    color: gray;
    outline: none;
  }
  nav a {
    text-decoration: none;
    margin: 10px;
  }
  h2 {
    color: grey;
  }

</style>
