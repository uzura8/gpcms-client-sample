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
        name: 'TopPage',
        component: () => import('@/views/PostListPage.vue')
      },
      {
        path: '/about',
        name: 'AboutPage',
        component: () => import('@/views/AboutPage.vue')
      },
      {
        path: '/posts',
        name: 'PostListPage',
        component: () => import('@/views/PostListPage.vue')
      },
      {
        path: '/posts/:slug',
        name: 'PostDetailPage',
        component: () => import('@/views/PostDetailPage.vue')
      },
      {
        path: '/categories/:slug/posts',
        name: 'PostListByCategoryPage',
        component: () => import('@/views/PostListByCategoryPage.vue')
      },
      {
        path: '/tags/:tagLabel/posts',
        name: 'PostListByTagPage',
        component: () => import('@/views/PostListByTagPage.vue')
      },
      {
        path: '/post-groups/:slug/posts',
        name: 'PostListByGroupPage',
        component: () => import('@/views/PostListByGroupPage.vue')
      }
    ]
  },
  //{
  //  path: '/admin',
  //  component: AdminLayout,
  //  children: [],
  //},
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

export default routes
