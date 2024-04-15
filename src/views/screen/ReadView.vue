<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- Logo -->
                <ion-buttons slot="start">
                    <ion-img style="width: 100px; height: 100px;" src="/favicon.png" alt="Logo"></ion-img>
                </ion-buttons>
                <!-- Search Bar -->
                <div class="ion-padding">
                    <ion-searchbar show-cancel-button="focus" placeholder="Search Book"></ion-searchbar>
                </div>
                <!-- User Image -->
                <ion-buttons slot="end">
                    <ion-avatar>
                        <ion-img src="/assets/profile.png" alt="User Image"></ion-img>
                    </ion-avatar>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div class="ion-padding">
                <h2 class="fw-bolder text-primary">READ BOOKS</h2>
                <div class="item">
                    <ul class="horizontal-list">
                        <li v-for="(item, index) in items" :key="index">
                            <ion-badge :color="item.color">{{ item.name }}</ion-badge>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-for="(item, index) in items" :key="index">
                <BookListV2 v-if="item.data !== null" :category="item.name" :color="item.color" :cards="item.data" />
            </div>


        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonImg, IonSearchbar, IonAvatar, IonTitle, IonContent, IonBadge } from '@ionic/vue';
import BookListV2 from '../components/book-components/BookList.vue';
export default {
    name: 'ReadView',
    components: {
        IonPage, IonHeader, IonToolbar, IonButtons, IonImg, IonSearchbar, IonAvatar, IonTitle, IonContent, IonBadge, BookListV2
    },
    data() {
        const category = [
            {
                "name": "Top Read",
                "color": "primary",
                data: [
                    {
                        id: 1,
                        coverImage: '/assets/books/Alternative Medicine October 2023.png',
                        title: 'Alternative Medicine',
                        description: '"Alternative Medicine October 2023" presents a forward-thinking exploration of non-traditional healing approaches, offering readers a glimpse into the latest developments and perspectives in the ever-evolving field of alternative medicine.',
                        bookLink: '/assets/scorm/Alternative Medicine October 2023/res/index.html',
                        publicDate: '2021-05-01'
                    },
                    {
                        id: 2,
                        coverImage: '/assets/books/Elon Musk Walter Isaacson.png',
                        title: 'Elon Musk Walter Isaacson',
                        description: '"Elon Musk" by Walter Isaacson provides an intimate portrait of the visionary entrepreneur, exploring Musks relentless drive and innovative mind that have reshaped industries and pushed the boundaries of technology.',
                        bookLink: '/assets/scorm/Elon Musk Walter Isaacson/res/index.html',
                        publicDate: '2021-05-01'
                    },
                    {
                        id: 3,
                        coverImage: '/assets/books/Hbrs 10 Must Reads Ultimate Boxed Set By Misc Authors.png',
                        title: 'Hbrs 10 Must Reads Ultimate Boxed Set',
                        description: 'In "HBRs 10 Must Reads Ultimate Boxed Set," a compilation by various authors, Harvard Business Review curates essential management ideas and timeless articles, providing a comprehensive guide for leaders navigating the complexities of modern business.',
                        bookLink: '/assets/scorm/Hbrs 10 Must Reads Ultimate Boxed Set By Misc Authors/res/index.html',
                        publicDate: '2021-05-01'
                    },
                    {
                        id: 4,
                        coverImage: '/assets/books/Mit Sloan Management Review.png',
                        title: 'Mit Sloan Management Review',
                        description: 'The MIT Sloan Management Review delivers cutting-edge insights and thought leadership in the realm of business and management, offering a valuable resource for executives, scholars, and professionals seeking to stay ahead in a dynamic business landscape.',
                        bookLink: '/assets/scorm/Mit Sloan Management Review/res/index.html',
                        publicDate: '2021-05-01'
                    },
                    {
                        id: 5,
                        coverImage: '/assets/books/My Herbs Issue 24 2023.png',
                        title: 'My Herbs Issue',
                        description: '"My Herbs Issue 24 2023" is a rich source of herbal wisdom, featuring expert insights, practical tips, and the latest trends in natural remedies and holistic well-being for the contemporary herbal enthusiast.',
                        bookLink: '/assets/scorm/My Herbs Issue 24 2023/res/index.html',
                        publicDate: '2021-05-01'
                    },
                    {
                        id: 6,
                        coverImage: '/assets/books/Snip Burn Solder Shred 2011.png',
                        title: 'Snip Burn Solder Shred 2011',
                        description: '"Snip Burn Solder Shred 2011" offers DIY enthusiasts a comprehensive guide to unconventional electronics projects, encouraging readers to unleash their creativity through hands-on experimentation.',
                        bookLink: '/assets/scorm/Snip Burn Solder Shred 2011/res/index.html',
                        publicDate: '2021-05-01'
                    }
                ]
            },
            {
                "name": "Science Fiction",
                "color": "secondary",
                data: [
                    {
                        "title": "Dune",
                        "author": "Frank Herbert",
                        "coverImage": "https://picsum.photos/200/300?random=31",
                        "publishDate": "1965-08-01",
                        "description": "Dune is a science fiction masterpiece that explores a desert world called Arrakis, the only source of a valuable spice. The story follows the young Paul Atreides as he navigates political intrigue, prophecy, and the challenges of survival."
                    },
                    {
                        "title": "Neuromancer",
                        "author": "William Gibson",
                        "coverImage": "https://picsum.photos/200/300?random=32",
                        "publishDate": "1984-07-01",
                        "description": "Neuromancer is a cyberpunk classic that introduces the concept of cyberspace. Case, a washed-up computer hacker, is hired for one last job that takes him into a world of corporate espionage and artificial intelligence."
                    },
                    {
                        "title": "Snow Crash",
                        "author": "Neal Stephenson",
                        "coverImage": "https://picsum.photos/200/300?random=33",
                        "publishDate": "1992-06",
                        "description": "Snow Crash is a fast-paced cyberpunk novel that explores a future America where the Mafia delivers pizza and information is a dangerous drug. Protagonist Hiro Protagonist must uncover a virtual reality conspiracy."
                    },
                    {
                        "title": "Ender's Game",
                        "author": "Orson Scott Card",
                        "coverImage": "https://picsum.photos/200/300?random=34",
                        "publishDate": "1985-01",
                        "description": "Ender's Game follows the story of a young boy, Ender Wiggin, who is recruited into a space military school to prepare for an impending alien invasion. The novel explores themes of war, leadership, and morality."
                    },
                    {
                        "title": "The Left Hand of Darkness",
                        "author": "Ursula K. Le Guin",
                        "coverImage": "https://picsum.photos/200/300?random=35",
                        "publishDate": "1969",
                        "description": "The Left Hand of Darkness is a thought-provoking exploration of gender and politics on the planet Gethen. Genly Ai, an envoy from the Ekumen, faces challenges and cultural differences as he tries to make alliances."
                    }
                ]

            },
            {
                "name": "Fantasy",
                "color": "tertiary",
                data: null
            },
            {
                "name": "Historical Fiction",
                "color": "dark",
                data: [
                    {
                        "title": "The Book Thief",
                        "author": "Markus Zusak",
                        "coverImage": "https://picsum.photos/200/300?random=41",
                        "publishDate": "2005-03-14",
                        "description": "The Book Thief is a unique historical fiction novel set in Nazi Germany. It follows the story of Liesel Meminger, a young girl living with a foster family, who develops a love for books and steals them to share with others during a time of war."
                    },
                    {
                        "title": "All the Light We Cannot See",
                        "author": "Anthony Doerr",
                        "coverImage": "https://picsum.photos/200/300?random=42",
                        "publishDate": "2014-05-06",
                        "description": "All the Light We Cannot See is a beautifully written historical novel that tells the parallel stories of a blind French girl and a young German boy whose lives become intertwined during World War II."
                    },
                    {
                        "title": "The Pillars of the Earth",
                        "author": "Ken Follett",
                        "coverImage": "https://picsum.photos/200/300?random=43",
                        "publishDate": "1989-10-03",
                        "description": "The Pillars of the Earth is a historical epic set in 12th-century England. It follows the lives of various characters as they navigate love, politics, and the construction of a cathedral."
                    },
                    {
                        "title": "The Nightingale",
                        "author": "Kristin Hannah",
                        "coverImage": "https://picsum.photos/200/300?random=44",
                        "publishDate": "2015-02-03",
                        "description": "The Nightingale is a poignant historical fiction novel set in Nazi-occupied France. It explores the lives of two sisters, Vianne and Isabelle, and their struggles, sacrifices, and acts of resistance during the war."
                    },
                    {
                        "title": "A Gentleman in Moscow",
                        "author": "Amor Towles",
                        "coverImage": "https://picsum.photos/200/300?random=45",
                        "publishDate": "2016-09-06",
                        "description": "A Gentleman in Moscow is a charming historical novel that unfolds within the confines of the Metropol Hotel in Moscow. Follow the life of Count Alexander Rostov as he navigates a changing Russia from his hotel room."
                    }
                ]

            },
            {
                "name": "Romance",
                "color": "danger",
                data: [
                    {
                        "title": "Pride and Prejudice",
                        "author": "Jane Austen",
                        "coverImage": "https://picsum.photos/200/300?random=36",
                        "publishDate": "1813-01-28",
                        "description": "Pride and Prejudice is a classic romance novel that follows the spirited Elizabeth Bennet as she navigates issues of manners, morality, and marriage in early 19th-century England."
                    },
                    {
                        "title": "Outlander",
                        "author": "Diana Gabaldon",
                        "coverImage": "https://picsum.photos/200/300?random=37",
                        "publishDate": "1991-06-01",
                        "description": "Outlander is a historical romance with a touch of time travel, telling the story of Claire Randall, a World War II nurse who finds herself in 18th-century Scotland and torn between two different lives and loves."
                    },
                    {
                        "title": "Me Before You",
                        "author": "Jojo Moyes",
                        "coverImage": "https://picsum.photos/200/300?random=38",
                        "publishDate": "2012-12-31",
                        "description": "Me Before You is a heartwarming and heartbreaking love story between Louisa Clark, a young woman with a quirky outlook on life, and Will Traynor, a man who has become paralyzed after a motorcycle accident."
                    },
                    {
                        "title": "The Notebook",
                        "author": "Nicholas Sparks",
                        "coverImage": "https://picsum.photos/200/300?random=39",
                        "publishDate": "1996-10-01",
                        "description": "The Notebook is a classic romance novel that tells the story of Noah Calhoun and Allie Nelson, who fall in love during a summer fling but are separated by social class and war. Years later, they rediscover their love."
                    },
                    {
                        "title": "Eleanor Oliphant Is Completely Fine",
                        "author": "Gail Honeyman",
                        "coverImage": "https://picsum.photos/200/300?random=40",
                        "publishDate": "2017-05-09",
                        "description": "Eleanor Oliphant Is Completely Fine is a contemporary romance that explores the life of Eleanor Oliphant, a socially awkward and solitary woman, as she discovers the transformative power of friendship and love."
                    }
                ]
            },
            {
                "name": "Thriller/Suspense",
                "color": "dark",
                data: null
            },
            {
                "name": "Biography/Memoir",
                "color": "medium",
                data: [
                    {
                        id: 1,
                        title: "The Design of Everyday Things",
                        author: "Don Norman",
                        coverImage: "https://picsum.photos/200/300?random=1"
                    },
                    {
                        id: 2,
                        title: "Sapiens: A Brief History of Humankind",
                        author: "Yuval Noah Harari",
                        coverImage: "https://picsum.photos/200/300?random=2"
                    },
                    {
                        id: 3,
                        title: "Atomic Habits",
                        author: "James Clear",
                        coverImage: "https://picsum.photos/200/300?random=3"
                    },
                    {
                        id: 4,
                        title: "The Subtle Art of Not Giving a F*ck",
                        author: "Mark Manson",
                        coverImage: "https://picsum.photos/200/300?random=4"
                    },
                    {
                        id: 5,
                        title: "Educated",
                        author: "Tara Westover",
                        coverImage: "https://picsum.photos/200/300?random=5"
                    },
                    {
                        id: 6,
                        title: "Thinking, Fast and Slow",
                        author: "Daniel Kahneman",
                        coverImage: "https://picsum.photos/200/300?random=6"
                    },]
            },
            {
                "name": "Self-Help/Personal Development",
                "color": "success",
                data: null
            },
            {
                "name": "Science/Nature",
                "color": "medium",
                data: null
            },
            {
                "name": "Cookbook/Culinary",
                "color": "warning",
                data: null
            }
        ]
        return {
            items: category
        }
    }
}
</script>
<style>
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