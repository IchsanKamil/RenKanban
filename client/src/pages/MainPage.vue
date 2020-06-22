<template>
    <div>
        <Navbar 
            @logoutDone='logoutDone'
        ></Navbar>
        <div class="container mt-3">
            <Card
                :tasks="tasks"
            ></Card>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar"
import Card from '../components/Card'

export default {
    name: "MainPage",
    components: {
        Navbar,
        Card
    },
    props: [ 'tasks' ],
    methods: {
        logoutDone() {
            this.$emit('logoutDone')
        }
    },
}
</script>