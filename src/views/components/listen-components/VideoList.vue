<!-- FacebookStoryWidget.vue -->
<template>
    <div class="ion-padding">
        <ion-badge :color="color">{{ category }}</ion-badge>
        <div class="item">
            <ul class="horizontal-list">
                <li v-for="(item, index) in cards" :key="index">
                    <VideoItem :content="item" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { IonBadge } from '@ionic/vue';
import VideoItem from './VideoItem.vue';
export default {
    name: "VideoList",
    components: {
        VideoItem, IonBadge
    },
    props: {
        category: String, cards: Object, color: String
    },
};
</script>

<style scoped>
.horizontal-list {
    list-style: none;
    padding: 0;
    display: flex;
}

.horizontal-list li {
    margin-right: 10px;
}

.item {
    overflow-x: auto;
    width: 100%;
}
</style>
