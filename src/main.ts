import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import FontAwesomeIcon from './fontawesome'

import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)

const head = createHead()
app.use(head)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
