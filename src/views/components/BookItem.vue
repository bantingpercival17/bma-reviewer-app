<template>
    <div class="story-item" :style="getImagePath(content)" @click="gotoBook(content)">
        <span class="text-label">{{ content.title }}</span>
    </div>
</template>

<script>
import { toastController } from '@ionic/vue';
export default {
    name: 'BookItem',
    props: {
        content: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async presentToast() {
            const toast = await toastController.create({
                message: 'This Book is Not Available for Offline Mode!',
                duration: 1500,
                position: 'bottom',
            });

            await toast.present();
        },
        gotoBook(content) {
            if (!content.id) {
                this.presentToast()
            } else {
                console.log(content)
                const link = "/read/view/" + this.encrypt(content.id);
                window.location.href = link;
            }
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