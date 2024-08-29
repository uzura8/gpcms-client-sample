import type { RouterScrollBehavior, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalHeaderStore } from '@/stores/globalHeader'
import routes from './routes'

const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          el: to.hash,
          behavior: 'smooth'
        })
      }, 500)
    })
  } else if (savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        //savedPosition.behavior = 'smooth'
        resolve(savedPosition)
      }, 500)
    })
  } else {
    return { left: 0, top: 0 }
  }
}

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior
})

router.beforeEach(
  (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const globalHeader = useGlobalHeaderStore()
    globalHeader.updateMenuOpenStatus(false)
    next()
  }
)

export default router
