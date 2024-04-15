<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Reviewer</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="isLoading" class="centered-content">
      <div class="mt-5">
        <center>
          <ion-spinner color="secondary" style="font-size: 3rem"></ion-spinner>
        </center>
      </div>
    </ion-content>
    <ion-content v-else :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Reviewer</ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-if="categories.length > 0">
        <div v-for="(item, index) in categories" :key="index">
          <router-link
            :to="{ name: 'app-layout.category', params: { category: item.id } }"
          >
            <ion-card class="bg-info">
              <ion-card-header>
                <ion-card-title class="text-white">{{
                  item.category_name
                }}</ion-card-title>
                <ion-card-subtitle class="text-white">
                  Total number of Question : {{ item.question_lists.length }}
                </ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </router-link>
        </div>
      </div>
      <div v-else>
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
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonSpinner,
  },
  data() {
    return {
      categories: [],
      isLoading: true,
      errorMessage: "",
    };
  },
  mounted() {
    console.log("Reviewer View");
    this.mountedData();
  },
  methods: {
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
    mountedData() {
      axios
        .get("/examination-review")
        .then(({ data }) => {
          this.categories = data.examination.category_lists;
          this.isLoading = false;
        })
        .catch((error) => {
          this.errorMessage = error;
          this.isLoading = false;
          console.log(error);
        });
    },
    refreshData() {
      this.isLoading = true;
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
    async customAlert(header, message) {
      const alert = await alertController.create({
        header: header,
        subHeader: "System Message",
        message: message,
        buttons: ["OK"],
      });

      await alert.present();
    },
  },
};
</script>
