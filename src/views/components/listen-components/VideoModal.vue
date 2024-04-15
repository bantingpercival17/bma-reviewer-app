<template>
    <ion-modal :is-open="modalIsOpen">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ title }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <iframe :src="content" style="width: 100%;"></iframe>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonCardTitle, IonCardHeader, IonCard, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCardContent } from '@ionic/vue';
export default {
    name: 'VideoModal',
    props: {
        modalIsOpen: Boolean,
        title: String,
        content: String,
    },
    components: {
        IonCardTitle, IonCardHeader, IonCard, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonCardContent
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>
