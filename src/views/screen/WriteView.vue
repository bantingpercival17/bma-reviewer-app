<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- Logo -->
                <ion-buttons slot="start">
                    <ion-img style="width: 100px; height: 100px;" src="/favicon.png" alt="Logo"></ion-img>
                </ion-buttons>
                <!-- Search Bar -->
                <div class="ion-padding">
                    <ion-searchbar show-cancel-button="focus" placeholder="Search Book"></ion-searchbar>
                </div>
                <!-- User Image -->
                <ion-buttons slot="end">
                    <ion-avatar>
                        <ion-img src="/assets/profile.png" alt="User Image"></ion-img>
                    </ion-avatar>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div class="ion-padding">
                <h2>WRITE</h2>
            </div>

            <div >
                <CreateButtonsView />
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonImg, IonSearchbar, IonAvatar, IonTitle, IonContent, IonBadge, IonList, IonItem, IonButton } from '@ionic/vue';
import CreateButtonsView from '../components/write-components/CreateButtonsView.vue';
export default {
    name: 'WriteView',
    components: {
        IonPage, IonHeader, IonToolbar, IonButtons, IonImg, IonSearchbar, IonAvatar, IonTitle, IonContent, IonBadge, IonList, IonItem, IonButton
        , CreateButtonsView
    },
    data() {
        return {
            buttons: [
                { text: 'PRACTICE', action: () => console.log('Button 1 clicked') },
                { text: 'WRITE ORIGINAL TEXT', action: () => console.log('Button 2 clicked') },
                { text: 'PRACTICE WITH TIME', action: () => console.log('Button 2 clicked') },
                { text: 'WRITE AN ESSAY', action: () => console.log('Button 2 clicked') },
                // Add more buttons as needed
            ],
        };
    },
    methods: {
        buttonClicked(button) {
            button.action();
        },
    },
}
</script>