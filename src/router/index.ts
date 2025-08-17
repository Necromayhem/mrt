import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/catalog',
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/catalog-view.component.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/favorites-view.component.vue'),
    },
  ],
})

export default router
