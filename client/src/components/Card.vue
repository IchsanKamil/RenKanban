<template>
    <div class="row">
        <!-- Backlog -->
        <div class="col px-0">
            <div class="container">
                <div class="card">
                    <div class="card-header text-light bg-dark text-center font-weight-bold">Backlog</div>
                    <div v-for="task in fetchBackLog" :key="task.id">
                        <div class="card-body border-success">
                            <h5 class="card-title text-center"> {{ task.title }} </h5>
                            <p class="card-text">{{ task.category }} </p>
                            <!-- <p class="card-text">{{ task.due_date }} </p> -->
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Add Task</small>
                    </div>
                </div>
            </div>
        </div>
        <!-- Todo -->
        <div class="col px-0">
            <div class="container">
                <div class="card">
                    <div class="card-header text-light bg-dark text-center font-weight-bold">Todo</div>
                    <div v-for="task in fetchTodo" :key="task.id">
                        <div class="card-body">
                            <h5 class="card-title text-center">{{ task.title }}</h5>
                            <p class="card-text">{{ task.category }}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Add Task</small>
                    </div>
                </div>
            </div>
        </div>
        <!-- Done -->
        <div class="col px-0">
            <div class="container">
                <div class="card">
                    <div class="card-header text-light bg-dark text-center font-weight-bold">Done</div>
                    <div v-for="task in fetchDone" :key="task.id">
                        <div class="card-body border-success">
                            <h5 class="card-title text-center"> {{ task.title }} </h5>
                            <p class="card-text">{{ task.category }} </p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Add Task</small>
                    </div>
                </div>
            </div>
        </div>
        <!-- Completed -->
        <div class="col px-0">
            <div class="container">
                <div class="card">
                    <div class="card-header text-light bg-dark text-center font-weight-bold">Completed</div>
                    <div v-for="task in fetchCompleted" :key="task.id">
                        <div class="card-body">
                            <h5 class="card-title text-center">{{ task.title }}</h5>
                            <p class="card-text">{{ task.category }}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Add Task</small>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Card",
    // data() {
    //     return {
    //         tasks: tasks
    //     }
    // },
    props: [ 'tasks' ],
    computed: {
        fetchBackLog() {
            const backLog = []
            this.tasks.forEach(el => {
                // el.due_date = new Date(el.due_date.toDateString())
                if (el.category === 'back log') backLog.push(el)
            });
            return backLog
        },
        fetchTodo() {
            const todo = []
            this.tasks.forEach(el => {
                if (el.category === 'todo') todo.push(el)
            });
            return todo
        },
        fetchDone() {
            const done = []
            this.tasks.forEach(el => {
                if (el.category === 'done') done.push(el)
            });
            return done
        },
        fetchCompleted() {
            const completed = []
            this.tasks.forEach(el => {
                if (el.category === 'completed') completed.push(el)
            });
            return completed
        }
    }
}
</script>