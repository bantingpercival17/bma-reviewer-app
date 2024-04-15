<template>
    <div class="audio-layout">
        <div class="audio-info">
            <img :src="coverImage" alt="Album Cover" class="cover-image" />
            <div class="song-details">
                <h2>{{ songTitle }}</h2>
                <p class="singer">{{ singer }}</p>
            </div>
        </div>
        <div class="audio-controls">
            <button @click="togglePlay" class="play-button">
                <ion-icon v-if="isPlaying" :icon="pause"></ion-icon>
                <ion-icon v-else :icon="play"></ion-icon>
            </button>
        </div>
        <audio ref="audio" :src="audioSource" @ended="audioEnded"></audio>
    </div>
</template>

<script>
import { IonIcon } from '@ionic/vue';
import { play, pause } from 'ionicons/icons';
export default {
    name: 'AudioPlayer',
    props: {
        coverImage: String,
        songTitle: String,
        singer: String,
        audioSource: String,
        // Add more props as needed
    },
    components: {
        IonIcon
    },
    data() {
        return {
            isPlaying: false,
            play, pause
            // Add more properties as needed
        };
    },
    methods: {
        togglePlay() {
            const audio = this.$refs.audio;

            if (this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

            this.isPlaying = !this.isPlaying;
        },
        audioEnded() {
            // Handle the audio ending if needed
            this.isPlaying = false;
        },
    },
};
</script>

<style scoped>
.audio-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fafafa;
    color: #242525;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(75, 75, 75, 0.1);
}

.audio-info {
    display: flex;
    align-items: center;
}

.cover-image {
    width: 80px;
    height: 80px;
    margin-right: 20px;
    border-radius: 5px;
}

.song-details {
    text-align: left;
}

.singer {
    color: #6f6f6f;
    font-weight: 500;
}

.audio-controls .play-button {
    padding: 20px;
    font-size: 24px;
    cursor: pointer;
    background-color: #6dbff6;
    border: none;
    border-radius: 10%;
    color: #fff;
    transition: background-color 0.3s ease;
}


.audio-controls .play-button:hover {
    background-color: #2980b9;
}
</style>