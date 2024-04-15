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
                    <span class="badge bg-primary"
                      >QUESTION {{ currentQuestion + 1 }}</span
                    >
                  </div>
                </div>
                <div v-if="!questionList[currentQuestion].question">
                  <img
                    class="img-fluid"
                    :src="questionView(questionList[currentQuestion].image_path)"
                    alt=""
                    height="100"
                  />
                </div>
                <div v-else>
                  <p
                    class="text-primary fw-bolder h5"
                    v-html="questionList[currentQuestion].question"
                  ></p>
                  <img
                    v-if="!questionList[currentQuestion].image_path"
                    :src="questionView(questionList[currentQuestion].image_path)"
                    alt=""
                    height="200"
                  />
                </div>
                <div class="question-choices row">
                  <div
                    class="col-lg-6 col-md-12"
                    v-for="(item, index) in questionList[currentQuestion].choices_v3"
                    :key="index"
                  >
                    <button
                      :class="btnStyle(item.id)"
                      @click="choiceAswer(item.id, currentQuestion, item.is_answer)"
                      v-html="item.choice_name"
                    ></button>
                    <!-- <button :class="btnStyle(item.id)" @click="choiceAnswer(item.id)">
                      {{ item.choice_name }}
                    </button> -->
                  </div>
                </div>
              </div>
              <div class="form-group mt-5">
                <button
                  class="btn btn-outline-info me-3 btn-sm"
                  @click="previousQuestion()"
                  v-if="currentQuestion > 0"
                >
                  PREVIOUS
                </button>
                <button class="btn btn-info text-white btn-sm" @click="nextQuestion()">
                  NEXT
                </button>
              </div>
            </div>
            <div v-else>
              <div class="h4 text-primary text-center fw-bolder">
                Total Score <br />
                <label for="" class="display-6 fw-bolder text-center">{{ score }}</label>
                <button class="btn btn-primary w-100 mt-3" @click="tryAgain">
                  TRY AGAIN
                </button>
                <button class="btn btn-outline-primary w-100 mt-3" @click="backHome">
                  BACK TO HOME
                </button>
              </div>
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
<style scoped>
ion-spinner {
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
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
  IonSpinner,
} from "@ionic/vue";
import axios from "axios";
import ExaminationScore from "@/database/ExaminationScore.js";
import { GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from "@/store/storeConstants";
import { mapGetters } from "vuex";
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
      categoryID: "",
      examinationID: "",
      score: 0,
      examinationScore: new ExaminationScore(),
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
    IonSpinner,
  },
  mounted() {
    this.syncCategory(this.$route.params.category);
  },
  computed: {
    ...mapGetters("auth", {
      token: GET_USER_TOKEN,
      isAuth: IS_USER_AUTHENTICATE_GETTER,
    }),
  },
  methods: {
    syncCategory(item) {
      axios
        .post("/category-view", { category: item })
        .then((response) => {
          const responseData = response.data.category;
          this.examinationID = responseData.examination_id;
          this.categoryID = responseData.id;
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
      if (index !== -1) {
        if (this.selectedChoices[index].choices === choiceIndex) {
          style = "btn btn-primary w-100 mt-4";
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
    choiceAswer(choice, questionIndex, answer) {
      const currentQuestion = this.questionList[questionIndex].id;
      const data = {
        //examination: this.examinationDetails.id,
        question: currentQuestion,
        choices: choice,
        answer: answer,
      };
      const index = this.findQuestionIndex(this.selectedChoices, currentQuestion);

      if (index !== -1) {
        this.selectedChoices[index].choices = choice;
      } else {
        this.selectedChoices.push(data);
      }
      this.countScore();
      this.nextQuestion();
      /* console.log(this.selectedChoices); */
    },
    countScore() {
      this.score = 0;
      this.selectedChoices.forEach((element) => {
        this.score += element.answer;
      });
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
    backHome() {
      this.$router.push("/examination");
    },
    tryAgain() {
      this.currentQuestion = 0;
      this.selectedChoices = [];
      this.storeScore();
    },
    storeScore() {
      let data = [this.score, 1, 1, 1];

      data = {
        score: this.score,
        examination: this.examinationID,
        category: this.categoryID,
      };
      axios
        .post("category-score", data, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then()
        .catch((error) => {
          console.log(error);
        });
      this.examinationScore.insertData(data);
    },
  },
};
</script>
