<template>
    <div class="container">
        <!-- Add Task -->
        <button type="button" class="btn btn-outline-primary btn-sm mt-4" @click="showModal = !showModal">
            Add Task
        </button>

        <!-- Modal Add-->
        <div class="loadingModal" v-if="showModal">
            <div class="theModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
                            <button type="button" class="close" @click="showModal = !showModal">
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
                                        <button class="btn btn-outline-primary mr-1">Create</button>
                                        <button class="btn btn-outline-secondary"
                                            @click="showModal = !showModal">Close</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
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
            baseUrl: "https://ren-kanban.herokuapp.com",
            title: '',
            description: '',
            category: '',
            due_date: '',
            tasks: [],
            showModal: false
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
                    console.log('add task');
                    this.tasks.push({
                        id: result.data.id,
                        title: result.data.title,
                        description: result.data.description,
                        category: result.data.category,
                        due_date: result.data.due_date
                    })
                    this.showModal = false;
                    this.$emit("refresh");
                    this.title = ''
                    this.description = ''
                    this.category = ''
                    this.due_date = ''
                }).catch((err) => {
                    console.log(err, '<<< err addTask');
                });
        }
    },
}
</script>

<style>
.loadingModal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1072;
  /*display: none;*/
}
.theModal {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  width: 100%;
  min-width: 600px;
  max-width: 800px;
  /*background: white;*/
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 1em;
  color: black;
  text-align: center;
}
</style>