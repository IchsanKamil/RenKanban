<template>
    <div id="bod">
        <Navbar 
            @logoutDone='logoutDone'
        ></Navbar>
        <AddTask
            @refresh='refresh'
        ></AddTask>
        <div class="container mt-3">
            <div class="row">
                <Card
                    v-for="(category, idx) in categories" :key="idx"
                    :category="category"
                    :tasks="tasks"
                    @refresh='refresh'
                ></Card>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar"
import Card from '../components/Card'
import AddTask from '../components/AddTask'

export default {
    name: "MainPage",
    data() {
        return {
            categories: ['back log', 'todo', 'done', 'completed']
        }
    },
    components: {
        Navbar,
        Card,
        AddTask
    },
    props: [ 'tasks' ],
    methods: {
        logoutDone() {
            this.$emit('logoutDone')
        },
        refresh() {
            this.$emit('refresh')
        }
    },
}
</script>