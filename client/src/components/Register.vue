<template>
    <div>
        <div class="row justify-content-center mt-5">
            <div class="col-4">
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="email">Email :</label>
                        <input type="text" class="form-control" v-model="emailRegister" id="emailRegis"
                            placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password :</label>
                        <input type="password" class="form-control" v-model="passwordRegister" id="passwordRegis" required
                            placeholder="Enter password">
                    </div>
                    <button type="submit" class="btn btn-outline-success mx -2">Register</button>
                    <a class="btn btn-outline-warning" @click="cancelRegister">Cancel</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Register",
    data() {
        return {
            baseUrl: "https://ren-kanban.herokuapp.com",
            emailRegister: "",
            passwordRegister: "",
        }
    },
    methods: {
        register() {
        let email = this.emailRegister;
        let password = this.passwordRegister;

        axios({
            method: "post",
            url: this.baseUrl + "/register",
            data: { email, password }
        })
            .then(respon => {
                console.log(respon, '<<<<<<< data register');
                // this.$emit('loginDone')
                this.$emit("toLogin")

            })
            .catch(err => {
                console.log("error");
                console.log(err, "<< err");
            });
        },
        cancelRegister() {
            this.$emit("toLogin")
        }
    }
}
</script>