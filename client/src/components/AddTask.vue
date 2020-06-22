<template>
    <div class="container">
        <!-- Add Task -->
        <button type="button" class="btn btn-outline-primary btn-sm mt-4" data-toggle="modal"
            data-target="#exampleModal">
            Add Task
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="isModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-center">
                            <div class="col-8">
                                <form @submit.prevent="addTask">
                                    <div class="form-group">
                                        <label for="title">Title :</label>
                                        <input type="text" class="form-control" v-model="title" id="title"
                                            placeholder="e.g: Harimau di Dalam Kubur">
                                    </div>
                                    <div class="form-group">
                                        <label for="description">Description :</label>
                                        <input type="textarea" rows="4" cols="50" class="form-control"
                                            v-model="description" id="description" required
                                            placeholder="The most powerful scene in a movie">
                                    </div>
                                    <div class="form-group">
                                        <label for="category">Category :</label>
                                        <select id="category" v-model="category"
                                            class="custom-select custom-select-sm">
                                            <option value="back log">Back Log</option>
                                            <option value="todo">Todo</option>
                                            <option value="done">Done</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="due_date">Due Date :</label>
                                        <input type="date" class="form-control" v-model="due_date" id="due_date"
                                            required>
                                    </div>
                                    <!-- <button type="submit" class="btn btn-outline-success mb-2">Create</button> -->
                                    <button class="btn btn-outline-primary mr-1">Create</button>
                                    <button class="btn btn-outline-secondary"
                                        data-dismiss="modal">Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "AddTask",
    data() {
        return {
            baseUrl: "http://localhost:3000",
            title: '',
            description: '',
            category: '',
            due_date: '',
            tasks: [],
            isModal: true
        }
    },
    methods: {
        addTask() {
            console.log('masuk addTask');
            axios({
                method: 'post',
                url: this.baseUrl + '/tasks',
                headers: {
                    token: localStorage.token 
                },
                data: {
                    title: this.title,
                    description: this.description,
                    category: this.category,
                    due_date: this.due_date
                }
            })
                .then((result) => {
                    this.tasks.push({
                        id: result.data.id,
                        title: result.data.title,
                        description: result.data.description,
                        category: result.data.category,
                        due_date: result.data.due_date
                    })
                }).catch((err) => {
                    console.log(err, '<<< err addTask');
                });
        }
    },
}
</script>