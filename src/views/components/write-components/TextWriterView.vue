<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center ion-text-uppercase ion-text-bold">Writer</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-textarea v-model="noteContent" placeholder="Type your note here..." rows="6"
                class="ion-margin-top ion-margin-bottom"></ion-textarea>

            <ion-row class="ion-justify-content-center ion-margin-top">
                <ion-col size="6">
                    <ion-button expand="full" @click="saveNote" color="primary">Save Note</ion-button>
                </ion-col>
            </ion-row>

            <ion-row class="ion-justify-content-center ion-margin-top">
                <ion-col size="6">
                    <ion-button expand="full" @click="clearNote" color="danger">Clear Note</ion-button>
                </ion-col>
            </ion-row>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonRow, IonCol, IonButton, IonTextarea, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
export default {
    name: "TextWriter",
    data() {
        return {
            noteContent: "",
        };
    },
    components: {
        IonPage, IonContent, IonRow, IonCol, IonButton, IonTextarea, IonHeader, IonTitle, IonToolbar
    },
    methods: {
        saveNote() {
            // Implement your logic to save the note
            console.log("Note saved:", this.noteContent);
            this.clearNote();
        },
        clearNote() {
            this.noteContent = "";
        },
    },
};
</script>

<style scoped>
/* Typography styles */
.ion-text-center {
    text-align: center;
}

.ion-text-uppercase {
    text-transform: uppercase;
}

.ion-text-bold {
    font-weight: bold;
}

/* Additional styling if needed */
.ion-margin-top {
    margin-top: 16px;
}

.ion-margin-bottom {
    margin-bottom: 16px;
}
</style>
