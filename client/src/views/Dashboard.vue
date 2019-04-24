<template>
  <v-container grid-list-xl text-xs-center>
    <h1 class="mt-4" v-if="this.$route.name == 'dashboard'">MY QUESTIONS LIST</h1>
    <!-- <h1 class="mt-4" v-if="this.$route.name == 'dashboard'">This is the dashbaord</h1> -->

    <v-layout row wrap>
      <v-flex mt-4 xs10 offset-xs5 offset-md2 offset-lg3>
        <!-- <v-card v-for="(i, index) in 3" :key="index" flat>
          <v-card-text>asdsad</v-card-text>
        </v-card> -->
        <QuestionCard v-for="(q, index) in this.$store.state.myQuestionsList" :q="q" :key="index">
        </QuestionCard>
        <!-- {{myQuestionsList}} -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'
import QuestionCard from '@/components/QuestionCard.vue'
import Swal from 'sweetalert2'

  export default {
    components : {QuestionCard},
    data: () => ({
      
    }),
    created() {
      // console.log('haaaa',this.$store.state.myQuestionsList);
    },
    mounted() {
      this.$store.dispatch('getMyQuestions')
    },
    methods: {
      deleteMyQuestion() {
    // console.log('ada id ga', id, '/////');
      
    //   Swal.fire({
    //       title: 'Are you sure?',
    //       text: "You won't be able to revert this!",
    //       type: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Yes, delete it!'
    //     })
    //     .then((result) => {
    //       if (result.value) {
    //         this.axios.delete(`/questions/delete/${id}`, {
    //             headers: {
    //               token: localStorage.getItem("token")
    //             }
    //           })
    //           .then((deleted) => {
    //             Swal.fire(
    //               'Deleted!',
    //               'Your question has been deleted.',
    //               'success'
    //               )

    //             this.$store.dispatch('getMyQuestions');
    //           })
    //       }
    //     })
    //     .catch(err => {
    //       Swal.fire({
    //         type: 'error',
    //         title: 'Oops...',
    //         text: 'Something went wrong!'
    //       })
    //     })
      },
      showMyEditForm() {
      this.$router.push(`/edit-question/${id}`);
      }
    },
    computed: mapState(["myQuestionsList"])
  }
</script>

<style scope>


</style>
