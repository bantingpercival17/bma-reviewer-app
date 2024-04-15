<!-- FacebookStoryWidget.vue -->
<template>
    <div class="ion-padding">
        <ion-badge :color="color">{{ category }}</ion-badge>
        <div class="facebook-story-widget">
            <div class="story-container">
                <book-item v-for="(story, index) in cards" :key="index" :content="story" />
            </div>
            <div class="navigation-controls">
                <!-- Add navigation controls (e.g., arrows, dots) as needed -->
            </div>
        </div>
    </div>
</template>

<script>
import { IonBadge } from '@ionic/vue';
import BookItem from './BookItem.vue';

export default {
    components: {
        BookItem, IonBadge
    },
    props: {
        category: String, cards: Object, color: String
    },
};
</script>

<style scoped>
.facebook-story-widget {
    width: 100%;
}

.story-container {
    display: flex;
    overflow-x: auto;
}

.navigation-controls {
    /* Add styles for navigation controls (optional) */
}
</style>
