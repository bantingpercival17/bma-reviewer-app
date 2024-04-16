<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Examination</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="isLoading" style="display: flex; justify-content: center; align-items: center">
      <center>
        <ion-spinner color="secondary" style="font-size: 3rem"></ion-spinner>
      </center>
    </ion-content>
    <ion-content v-else :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleScroll($event)">
        <ion-refresher-content pulling-text="Pull to refresh" refreshing-spinner="circles"
          refreshing-text="Refreshing...">
        </ion-refresher-content>
      </ion-refresher>
      <div v-for="(item, index) in categories" :key="index">
        <router-link :to="`/examination/question/view/` + item.id">
          <ion-card class="bg-primary">
            <ion-card-header>
              <ion-card-title class="text-white">{{ item.category_name }}</ion-card-title>
              <ion-card-subtitle class="text-white">
                Total number of Question : {{ item.question_lists.length }}
              </ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </router-link>
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
  loadingController, IonRefresher, IonRefresherContent
} from "@ionic/vue";
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
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    loadingController, IonRefresher, IonRefresherContent
  },
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    console.log("Examination View");
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const alertLoading = await this.loadingAlert();
      alertLoading.present();
      axios
        .get("/examination-review")
        .then(({ data }) => {
          alertLoading.dismiss()
          this.categories = data.examination.category_lists;
        })
        .catch((error) => {
          console.log(error);
        });
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
      this.fetchData()
      event.target.complete();
    },
  },
};
</script>
