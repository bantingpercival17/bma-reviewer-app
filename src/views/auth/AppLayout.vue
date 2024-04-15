<template>
  <ion-tabs>
    <ion-router-outlet />
    <BottomNavigation />
  </ion-tabs>
</template>

<script>
import { IonRouterOutlet, IonTabs } from "@ionic/vue";
import BottomNavigation from "@/views/components/navigation/BottomNavigation.vue";
export default {
  name: "AppLayout",
  mounted() {
    console.log("App Layout");
  },
  components: {
    IonRouterOutlet,
    IonTabs,
    BottomNavigation,
  },
};
</script>
