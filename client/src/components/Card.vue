<template>
    <div class="col px-0">
        <div class="container">
            <div class="card">
                <div class="card-header text-light bg-dark text-center font-weight-bold"> {{cardTitle}} </div>
                <CardTask
                    v-for="task in listTask" :key="task.id"
                    :task="task"
                    @refresh='refresh'
                ></CardTask>
            </div>
        </div>
    </div> 
</template>

<script>
import CardTask from './CardTask'

export default {
    name: "Card",
    data() {
        return {
            cardTitle: ''
        }
    },
    components: {
        CardTask
    },
    props: [ 'tasks', 'category' ],
    computed: {
        listTask() {
            const list = []
            this.tasks.forEach(el => {
                if (el.category === this.category) {
                    list.push(el)
                } 
            });
            return list
        }
    },
    methods: {
        refresh() {
            this.$emit('refresh')
        }
    },
    created() {
        (this.category === 'back log') ? this.cardTitle = 'Back Log'
        : (this.category === 'todo') ? this.cardTitle = 'Todo'
        : (this.category === 'done') ? this.cardTitle = 'Dono'
        : this.cardTitle = 'Completed'
    },
}
</script>