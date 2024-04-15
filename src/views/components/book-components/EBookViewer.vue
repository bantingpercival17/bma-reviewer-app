<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Book View</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button></ion-back-button>
                    </ion-buttons>
                    <ion-title size="large">Book View</ion-title>
                </ion-toolbar>
            </ion-header>
            <div v-if="isLoading">
                <ion-skeleton-text animated style="width: 100%; height: 20px;"></ion-skeleton-text>
            </div>
            <div v-else>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>{{ bookName }}</ion-card-title>
                        <ion-card-subtitle>{{ bookDescription }}</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <iframe :src="contentLink" width="100%" height="500"></iframe>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>
<style scoped>
.responsive-img {
    width: auto;
}
</style>
<script>
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonImg, IonSkeletonText } from '@ionic/vue';

export default {
    name: 'BookListView',
    components: { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonImg, IonSkeletonText },
    data() {
        return {
            isLoading: true,
            bookName: 'Book Name',
            bookDescription: 'Book Description',
            contentLink: null,
            subjectLists: [
                {
                    id: 1,
                    bookCover: '/assets/books/Alternative Medicine October 2023.png',
                    bookName: 'Alternative Medicine',
                    bookDescription: '"Alternative Medicine October 2023" presents a forward-thinking exploration of non-traditional healing approaches, offering readers a glimpse into the latest developments and perspectives in the ever-evolving field of alternative medicine.',
                    bookLink: '/assets/scorm/Alternative Medicine October 2023/res/index.html',
                    numberOfReaders: '70%'
                },
                {
                    id: 2,
                    bookCover: '/assets/books/Elon Musk Walter Isaacson.png',
                    bookName: 'Elon Musk Walter Isaacson',
                    bookDescription: '"Elon Musk" by Walter Isaacson provides an intimate portrait of the visionary entrepreneur, exploring Musks relentless drive and innovative mind that have reshaped industries and pushed the boundaries of technology.',
                    bookLink: '/assets/scorm/Elon Musk Walter Isaacson/res/index.html',
                    numberOfReaders: '70%'
                },
                {
                    id: 3,
                    bookCover: '/assets/books/Hbrs 10 Must Reads Ultimate Boxed Set By Misc Authors.png',
                    bookName: 'Hbrs 10 Must Reads Ultimate Boxed Set',
                    bookDescription: 'In "HBRs 10 Must Reads Ultimate Boxed Set," a compilation by various authors, Harvard Business Review curates essential management ideas and timeless articles, providing a comprehensive guide for leaders navigating the complexities of modern business.',
                    bookLink: '/assets/scorm/Hbrs 10 Must Reads Ultimate Boxed Set By Misc Authors/res/index.html',
                    numberOfReaders: '70%'
                },
                {
                    id: 4,
                    bookCover: '/assets/books/Mit Sloan Management Review.png',
                    bookName: 'Mit Sloan Management Review',
                    bookDescription: 'The MIT Sloan Management Review delivers cutting-edge insights and thought leadership in the realm of business and management, offering a valuable resource for executives, scholars, and professionals seeking to stay ahead in a dynamic business landscape.',
                    bookLink: '/assets/scorm/Mit Sloan Management Review/res/index.html',
                    numberOfReaders: '70%'
                },
                {
                    id: 5,
                    bookCover: '/assets/books/My Herbs Issue 24 2023.png',
                    bookName: 'My Herbs Issue',
                    bookDescription: '"My Herbs Issue 24 2023" is a rich source of herbal wisdom, featuring expert insights, practical tips, and the latest trends in natural remedies and holistic well-being for the contemporary herbal enthusiast.',
                    bookLink: '/assets/scorm/My Herbs Issue 24 2023/res/index.html',
                    numberOfReaders: '70%'
                },
                {
                    id: 6,
                    bookCover: '/assets/books/Snip Burn Solder Shred 2011.png',
                    bookName: 'Snip Burn Solder Shred 2011',
                    bookDescription: '"Snip Burn Solder Shred 2011" offers DIY enthusiasts a comprehensive guide to unconventional electronics projects, encouraging readers to unleash their creativity through hands-on experimentation.',
                    bookLink: '/assets/scorm/Snip Burn Solder Shred 2011/res/index.html',
                    numberOfReaders: '70%'
                }
            ]
        }
    },
    mounted() {
        this.setContent()
        setInterval(() => {
            this.isLoading = false
        }, 2000)
        console.log('BookListView')
    },
    methods: {
        encrypt(data) {
            return btoa(data)
        },
        decrypt(data) {
            return atob(data)
        },
        setContent() {
            const viewID = this.decrypt(this.$route.params.book)
            console.log(viewID)
            let foundIndex = null
            this.subjectLists.forEach((element, index) => {
                if (parseInt(viewID) === element.id) {
                    foundIndex = index
                }
            })
            // const foundIndex = this.subjectLists.find(item => item.id === viewID)
            if (foundIndex !== null) {
                this.bookName = this.subjectLists[foundIndex].bookName
                this.bookDescription = this.subjectLists[foundIndex].bookDescription
                this.contentLink = this.subjectLists[foundIndex].bookLink
            }
        }
    }
}
</script>