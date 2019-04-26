<template>
  <v-container grid-list-xl text-xs-center>
    <h1 class="mt-4" v-if="this.$route.name == 'question'">Browse through Questions</h1>
    <!-- <h1 class="mt-4" v-if="this.$route.name == 'dashboard'">This is the dashbaord</h1> -->

    <v-layout row wrap>
      <v-flex v-if="this.$route.name == 'question'" mt-4 xs10 offset-xs5 offset-md2 offset-lg3>
        <!-- <v-card v-for="(i, index) in 3" :key="index" flat>
          <v-card-text>asdsad</v-card-text>
        </v-card>-->
        <QuestionCard  v-for="(q, index) in this.filteredData" :q="q" :key="index"></QuestionCard>
      </v-flex>
    </v-layout>
    <router-view ></router-view>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import QuestionCard from "@/components/QuestionCard.vue";
export default {
  props : ['search'],
  components: { QuestionCard },
  data: () => ({
    title: "",
    descriptions: "",
    upVotes: "",
    downVotes: "",
    category: []
  }),
  methods: {

  },
  mounted() {
    this.$store.dispatch("getQuestions");
    console.log(this.$route, 'dapet paramsnya');  
  },
  computed: {
  ...mapState(['listQuestions']),
    filteredData() {
    return this.listQuestions.filter(quest => quest.title.toLowerCase().includes(this.search.toLowerCase()))
   }
  },
};
</script>

<style scope>
</style>