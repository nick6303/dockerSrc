import './assets/css/layout/reset.css'
import './assets/css/style.sass'

import { createApp } from 'vue'
import { createModal } from './slime-modal/src'

import App from './App.vue'

import store from './store'


const app = createApp(App)


app.use(store).use(createModal('modal')).mount('#app')