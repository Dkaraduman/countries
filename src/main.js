import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios"

const vueApp = createApp(App)
vueApp.config.globalProperties.$axios = axios;
vueApp.mount('#app')
