<template>
    <div>
        <Navbar 
            @logoutDone='logoutDone'
        ></Navbar>
        <AddTask
        ></AddTask>
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
import AddTask from '../components/AddTask'

export default {
    name: "MainPage",
    components: {
        Navbar,
        Card,
        AddTask
    },
    props: [ 'tasks' ],
    methods: {
        logoutDone() {
            this.$emit('logoutDone')
        }
    },
}
</script>