<template>
    <div>
        <Login 
            v-if="!isRegister"
            @loginDone="loginDone"
            @registerForm="registerForm"
        ></Login>
        <Register
            v-else
            @toLogin="toLogin"
        ></Register>
    </div>
</template>

<script>
import Login from '../components/Login'
import Register from '../components/Register'

export default {
    name: "LandingPage",
    data() {
        return {
            isRegister: false
        }
    },
    components: {
        Login,
        Register
    },
    methods: {
        loginDone() {
            this.$emit('loginDone')
        },
        registerForm() {
            this.isRegister = true
        },
        toLogin() {
            this.isRegister = false
        }
    },
}
</script>