import moment from 'moment'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import('./fitlers')
// require('./plugins/fontawesome')


createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)

app.config.globalProperties.$filters = {
    date(value) {
        return moment(value).format('DD-MM-YYYY')
    }
}
