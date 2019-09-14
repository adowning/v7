import Login from '@/components/LoginForm.vue';
import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'profile',
      component: () => import('./components/Profile.vue'),
      props: true,
    meta: {
      requiresAuth: true
    }
    },
    {
      path: '/',
      name: 'register',
      component: () => import('./components/RegisterForm.vue'),
      props: true,
    meta: {
      requiresAuth: true
    }
  }
    // {
    //   path: '/sessions/:id/detail',
    //   name: 'details',
    //   component: () => import('./components/SessionDetail.vue'),
    //   props: true,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/mysessions',
    //   name: 'mysessions',
    //   component: () => import('./views/MySessions.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/calendar',
    //   name: 'calendar',
    //   component: () => import('./views/Calendar.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/timeline',
    //   name: 'timeline',
    //   component: () => import('./views/Timeline.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/tag/:name',
    //   name: 'tag',
    //   component: () => import('./views/Tagged.vue'),
    //   props: true,
    //   meta: {
    //     requiresAuth: true
    //   }
    // }
  ]
});

router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser;
var currentUser;

try{
   currentUser =  router.app.$parse.user;
}catch(e){
  console.log('still loading ...')
}
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log(requiresAuth)
  console.log(currentUser)

  // TODO: firebase.auth().currentUser is null when the page reloads
  //        Need to wrap in a promise and not resolve until callback comes back.

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;