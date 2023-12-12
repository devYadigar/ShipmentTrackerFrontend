<template>
  <div>
    <div className="container">
      <h1>Edit shipment</h1>
      <form
          @submit.prevent="edit">
        <!-- Login form fields -->
        <input v-if="!isSuper" type="text" v-model="origin" placeholder="Origin route" required/>
        <input v-if="!isSuper" type="text" v-model="destination" placeholder="Destination route" required/>
        <select v-if="isSuper" v-model="status" required>
          <option v-for="option in statusOptions" :key="option.value" :value="option.value" :selected="option.value === status">
            {{ option.text }}
          </option>
          <option value="asdf" selected></option>
        </select>
        <button type="submit">Edit</button>
        <p v-if="error.length > 0" class="error_message">{{error}}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {store} from "@/store";
import {computed} from "vue";

export default {
  name: 'CreateShipment',
  data() {
    return {
      origin: '',
      destination: '',
      status: 'pending',
      error: '',
      statusOptions: [
        { text: 'Pending', value: 'pending' },
        { text: 'Shipped', value: 'shipped' },
        { text: 'Delivered', value: 'delivered' }
      ]
    };
  },
  methods: {
    async edit() {
      try {
        let payload = {}
        if (store.isSuper){
          payload =  {
            status: this.status
          };
        } else {
          payload = {
            origin: this.origin,
            destination: this.destination
          };
        }
        const editResponse = await axios.patch(`${store.baseApiUrl}shipment/shipment/${this.$route.params.id}/`,
            payload,
            {
              headers: {
                'Authorization': `Token ${store.userToken}`,
                'Content-Type': 'application/json'
              }
            });

        if (editResponse.status === 200) {
          this.$router.push({name: 'ShipmentList'});
        } else {
          this.error = 'Cannot edit shipment.';
        }

      } catch (error) {
        this.error = 'Cannot edit shipment.';
        console.error(error);
      }
    }
  },
  setup() {
    const isSuper = computed(() => {
      return store.isSuper;
    });

    return {
      isSuper
    };
  },
  mounted() {
    if(!store.userToken){
      this.$router.push('Login')
    } else {
      axios.get(`${store.baseApiUrl}shipment/shipment/${this.$route.params.id}/`, {
        headers: {
          Authorization: `Token ${store.userToken}`
        }
      }).then(response => {
        if(response.status === 200) {
          this.origin = response.data.origin
          this.destination = response.data.destination
          this.status = response.data.status
        }
      }).catch(error => {
        console.log(error)
      });
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

select {
  width: 35%;
  padding: 8px 12px;
  margin: 8px auto;
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: block;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  color: #495057;
  background-clip: padding-box;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

button {
  padding: 8px 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 0; /* Match the sharp corners */
  background-color: #f8f9fa;
  cursor: pointer;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

button:hover {
  background-color: #e2e6ea;
}

button:active {
  background-color: #dae0e5;
}

/* Styles for other inputs to match */
input[type="text"], input[type="email"], input[type="password"] {
  width: 100%;
  padding: 8px 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 0; /* Match the sharp corners */
  box-sizing: border-box;
  display: block;
  font-size: 14px;
  line-height: 1.5;
  color: #495057;
  background-color: white;
  background-clip: padding-box;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

</style>