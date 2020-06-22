<template>
  <div>
    <LandingPage 
      v-if="!isLogin"
      @loginDone="loginDone" 
    ></LandingPage>
    <MainPage 
      v-else
      @logoutDone="logoutDone" 
      :tasks="tasks"
    ></MainPage>
  </div>
</template>

<script>
import axios from "axios";
import LandingPage from "./pages/LandingPage.vue";
import MainPage from "./pages/MainPage.vue";

export default {
  name: "App",
  components: {
    LandingPage,
    MainPage
  },
  data() {
    return {
      baseUrl: "http://localhost:3000",
      isLogin: false,
      tasks: [],
      userEmail: "",
      title: "",
      description: "",
      category: "",
      due_date: ""
    };
  },
  methods: {
    loginDone() {
      this.isLogin = true;
      this.fetchTasks();
    },
    logoutDone() {
      this.isLogin = false;
      // this.fetchTasks()
    },
    fetchTasks() {
      axios({
        method: "get",
        url: this.baseUrl + "/tasks",
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.tasks = result.data;
          // console.log(result.data,'<< tasks');
          // console.log(this.tasks, '<< tasks');
        })
        .catch(err => {
          console.log(err, "<< err fecthTask");
        });
    }
  },
  created() {
    console.log("ini created");
    const token = localStorage.token;

    if (token) {
      this.isLogin = true;
      // this.userEmail = localStorage.currentUserEmail;
      this.fetchTasks();
    }
  }
};
</script>

<style>
</style>