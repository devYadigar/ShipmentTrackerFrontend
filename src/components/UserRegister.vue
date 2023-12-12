<template>
  <div>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <!-- Registration form fields -->
        <input type="name" v-model="name" placeholder="Name" required>
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <p>Already registered? <router-link to="/login">Login</router-link></p>
        <button type="submit">Register</button>
        <p v-if="error.length > 0" class="error_message">{{error}}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store';
  export default {
    name: 'UserRegister',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        error: ''
      };
    },
    mounted() {
      if ( store.userToken) {
        this.$router.push({name: 'ShipmentList'});
      }
    },
    methods: {
      async register() {
        try {
          const registrationResponse = await axios.post(`${store.baseApiUrl}user/create/`, {
            name: this.name,
            email: this.email,
            password: this.password
          });
          if (registrationResponse.status !== 201) {
           this.error = 'Cannot register user';
          } else {
            const tokenResponse = await axios.post(`${store.baseApiUrl}user/token/`, {
              email: this.email,
              password: this.password
            });
            if (tokenResponse.data && tokenResponse.data.token) {
              localStorage.setItem('userToken', tokenResponse.data.token); // Store token in local storage
              store.userToken = tokenResponse.data.token;
              this.$router.push({ name: 'ShipmentList' });
            }
          }

        } catch (error) {
          this.error = 'Cannot register user';
          console.error(error);
        }
      }
    }
  }
</script>

<style scoped>
  .error_message {
    color: red;
    font-size: 12px;
  }
  .register-container, input, button {
    border: 1px solid lightgray !important;
    box-shadow: 0 0 10px lightgray;
  }

  .register-container{
    width: 50%;
    margin: auto;
    padding: 10px;
  }

  form {
    margin: auto;
    width: 50%;
    align-content: center;
    align-items: center;
  }

  form input, form button {
    display: block;
    padding: 5px;
    margin: 10px auto;
    outline: none;
  }

  button {
    cursor: pointer;
    color: gray;
  }

  input:focus, button:focus {
    /* Existing focus styles */
    box-shadow: 0 0 5px lightgray; /* Optional: add a shadow on focus */
    outline: none;
  }

  p {
    font-size: 12px;
  }

  a {
    text-decoration: none;
  }
</style>