import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*export const demoRouter = [
  {
    path: '/toolbar',
    name: 'toolbar',
    meta: {
      icon: require('@/assets/icon/toolbar.png')
    },
    component: () => import('@/views/example/toolbar')
  },
  {
    path: '/editor',
    name: 'editor',
    meta: {
      icon: require('@/assets/icon/group.png')
    },
    component: () => import('@/views/example/editor')
  }
]*/

export const homepageRouter = [
 {
    path: '/',
    name: 'redir',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      icon: require('@/assets/icon/home.png')
    },
    component: () => import('@/components/ExperimentDesigner')
  },
  /* {
    path: '/toolbar',
    name: 'toolbar',
    meta: {
      icon: require('@/assets/icon/toolbar.png')
    },
    component: () => import('@/views/example/toolbar')
  }, */
  {
    path: '/editor',
    name: 'editor',
    meta: {
      icon: require('@/assets/icon/group.png')
    },
    component: () => import('@/views/example/editor')
  }
]

/*export const globalRouter = [
  {
    path: '/',
    name: 'home',
    redirect: '/welcome',
    component: () => import('@/App'),
    children: [
      ...homepageRouter
    ]
  },
]*/


export default new Router({
  routes: [...homepageRouter]
})
