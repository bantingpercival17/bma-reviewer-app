<template>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="read" href="/reviewer">
      <ion-icon :icon="book"></ion-icon>
      <ion-label>REVIEWER</ion-label>
    </ion-tab-button>
    <ion-tab-button tab="write" href="/examination">
      <ion-icon :icon="create"></ion-icon>
      <ion-label>EXAMINATION</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script>
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/vue";
import { book, create, volumeHigh, mic } from "ionicons/icons";
export default {
  name: "BottomNavigation",
  components: {
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  },
  data() {
    return {
      book,
      create,
      volumeHigh,
      mic,
    };
  },
};
</script>
