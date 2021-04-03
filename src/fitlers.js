import { createApp } from '@vue/composition-api'
import moment from 'moment'
import App from './App.vue'
// import Vue from 'vue'

const app = createApp(App)

app.config.globalProperties.$filters = {
    date(value) {
        return moment(value).format('DD-MM-YYYY')
    }
}