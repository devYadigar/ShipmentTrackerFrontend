import { createRouter, createWebHistory } from 'vue-router';
import UserRegister from './components/UserRegister.vue'
import UserLogin from './components/UserLogin.vue'
import ShipmentList from './components/ShipmentList.vue'
import CreateShipment from './components/CreateShipment.vue'
import EditShipment from './components/EditShipment.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/register',
            name: 'Register',
            component: UserRegister
        },
        {
            path: '/login',
            name: 'Login',
            component: UserLogin
        },
        {
            path: '/shipment/list',
            name: 'ShipmentList',
            component: ShipmentList
        },
        {
            path: '/shipment/create',
            name: 'CreateShipment',
            component: CreateShipment
        },
        {
            path: '/shipment/edit/:id',
            name: 'EditShipment',
            component: EditShipment
        },

    ]
});

export default router;