<template>
  <div>
    <div class="container">
      <h1>Create shipment</h1>
      <form @submit.prevent="create">
        <!-- Login form fields -->
        <input type="origin" v-model="origin" placeholder="Origin route" required>
        <input type="destination" v-model="destination" placeholder="Destination route" required>
        <button type="submit">Create</button>
        <p v-if="error.length > 0" class="error_message">{{error}}</p>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {store} from "@/store";

  export default {
    name: 'CreateShipment',
    data() {
      return {
        origin: '',
        destination: '',
        error: ''
      };
    },
    methods: {
      async create() {
        try {
          const createResponse = await axios.post(`${store.baseApiUrl}shipment/shipment/`,
              {
                origin: this.origin,
                destination: this.destination
              },
              {
                headers: {
                  'Authorization': `Token ${store.userToken}`,
                  'Content-Type': 'application/json'
                }
              });

          if (createResponse.status === 201) {
            this.$router.push({name: 'ShipmentList'});
          } else {
            this.error = 'Cannot create shipment.';
          }

        } catch (error) {
          this.error = 'Cannot create shipment.';
          console.error(error);
        }
      }
    },
    mounted() {
      if(!store.userToken){
        this.$router.push('Login')
      }
    }
  }
</script>

<style scoped>

.error_message {
  color: red;
  font-size: 12px;
}
.container, input, button {
  border: 1px solid lightgray !important;
  box-shadow: 0 0 10px lightgray;
}

.container{
  width: 70%;
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