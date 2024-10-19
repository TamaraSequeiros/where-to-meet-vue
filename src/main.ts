import { createApp } from 'vue'
// Import the root component App from a single-file component
import App from './App.vue'
// UI component library
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Maps
import VueGoogleMaps from 'vue-google-maps-community-fork'

const app = createApp(App)
app.use(ElementPlus)
app.use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLE_API_KEY,
      libraries: "places"
    },
})
app.mount('#app')
