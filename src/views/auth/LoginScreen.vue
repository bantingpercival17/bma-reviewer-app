<template>
  <div class="row mt-5 align-items-center vh-50">
    <div class="col-lg-12 col-md-12 mt-5">
      <div class="card-body mt-5">
        <div class="text-center">
          <img src="@/assets/image/bma-logo-1.png" class="center img-fluid avatar avatar-100 rounded-circle"
            alt="logo" />
        </div>
        <h2 class="mb-2 text-center"><b>STUDENT PORTAL</b></h2>
        <p class="text-center">SIGN IN</p>
        <!--  <p class="text-center">{{ axiosServer }}</p> -->
        <form @submit.prevent="onLogin" class="row">
          <div class="">
            <div class="col-lg-12">
              <input-component-v2 type="email" label="email" v-model:value="username" :error="errors.email" />
            </div>
            <div class="col-lg-12">
              <input-component-v2 type="password" label="password" v-model:value="password" :error="errors.password" />
            </div>
            <span class="badge bg-danger mt-2" v-if="errorMessage">{{
          errorMessage
        }}</span>

            <div class="col-lg-12 d-flex justify-content-between">
              <div class="form-check mb-3">
                <input type="checkbox" class="form-check-input" id="customCheck1" v-model="rememberMe" />
                <label class="form-check-label" for="customCheck1">Remember Me</label>
              </div>
              <!--   <router-link :to="{ name: 'app-layout.student-forget-password' }" class=""
                >Forgot Password?</router-link
              > -->
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-primary w-100" type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
    <!-- <div class="res-hide col-lg-7 col-md-0 d-md-block d-none p-0">
      <img
        src="@/assets/image/banner-login-2.jpg"
        class="img-fluid gradient-main vh-100"
        alt="images"
      />
    </div> -->
  </div>
</template>
<script>
import InputComponentV2 from "@/views/elements/InputComponentV2.vue";
import LoginValidation from "@/services/validation/LoginValidation";
import axios from "axios";
import {
  LOGIN_ACTION,
  SHOW_LOADING_MUTATION,
} from "@/store/storeConstants.js";
import {
  alertController,
  loadingController
} from '@ionic/vue';
import { mapActions, mapMutations } from "vuex";
export default {
  name: "LoginScreen",
  components: {
    InputComponentV2,
    alertController
  },
  data() {
    return {
      username: "",
      password: "",
      rememberMe: "",
      errors: [],
      message: [],
      errorMessage: "",
      url: "",
      crsf: "",
      axiosServer: axios.defaults.baseURL
    };
  },
  async mounted() {
    axios
      .get("checker")
      .then((response) => {
        console.log(response.data.bot);
      })
      .catch((error) => {
        console.log(error);
      });
    this.url = axios.defaults.baseURL;
    this.crsf = axios.defaults.xsrfHeaderName;
  },
  methods: {
    ...mapActions("auth", {
      login: LOGIN_ACTION,
    }),
    ...mapMutations({
      showLoading: SHOW_LOADING_MUTATION,
    }),
    async onLogin() {
      const validation = new LoginValidation(this.username, this.password);
      this.errors = validation.checkValidations();
      if ("email" in this.errors || "password" in this.errors) {
        return false;
      }
      this.errorMessage = "";
      this.showLoading(true);
      const data = {
        email: this.username,
        password: this.password,
        app: true,
        remember_me: this.rememberMe,
      };
      const loading = await loadingController.create({
        message: 'Loading...',
        cssClass: 'custom-loading',
      });

      loading.present();
      try {
        console.log(data);
        const response = await this.login(data);
        this.$router.push("/reviewer");
      } catch (error) {
        this.errorMessage = error;
        loading.dismiss()
      }
      loading.dismiss()
    },
  },
};
</script>
