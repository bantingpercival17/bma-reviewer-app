import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from '@ionic/vue-router';
import store from '../store/index'
import {
  IS_USER_AUTHENTICATE_GETTER,
  GET_USER_TYPE,
  AUTO_LOGIN_ACTION
} from '@/store/storeConstants'

store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
const authRoute = (prop) => [{
  path: '/',
  name: prop + '.login',
  meta: {
    auth: false,
    name: 'Login',
    user: 'guest'
  },
  component: () => import('@/views/auth/LoginScreen.vue')
}]
const appRoute = (prop) => [
  /* {
      path: '/',
      name: prop + '.login',
      meta: {
        auth: false,
        name: 'dashboard',
        user: 'student'
      },
      component: () => import('@/views/screen/ReviewerView.vue')
    }, */
  {
    path: '/reviewer',
    name: prop + '.dashboard',
    meta: {
      auth: false,
      name: 'Reviewer',
      user: 'student'
    },
    component: () => import('@/views/screen/ReviewerView.vue')
  },

  {
    path: '/examination',
    name: prop + '.examination',
    meta: {
      auth: false,
      name: 'Examination',
      user: 'student'
    },
    component: () => import('@/views/screen/examination/ExaminationView.vue')
  },


]
const screenRoute = (prop) => [{
    path: '/reviewer/question/view/:category',
    name: prop + '.category',
    meta: {
      auth: false,
      name: 'Category',
      user: 'student'
    },
    component: () => import('@/views/screen/QuestionerView.vue')
  },
  {
    path: '/examination/question/view/:category',
    name: prop + '.examination-category',
    meta: {
      auth: false,
      name: 'Examination Category',
      user: 'student'
    },
    component: () => import('@/views/screen/examination/ExaminationQuestionerView.vue')
  },
]
const routes = [{
    path: '/',
    name: 'auth-layout',
    component: () => import('@/views/auth/AuthLayout.vue'),
    children: authRoute('auth-layout')
  },
  {
    path: '/',
    name: 'app-layout',
    component: () => import('@/views/auth/AppLayout.vue'),
    children: appRoute('app-layout')
  },
  {
    path: '/',
    name: 'screen-layout',
    component: () => import('@/views/auth/ScreenLayout.vue'),
    children: screenRoute('screen-layout')
  },
]

function UserMiddleware(to, from, next) {
  // Regular user middleware logicd
   if (to.meta.user !== 'student') {
     next('/reviewer')
   } else {
     next()
   }
}

function applicantUserMiddleware(to, from, next) {
  // Admin user middleware logic
  // console.log('Applicant user middleware')
  if (to.meta.user !== 'applicant') {
    next('/applicant/dashboard')
  } else {
    next()
  }
}
/* const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes
}) */
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {

  const isAuth = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  const isAuthType = store.getters[`auth/${GET_USER_TYPE}`]
  document.title = `${to.meta.name} - Baliwag Maritime Academy, Inc.`
console.log(isAuthType)
  if (isAuth) {
    UserMiddleware(to, from, next)
  } else {
    if (to.meta.user !== 'guest') {
      next('/')
    } else {
      next()
    }
  }
})
export default router