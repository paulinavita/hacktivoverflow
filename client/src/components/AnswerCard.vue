<template>
  <v-flex>
    <v-card color="grey lighten-3" flat class="mt-4, mb-4">
      <v-layout row>
        <v-flex xs1>
          <v-btn @click="upVote(ans.userId._id)" flat icon color="pink">
            <v-icon>expand_less</v-icon>
          </v-btn>
          <span>{{calculate}}</span>
          <v-btn @click="downVote(ans.userId._id)" flat icon color="pink">
            <v-icon>expand_more</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12>
          <!-- <v-layout row> -->
          <!-- <h3 class="mt-4 text-align-left">hehehe</h3> -->
          <!-- </v-layout> -->
          <v-layout row>
            <span class="mt-2 text-align-left" v-html="ans.description"></span>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-card-actions>
          <span
            style=" background-color:white"
            class="ml-4 text-align-left"
          >Answered by : {{ans.userId.email.split('@')[0]}}</span>
          <v-spacer> </v-spacer>   
          <!-- <router-link :to="{ name: 'edit-answer', params: { id: ans._id}}"> <v-btn style="height:24px;" flat> Edit </v-btn></router-link> -->

          <v-btn @click="editAnswer(ans._id)" v-if="this.$store.state.userId ==  ans.userId._id" flat style="height:23px" color="pink">Edit</v-btn>
                  
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
           <v-spacer></v-spacer>
          <!-- <v-btn class="ml-3" flat color="orange" v-if="this.$route.name == 'question-detail'">Reply</v-btn>
          <v-btn  class="ml-3" flat color="orange" v-if="this.$route.name !== 'question-detail'">-->
          <!-- <router-link :to="{ name: 'question-detail', params: { id: q._id}}">View</router-link> -->
          <!-- </v-btn> -->
        </v-card-actions>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props: ["ans"],
  data() {
    return {
      vote: 0
    };
  },
  created() {
    console.log(this.calculate, "bingung yg mana dah");
  },
  methods: {
    editAnswer() {
      this.$router.push({ name: 'edit-answer', params: { id: this.ans._id } })
    },
    upVote(userId) {
      // console.log(this.ans._id, '/xxxxxx');
      // console.log('apakah ke klik?');
      this.axios
        .patch(
          `answers/upvote/${this.ans._id}/`,
          { userId },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.$store.dispatch('getListAnswersOnThisQuestion', this.$route.params.id)
          console.log("berhasil upvote");
        })
        .catch(err => {
          console.log(err.response);
          Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.response.data.message
         })
        });
      // router.post('/upvote/:questionId', authentication, QuestionController.upVote)
    },
    downVote(userId) {
      this.axios
        .patch(
          `answers/downvote/${this.ans._id}/`,
          { userId },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.$store.dispatch('getListAnswersOnThisQuestion', this.$route.params.id)

          console.log("berhasil downpove");
        })
        .catch(err => {
          console.log(err.response);
          
         Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.response.data.message
         })
          console.log(err.response, "error");
        });
    }
  },
  computed: {
    calculate() {
      return +this.ans.upVotes.length - +this.ans.downVotes.length;
    }
  },
  watch: {
   
  }
};
</script>

<style>

</style>
