import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import Vue3Sanitize from 'vue-3-sanitize'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import { config } from '@/configs'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import FontAwesomeIcon from './fontawesome'

import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Vue3Sanitize, {
  allowedTags: ['br', 'a'],
  allowedAttributes: {
    a: ['class', 'href', 'target', 'rel', 'title']
  }
})

if (config.recapchaSiteKey) {
  app.use(VueReCaptcha, {
    siteKey: config.recapchaSiteKey,
    loaderOptions: {
      autoHideBadge: true
    }
  })
}

const head = createHead()
app.use(head)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
