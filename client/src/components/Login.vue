<template>
  <div>
    <div class="row justify-content-center mt-5">
      <div class="col-4">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email :</label>
            <input
              type="text"
              class="form-control"
              v-model="emailLogin"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password :</label>
            <input
              type="password"
              class="form-control"
              v-model="passwordLogin"
              id="password"
              required
              placeholder="Enter password"
            />
          </div>
          <button type="submit" class="btn btn-outline-success">Login</button>
          <a class="btn btn-outline-info mx-2" href="#" @click="registerForm">Register</a>
          <GoogleLogin
            :params="params"
            :renderParams="renderParams"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
            class="my-2"
          ></GoogleLogin>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";

export default {
  name: "Login",
  data() {
    return {
      baseUrl: "http://localhost:3000",
      emailLogin: "",
      passwordLogin: "",
      // userEmail: "",
      params: {
        client_id:
          "146068838972-82gthqrugjeib6alk3024ljjggpri4q4.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 150,
        height: 50,
        // longtitle: true
      }
    };
  },
  components: {
    GoogleLogin
  },
  methods: {
    login() {
      let email = this.emailLogin;
      let password = this.passwordLogin;

      axios({
        method: "post",
        url: this.baseUrl + "/login",
        data: { email, password }
      })
        .then(respon => {
          const { email, token } = respon.data;
          localStorage.setItem("token", token);
          localStorage.setItem("currentUserEmail", email);
          // this.userEmail = localStorage.currentUserEmail;
          // console.log(localStorage, "<<< localstorage");
          // this.fetchTasks();
          this.$emit("loginDone");
        })
        .catch(err => {
          console.log("error");
          console.log(err, "<< err");
        });
    },
    registerForm() {
      this.$emit("registerForm");
    },
    onSuccess(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;
      console.log('<<< google vue');
      axios({
        method: "post",
        url: this.baseUrl + "/googleSign",
        data: { id_token }
      })
        .then(data => {
          console.log('masuk google');
          console.log(data, "<<<<< data googleSignIn");
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("currentUserEmail", data.data.email);
          this.$emit("loginDone");
        })
        .catch(err => {
          console.log("ini error >>>> ", err.responseJSON);
        });
    },
    onFailure() {}
  }
};
</script>