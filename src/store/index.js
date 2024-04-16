import {
  createStore
} from 'vuex'
import auth from '@/store/module/auth'
import alert from '@/store/module/alert'
import applicant from '@/store/module/applicants'
import {
  SHOW_LOADING_MUTATION
} from './storeConstants'
import {
  loadingController
} from '@ionic/vue'
const store = createStore({
  modules: {
    auth,
    alert,
    applicant
  },
  state() {
    return {
      showLoading: false,
    }
  },
  mutations: {
    [SHOW_LOADING_MUTATION](state, payload) {
      state.showLoading = payload
    },
  }
})
export default store