import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
//import AdminLayout from '@/layouts/AdminLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'top',
        component: () => import('@/views/Top.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue')
      },
    ],
  },
  //{
  //  path: '/admin',
  //  component: AdminLayout,
  //  children: [],
  //},
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/NotFound.vue')
  },
]

export default routes
