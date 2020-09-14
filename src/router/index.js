import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/home.vue'),
    redirect: '/category/create',
    children: [
      {
        path: '/category/create',
        name: 'categoryEdit',
        component: () => import(/* webpackChunkName: "categoryEdit" */ '../pages/categoryEdit/categoryEdit.vue')
      },
      {
        path: '/category/list',
        name: 'categoryList',
        component: () => import(/* webpackChunkName: "categoryList" */ '../pages/categoryList/categoryList.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName: "test" */ '../pages/test.vue')
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
