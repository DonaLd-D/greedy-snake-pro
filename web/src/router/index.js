import { createWebHistory, createRouter } from 'vue-router'

// 公共路由
export const routes = [
  {
    path: '',
    redirect:'/pk'
  },
  {
    path: '/pk',
    component: () => import('@/views/pk.vue'),
  },
  {
    path: '/record',
    component: () => import('@/views/record.vue'),
  },
  {
    path: '/rank',
    component: () => import('@/views/rank.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/register',
    component: () => import('@/views/register.vue'),
  },
  {
    path: '/user',
    component: () => import('@/views/user.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
