import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';
import store from '../store/index'
import {
  IS_USER_AUTHENTICATE_GETTER,
  GET_USER_TYPE
} from '@/store/storeConstants'
const authRoute = (prop) => [{
  path: '/',
  name: prop + '.login',
  meta: {
    auth: false,
    name: 'login',
    user: 'guest'
  },
  component: () => import('@/views/auth/LoginScreen.vue')
}]
const appRoute = (prop) => [{
    path: '/',
    name: prop + '.login',
    meta: {
      auth: false,
      name: 'dashboard',
      user: 'student'
    },
    component: () => import('@/views/screen/ReviewerView.vue')
  }, {
    path: '/reviewer',
    name: prop + '.dashboard',
    meta: {
      auth: false,
      name: 'dashboard',
      user: 'student'
    },
    component: () => import('@/views/screen/ReviewerView.vue')
  },

  {
    path: '/examination',
    name: prop + '.examination',
    meta: {
      auth: false,
      name: 'examination',
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
      name: 'category',
      user: 'student'
    },
    component: () => import('@/views/screen/QuestionerView.vue')
  },
  {
    path: '/examination/question/view/:category',
    name: prop + '.examination-category',
    meta: {
      auth: false,
      name: 'examination-category',
      user: 'student'
    },
    component: () => import('@/views/screen/examination/ExaminationQuestionerView.vue')
  },
]
const routes = [
  /*  {
       path: '/',
       name: 'auth-layout',
       component: () => import('@/views/auth/AuthLayout.vue'),
       children: authRoute('auth-layout')
     }, */
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
    children: screenRoute('app-layout')
  },
]
/* const routes = [{
    path: '/',
    name: 'Reviewer',
    component: () => import('@/views/screen/ReviewerView.vue')
  },
  {
    path: '/question/view/:category',
    name: 'Questioner',
    component: () => import('@/views/screen/QuestionerView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/read',
    name: 'Read',
    component: ReadView
  },
  {
    path: '/read/view/:book',
    name: 'Read-Viewer',
    component: () => import("@/views/components/book-components/EBookViewer.vue"),
  },
  {
    path: '/write',
    name: 'Write',
    component: WriteView
  },
  {
    path: '/write/create',
    name: 'Write-Create',
    component: TextWriter,
  },
  {
    path: '/listen',
    name: 'Listen',
    component: () => import("@/views/screen/ListenView.vue"),
  },

] */

function studentUserMiddleware(to, from, next) {
  // Regular user middleware logic
  // console.log('Student user middleware')
  next('/')
  /*  if (to.meta.user !== 'student') {
     next('/')
   } else {
     next()
   } */
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
const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes
})
/* router.beforeEach((to, from, next) => {
  const isAuth = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  const isAuthType = store.getters[`auth/${GET_USER_TYPE}`]
  document.title = `${to.meta.name} - Baliwag Maritime Academy, Inc.`
  console.log(isAuth)
  if (isAuth) {
    //studentUserMiddleware(to, from, next)
    next()
  } else {
    if (to.meta.user !== 'guest') {
      next('/')
    } else {
      next()
    }
  }
}) */
export default router