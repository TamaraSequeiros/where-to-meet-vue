import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import VueGoogleMaps from 'vue-google-maps-community-fork'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLE_API_KEY,
      libraries: "places"
    },
})
app.mount('#app')
