<template>
  <ion-page v-if="!isLoading">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/examination"></ion-back-button>
        </ion-buttons>
        <ion-title class="text-primary fw-bolder">{{ titleHeader }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title class="text-primary fw-bolder" size="large">{{
    titleHeader
  }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding">
        <ion-card>
          <ion-card-content>
            <div class="questioner" v-if="currentQuestion < questionList.length">
              <div class="">
                <div class="d-flex justify-content-between mb-5">
                  <div class="question-number">
                    <span class="badge bg-primary">QUESTION {{ currentQuestion + 1 }}</span>
                  </div>
                  <div class="score">
                    <label for="" class="badge bg-info">SCORE</label>
                  </div>
                </div>
                <div class="question-view">
                  <div v-if="questionList[currentQuestion].question === 'none'">
                    <img class="img-fluid"
                      :src="`/src/assets/test-question/${questionList[currentQuestion].image_path}`" alt=""
                      height="100">
                  </div>
                  <div v-else>
                    <p class="text-primary fw-bolder h5" v-html="questionList[currentQuestion].question">
                    </p>
                    <img v-if="questionList[currentQuestion].image_path !== 'none'"
                      :src="`/src/assets/test-question/${questionList[currentQuestion].image_path}`" alt=""
                      height="200">
                  </div>
                </div>
                <!-- <p class="text-primary fw-bolder h5">
                  {{ questionList[currentQuestion].question }}
                </p> -->
                <div class="question-choices row">
                  <div class="col-lg-6 col-md-12" v-for="(item, index) in questionList[currentQuestion].choices_v3"
                    :key="index">
                    <button :class="btnStyle(item.id)" @click="choiceAnswer(item.id)">
                      {{ item.choice_name }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-group mt-5">
                <button class="btn btn-outline-info me-3 btn-sm" @click="previousQuestion()" v-if="currentQuestion > 0">
                  PREVIOUS
                </button>
                <button class="btn btn-info text-white btn-sm" @click="nextQuestion()">
                  NEXT
                </button>
              </div>
            </div>
            <div v-else>
              <div class="h4 text-secondary text-center fw-bolder">Review Done</div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
  <ion-page v-else>
    <ion-skeleton-text animated style="width: 100%; height: 20px"></ion-skeleton-text>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonLabel,
  IonSkeletonText,
  alertController,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import axios from "axios";
export default {
  data() {
    return {
      isLoading: true,
      titleHeader: "Questioner",
      questionList: [],
      questionNumber: [],
      currentQuestion: 0,
      answerActive: [],
      selectedChoices: [],
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonLabel,
    IonSkeletonText,
    IonButtons,
    IonBackButton,
  },
  mounted() {
    this.syncCategory(this.$route.params.category);
  },
  methods: {
    syncCategory(item) {
      axios
        .post("/category-view", { category: item })
        .then((response) => {
          const responseData = response.data.category;
          this.titleHeader = responseData.category_name;
          this.questionList = responseData.question_list_with_answer;
          this.questionNumber = this.questionList.length;
          console.log(this.questionList.length);
        })
        .catch((error) => {
          //this.presentAlert();
          console.log(error);
        });
      this.isLoading = false;
    },
    nextQuestion() {
      this.currentQuestion += 1;
    },
    previousQuestion() {
      this.currentQuestion -= 1;
    },
    findQuestionIndex(array, questionId) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].question === questionId) {
          return i; // Return the index if found
        }
      }
      return -1; // Return -1 if not found
    },
    btnStyle(choiceIndex) {
      const currentQuestion = this.questionList[this.currentQuestion].id;
      const index = this.findQuestionIndex(this.selectedChoices, currentQuestion);
      let style = "btn btn-outline-primary w-100 mt-4";

      if (index !== -1 && this.selectedChoices[index].choices === choiceIndex) {
        const choices = this.questionList[index].choices_v3;
        const answerFound = choices.some(
          (element) => element.id === choiceIndex && element.is_answer === 1
        );

        if (answerFound) {
          style = "btn btn-primary w-100 mt-4";
        } else {
          style = "btn btn-danger w-100 mt-4";
        }
      }

      return style;
    },
    questionView(data) {
      return require(`@/assets/test-question/${data}`);
    },
    questionCorrectAnswer(questionIndex) {
      const choices = this.questionList[questionIndex].choices_v3;
      const answerFound = choices.some((element) => element.is_answer === 1);
    },
    choiceAnswer(choice) {
      const currentQuestion = this.questionList[this.currentQuestion].id;
      const data = {
        question: currentQuestion,
        choices: choice,
      };
      const index = this.findQuestionIndex(this.selectedChoices, currentQuestion);
      if (index !== -1) {
        this.selectedChoices[index].choices = choice;
      } else {
        this.selectedChoices.push(data);
      }
    },
    async customAlert(header, message) {
      const alert = await alertController.create({
        header: header,
        subHeader: "System Message",
        message: message,
        buttons: ["OK"],
      });

      await alert.present();
    },
  },
};
</script>
