<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Reviewer</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logoutUser()">
            <ion-icon :icon="logOut" class="p-0 m-0" size="medium"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!-- <ion-button slot="end" class="bg-white" shape="round" @click="logOut">
          <ion-icon :icon="logOut" class="p-0 m-0" size="medium"></ion-icon>
        </ion-button> -->
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
        <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
          refreshing-text="Refreshing...">
        </ion-refresher-content>
      </ion-refresher>
      <div v-if="categories.length > 0">
        <div v-for="(item, index) in categories" :key="index">
          <router-link :to="{ name: 'screen-layout.category', params: { category: item.id } }">
            <ion-card class="bg-info">
              <ion-card-header>
                <ion-card-title class="text-white">
                  {{ item.category_name }}
                </ion-card-title>
                <ion-card-subtitle class="text-white">
                  Total number of Question : {{ item.question_lists.length }}
                </ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </router-link>
        </div>
      </div>
      <div v-else>
        <div v-if="errorMessage">
          <ion-card>
            <ion-card-content class="text-center">
              <label for="">{{ errorMessage }}</label>
              <br />
              <button class="btn btn-primary btn-sm mt-4" @click="refreshData">
                TRY AGAIN
              </button>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<style scoped>
ion-spinner {
  width: 100px;
  height: 100px;
  text-align: center;
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  alertController,
  IonSpinner,
  IonCardContent,
  loadingController, IonRefresher, IonRefresherContent, IonIcon, IonButtons
} from "@ionic/vue";
import { logOut } from 'ionicons/icons'
import { LOGOUT_ACTION } from '@/store/storeConstants.js'
import { mapActions } from 'vuex';
import axios from "axios";
export default {
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonSpinner,
    loadingController, IonRefresher, IonRefresherContent, IonIcon, IonButtons
  },
  data() {
    return {
      categories: [],
      errorMessage: "",
      logOut
    };
  },
  mounted() {
    console.log("Reviewer View");
    this.mountedData();
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION
    }),
    logoutUser() {
      this.logout()
      this.$router.replace('/')
    },
    syncCategory(item) {
      axios
        .post("/category-view", { category: item })
        .then(async (response) => {
          console.log(response);
          const responseData = response.data.category;
          const data = {
            category: responseData.category_name,
            examination: responseData.examination_id,
            sync: responseData.id,
          };
          if (insertCategory.responseStatus === 200) {
            this.customAlert("Success Request", insertCategory.message);
          } else {
            this.customAlert("Error Request", insertCategory.message);
          }
        })
        .catch((error) => {
          this.presentAlert();
          console.log(error);
        });
    },
    async mountedData() {
      const alertLoading = await this.loadingAlert();
      alertLoading.present();
      axios
        .get("/examination-review")
        .then(({ data }) => {
          this.categories = data.examination.category_lists;
          //this.isLoading = false;
          alertLoading.dismiss()
        })
        .catch((error) => {
          this.errorMessage = error;
          //this.isLoading = false;
          this.customAlert('Error Alert', this.errorMessage)
          alertLoading.dismiss()

          console.log(error);
        });
    },
    refreshData() {
      //this.isLoading = true;
      this.mountedData();
    },
    async presentAlert() {
      const alert = await alertController.create({
        header: "Alert",
        subHeader: "Important message",
        message: "This is an alert!",
        buttons: ["OK"],
      });

      await alert.present();
    },
    async loadingAlert() {
      const loading = await loadingController.create({
        message: 'Loading...',
        cssClass: 'custom-loading',
      });

      return loading
    },
    async customAlert(header, message) {
      const alert = await alertController.create({
        header: header,
        subHeader: "System Message",
        message: message,
        buttons: ["OK"],
      });

      await alert.present();
    },
    async handleScroll(event) {
      // Show loading alert if the user scrolls
      this.categories = []
      this.mountedData()
      event.target.complete();
    },
  },
};
</script>
