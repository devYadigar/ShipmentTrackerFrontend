import { reactive } from 'vue';

export const store = reactive({
    baseApiUrl: 'http://localhost:8000/api/',
    userToken: localStorage.getItem('userToken') || null,
    isSuper: localStorage.getItem('isSuper') || false,
});