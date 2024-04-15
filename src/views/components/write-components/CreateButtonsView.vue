<template>
    <div class="menu-buttons">
        <div v-for="(button, index) in buttons" :key="index" class="menu-button" :style="{ backgroundColor: button.color }"
            @click="handleButtonClick(button)">
            <div class="button-image" :style="{ backgroundImage: `url(${button.image})` }"></div>
            <div class="button-text">{{ button.text }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateButtonsView',
    data() {
        return {
            buttons: [
                { text: 'PRACTICE', image: '/assets/writing-1.jpg', color: 'rgba(255, 0, 0, 0.75)' }, // Red
                { text: 'WRITE ORIGINAL TEXT', image: '/assets/writing-2.jpg', color: 'rgba(0, 255, 0, 0.75)' }, // Green
                { text: 'PRACTICE WITH TIME', image: '/assets/writing-3.jpg', color: 'rgba(0, 0, 255, 0.75)' }, // Blue
                { text: 'WRITE AN ESSAY', image: '/assets/writing-4.jpg', color: 'rgba(255, 255, 0, 0.75)' }, // Yellow
            ],
        };
    },
    methods: {
        handleButtonClick(button) {
            // Add your logic for handling button clicks here
            console.log(`${button.text} clicked!`);
            window.location.href = '/write/create';
        },
    },
};
</script>

<style scoped>
.menu-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px;
}

.menu-button {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.menu-button:hover {
    transform: scale(1.05);
}

.button-image {
    width: 100%;
    height: 100px;
    opacity: 70%;
    /* Adjust the height according to your design */
    background-size: cover;
    background-position: center;
}

.button-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    /* Adjust text color according to your design */
    font-size: 16px;
    /* Adjust font size according to your design */
    font-weight: bold;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
