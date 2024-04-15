<template>
  <ion-page>
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonRouterOutlet, IonPage, IonContent } from "@ionic/vue";
export default {
  name: "AuthLayout",
  components: {
    IonRouterOutlet,
    IonPage,
    IonContent,
  },
};
</script>
