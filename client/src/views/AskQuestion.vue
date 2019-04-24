<template>
  <v-container grid-list-xl text-xs-center>
    <form>
      <v-layout row wrap>
        <v-flex mt-4 xs12 offset-xs5 offset-md2 offset-lg3>
          <v-flex xs12>
            <v-text-field v-model="title" :counter="10" label="Title" required></v-text-field>
            <ckeditor :editor="editor" v-model="description"></ckeditor>
          </v-flex>
        </v-flex>
      </v-layout>
      <div id="buttonpost">
        <div v-if="this.$route.name == 'ask'">
          <v-btn @click="postQuestion">Post Question</v-btn>
        </div>
        <div v-else-if="this.$route.name == 'edit-question'">
          <v-btn @click="editQuestion">Edit Question</v-btn>
        </div>
      </div>
    </form>
  </v-container>
</template>



<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      mode: "",
      title: "",
      description: "",
      editor: ClassicEditor,
      fill: ""
    };
  },
  created() {
    console.log(this.$route.name, "==", "edit-question");
    this.getOneQuestion();
    if (this.$route.name == "edit-question") {
      this.mode == "edit";
      console.log("nyari question");
    }
  },
  methods: {
    postQuestion() {
      this.axios
        .post(
          `/questions`,
          {
            title: this.title,
            description: this.description
          },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          Swal.fire({
            type : 'sucesss',
            text : "Posted!"})
          // console.log(data, "kebuat gak?");
          this.$router.push({name : 'dashboard'})
        })
        .catch(err => {
           Swal.fire({
            type : 'sucesss',
            text : `${err.response}!`})
          console.log(err.err.response);
        });
    },
    getOneQuestion() {
      this.axios
        .get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.title = data.title;
          this.description = data.description;
          console.log(data, "dapet gak??");
        })
        .catch(err => {
          console.log(err, "errornya apa? di get one q!");
        });
    },
    editQuestion() {
      this.axios
        .patch(`/questions/edit/${this.$route.params.id}`, {
          title : this.title,
          description : this.description
        }, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.$router.push(`/dashboard`);
        })
        .catch(err => {
          console.log(err, "errornya apa? di editt one q!");
        });
    }
  }
};
</script>

<style>
#buttonpost {
  display: flex;
  justify-content: flex-end;
}
</style>
