<template>
  <router-link class="create-button" to="/shipment/create" v-if="!isSuper">Create</router-link>
  <p v-if="shipments.length === 0">No data</p>
  <div class="table-container" v-if="shipments.length > 0">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{capitalize(header)}}</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shipment in shipments" :key="shipment.id">
          <td>{{ shipment.id }}</td>
          <td>{{ shipment.origin }}</td>
          <td>{{ shipment.destination }}</td>
          <td>{{ shipment.status }}</td>
          <td>{{ formatDate(shipment.date_shipped) }}</td>
          <td>
            <div>
              <button @click="this.$router.push({name:'EditShipment', params: {id: shipment.id}})" class="edit-button">EDIT</button>
              <button  @click="deleteShipment(shipment.id)" class="delete-button">DELETE</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import { store } from '../store'
  import { computed } from "vue";
  export default {
    name: 'ShipmentList',
    data() {
      return {
        shipments: [],
        headers: []
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
    methods: {
      async deleteShipment(id) {
        try {
          const deleteResponse = await axios.delete(`${store.baseApiUrl}shipment/shipment/${id}/`,
              {
                headers: {
                  'Authorization': `Token ${store.userToken}`,
                  'Content-Type': 'application/json'
                }
              });

          if (deleteResponse.status === 204) {
            this.listShipments()
          } else {
            this.error = 'Cannot delete shipment.';
          }
        } catch (error) {
          this.error = 'Cannot delete shipment.';
          console.error(error);
        }
      },
      capitalize(str) {
        if (!str || typeof str !== 'string') {
          return '';
        }

        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      },
      formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;

        return [year, month, day].join('-');
      },
      listShipments(){
        if (store.userToken) {
          axios.get(`${store.baseApiUrl}shipment/shipment/`, {
            headers: {
              Authorization: `Token ${store.userToken}`
            },
            email: this.email,
            password: this.password
          }).then(response => {
            if(response.status === 200) {
              this.shipments = response.data
              this.headers = Object.keys(this.shipments[0])
            }
          }).catch(error => {
            console.log(error)
          });

          axios.get(`${store.baseApiUrl}user/me/`, {
            headers: {
              Authorization: `Token ${store.userToken}`
            }
          }).then(response => {
            if(response.status === 200) {
              localStorage.setItem('isSuper', response.data.is_superuser);
              store.isSuper = response.data.is_superuser;
            }
          }).catch(error => {
            console.log(error)
          });
        } else {
          this.$router.push('Login')
        }
      }
    },
    mounted() {
      this.listShipments()
    }
  }
</script>

<style scoped>
.table-container {
  box-shadow: 0 0 10px lightgray;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.create-button {
  background-color: #f4f4f4;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 3px lightgray;
}

.create-button:hover {
  background-color: #e0e0e0;
}

.delete-button {
  background-color: red;
  padding: 5px;
  color: white;
  border-radius: 3px;
  box-shadow: 0 0 3px lightgray;
  margin-left: 5%;
  cursor: pointer;
}
</style>