<template>
  <div>
  <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex mt-4 xs10 offset-xs5 offset-md2 offset-lg3>
        <h3 class="mb-3">Title : {{oneQuestionDetails.title}}</h3>
          <QuestionCard :q="this.$store.state.oneQuestionDetails"></QuestionCard>
          <AnswerCard v-for="(ans, index) in this.$store.state.answersOnThisQuestion" :ans="ans" :key="index"></AnswerCard>
          <br>
          <br>
          <ckeditor :editor="editor" v-model="fill"></ckeditor>
          <div id="answerbutton">
            <v-btn @click="postAnswer">Answer</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import QuestionCard from "../components/QuestionCard";
import AnswerCard from "../components/AnswerCard";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      q: "",
      editor: ClassicEditor,
      fill: "",
      answers : []
    };
  },
  components: {
    QuestionCard,
    AnswerCard
  },
  created() {
    // console.log('kebuatttttt dudududu');
    
  },
  methods: {
    ...mapActions(['getDetailsOnThisQuestion', 'getListAnswersOnThisQuestion']),
    getDetailsOnQuestion() {
      this.getDetailsOnThisQuestion(this.$route.params.id)
      // this.$store.dispatch('getDetailsOnThisQuestion', this.$route.params.id)
      // this.axios
      //   .get(`/questions/${this.$route.params.id}`)
      //   .then(({ data }) => {
      //     this.q = data;
      //     console.log(data, "/????");
      //   })
      //   .catch(err => {
      //     console.log(err.response, "apa erooor?????");
      //   });
    },
    getAnswersOnThisQuestion() {
      this.getListAnswersOnThisQuestion(this.$route.params.id)

      // this.$store.dispatch('getListAnswersOnThisQuestion', this.$route.params.id)

      //   console.log('kalo disini masu ga');
      // this.axios
      //   .get(`/answers/question/${this.$route.params.id}`)
      //   .then(({ data }) => {
      //       this.answers = data
      //     console.log("ini jawaban kalo ada", data);
      //   })
      //   .catch(err => {
      //     console.log(err.response);
      //   });
    },
    postAnswer() {
        this.axios
        .post(`/answers`, 
        {
            description : this.fill,
            userId : localStorage.getItem('id'),
            questionId : this.$route.params.id,
        }, 
        {
            headers : {token : localStorage.getItem('token')}
        })
        .then(({data}) => {

            console.log('sukes ke jawab!!');
            this.getDetailsOnQuestion()
            this.getAnswersOnThisQuestion()
            this.fill = ''

        })
        .catch(err => {
            console.log(err.response, 'gagal jawab!!');
        })
    }
  },
  created() {
    this.getDetailsOnQuestion();
    this.getAnswersOnThisQuestion();
    console.log("masuk sini bosq");
  },
  computed: {
    ...mapState(['oneQuestionDetails', 'answersOnThisQuestion'])
  },
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 250px;
}
</style>
