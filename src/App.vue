<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, alertController } from "@ionic/vue";
import SQLiteService from "./database/sqlite.service.js";
import { AUTO_LOGIN_ACTION } from "@/store/storeConstants";
import DatabaseSetup from './database/index'
export default {
  components: {
    IonApp,
    IonRouterOutlet,
  },
  /*   mixins: [SQLiteService], */
  async created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
    const databaseConnection = new DatabaseSetup()
    await databaseConnection.initDatabase()
    //await this.initDB(); // Ensure that the database is initialized before proceeding
  },
  methods: {
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

<style>
@import "@/theme/scss/gigz.scss";
@import "@/theme/scss/custom.scss";
@import url("./theme/plugins/Leaflet/leaflet.css");
@import url("./theme/plugins/icons/@fortawesome/fontawesome-free/css/all.min.css");
</style>
