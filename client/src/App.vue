<template>
  <v-app>
    <v-toolbar fixed color="grey lighten-4" flat height="40px">
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <ModalLogin v-if="!this.$store.state.isLogin"></ModalLogin>
        <!-- <v-btn flat>Sign In</v-btn> -->
        <ModalRegister v-if="!this.$store.state.isLogin"></ModalRegister>

        <v-btn @click="signOut" v-if="this.$store.state.isLogin" flat>Sign Out</v-btn>
        <!-- <v-btn @click="askQuestion" v-if="this.$store.state.isLogin" flat>Ask!</v-btn> -->
        <!-- <v-btn @click="backToDashboard" v-if="this.$store.state.isLogin" flat>Dashboard</v-btn> -->
        <!-- <v-btn @click="browse" v-if="this.$store.state.isLogin" flat>Browse</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>

    <!-- <v-app id="inspire"> -->
    <v-navigation-drawer id="kiri" flat stateless hide-overlay v-model="drawer" fixed>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <img @click="redirect" style="margin-left:-60px; max-height:400px" src="./assets/left_logo.png">
          <!-- <v-list-tile-avatar> -->
          <div class="container align-items right">
            <ul style="list-style: none" align-items-right>
              <!-- <v-flex>
                <v-text-field v-model="searchBox" label="Search" placeholder="Search" box></v-text-field>
              </v-flex>-->
             <li v-if="this.$store.state.isLogin" >
               <p class="white--text">My Preferred Discussion :</p>
               <v-chip v-for="(tag, index) in tags" :key="index"><router-link :to="{ name: 'question-tag', params: { tag: tag }}"> {{tag}} </router-link> </v-chip>
             </li>
             
              <li>
                <v-btn
                  style="background-color:white"
                  @click="askQuestion"
                  v-if="this.$store.state.isLogin"
                  flat
                >Ask!</v-btn>
              </li>
              <li>
                <v-btn
                  style="background-color:white"
                  @click="backToDashboard"
                  v-if="this.$store.state.isLogin"
                  flat
                >Dashboard</v-btn>
              </li>
              <li>
                <v-btn
                  style="background-color:white"
                  @click="browse"
                  v-if="this.$store.state.isLogin"
                  flat
                >Browse</v-btn>
              </li>

               <li>
                <v-flex style="width:170px" v-if="this.$route.name ==  'question'" xs12 >
                  <v-text-field white--text color="white" label="Search..." outline v-model="search"></v-text-field>
                </v-flex>
              </li>
            </ul>
          </div>
          <!-- </v-list-tile-avatar> -->
        </v-list>
      </v-toolbar>
      <!-- <v-list class="pt-0" dense>
          <p>halo</p>
      </v-list>-->
    </v-navigation-drawer>
    <!-- </v-app> -->
    <router-view
    :search="search"
    >

    </router-view>
    <!-- <OpeningJumbotron v-if="!this.$store.state.isLogin"></OpeningJumbotron> -->
  </v-app>
</template>

<script>
import ModalLogin from "./components/ModalLogin.vue";
import ModalRegister from "./components/ModalRegister.vue";
import {mapState} from 'vuex'
export default {
  name: "App",
  data() {
    return {
      search : ''
    }
  },
  components: {
    ModalLogin,
    ModalRegister
    // OpeningJumbotron
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("persistLoginStatus");
      this.getUser()
    }
  },
  data() {
    return {
      gradient: "to top, #7B1FA2, #E1BEE7",
      drawer: true,
      mini: true,
      right: null,
      search: "",
      tags : []
    }
  },
  methods: {
    signOut() {
      this.$store.commit("changeSignOutStatus");
    },
    askQuestion() {
      this.$router.push("/ask");
    },
    backToDashboard() {
      this.$router.push("/dashboard");
    },
    browse() {
      this.$router.push("/questions");
    },
    redirect() {
      this.$router.push("/");
    },
    getUser() {
      this.axios.get(`/users/user/`, {headers : {token : localStorage.getItem('token')}})
      .then(({data}) => {
        // console.log(data);
        this.tags = data.chosenTags
      })
      .catch(err => {
        console.log(err);
        
      })
    }
  }
  
};
</script>

<style scoped>
.fixed {
  position: fixed;
}

v-text-field {
  background-color: white !important
}

#kiri {
  background-color: #26272e;
  height: 100%;
  margin-top: 0px;
  transform: translateX(0px);
  width: 300px;
}

li a {
  text-decoration: none;
}
</style>
