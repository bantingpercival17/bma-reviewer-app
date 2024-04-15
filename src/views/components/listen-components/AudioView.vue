<template>
    <ion-badge color="secondary">AUDIO LISTENING</ion-badge>
    <div v-for="(audio, index) in audioList" :key="index">
        <AudioPlayer :coverImage="audio.coverImage" :songTitle="audio.title" :singer="audio.singer" :audioSource="audio.audioLink" />
    </div>
</template>

<script>
import { IonList, IonItem, IonLabel, IonBadge } from '@ionic/vue';
import AudioPlayer from './AudioPlayerItem.vue'
export default {
    name: 'AudioView',
    components: {
        IonList, IonItem, IonLabel, IonBadge, AudioPlayer
    },
    props: {
        audioList: {
            type: Array,
            required: true,
        },
    },
};
</script>