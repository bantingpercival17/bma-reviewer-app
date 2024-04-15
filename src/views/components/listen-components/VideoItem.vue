<template>
    <div class="story-item" :style="getImagePath(content)" @click="gotoBook(content)">
        <span class="text-label">{{ content.title }}</span>
    </div>
    <VideoModal :modalIsOpen="isModalOpen" :title="titleContent" :content="videoLink" @close="closeModal" />
</template>

<script>
import { toastController, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from '@ionic/vue';
import VideoModal from './VideoModal.vue';
export default {
    name: 'VideoItem',
    props: {
        content: {
            type: Object,
            required: true,
        },
    },
    components: {
        IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, VideoModal
    },
    data() {
        return {
            isModalOpen: false,
            titleContent: '',
            videoLink: ''
        };
    },
    methods: {
        async presentToast() {
            const toast = await toastController.create({
                message: 'This Video is Not Available for Offline Mode!',
                duration: 1500,
                position: 'bottom',
            });

            await toast.present();
        },
        gotoBook(content) {
            if (!content.videoLink) {
                this.presentToast()
            } else {
                console.log(content)
                this.titleContent = content.title
                this.videoLink = content.videoLink
                this.openModal()
            }
        },
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        encrypt(id) {
            return btoa(id);
        },
        getImagePath(content) {
            // Use process.env.BASE_URL to get the base URL of your Vue project
            // This is useful for deploying your app to different paths
            const image = content.coverImage
            return 'background-image: url("' + image + '")'
        }
    },
};
</script>

<style scoped>
.story-item {
    width: 100px;
    height: 150px;
    background-size: cover;
    position: relative;
    display: flex;
    align-items: flex-end;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 10px;
}

.user-avatar {
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    margin: 8px;
}

.text-label {
    font-size: 9px;
    color: white;
    margin: 5px;
}
</style>