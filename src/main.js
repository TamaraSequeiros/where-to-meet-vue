import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App)

app.use(ElementPlus)
app.use(VueGoogleMaps, {
    load: {
      key: process.env.GOOGLE_API_KEY,
    },
  })
app.mount('#app')
