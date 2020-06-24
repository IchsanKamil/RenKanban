<template>
    <div class="card mb-3 text-light">
        <div class="card-body" id="cardBody">
            <p class="card-title text-center font-weight-bold" id="title">{{ task.title }}</p>
            <p class="card-text text-left font-weight-normal">Description: {{task.description}}</p>
            <p class="card-text text-left font-weight-normal">Deadline: {{task.UserId}}</p>
            <div class="d-flex justify-content-around" v-if="currentUserId == userId">
                <i class="far fa-edit btn py-0 px-0 btn-sm" @click="showModalEdit = !showModalEdit"></i>
                <i class="far fa-trash-alt btn py-0 px-0 btn-sm" @click="showModalDelete = !showModalDelete"></i>
                <i class="fas fa-arrows-alt-h"></i>
            </div>
        </div>
        <!-- Modal Delete-->
        <div class="loadingModal" v-if="showModalDelete">
            <div class="theModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
                            <button type="button" class="close" @click="showModalDelete = !showModalDelete">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Delete this task ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="showModalDelete = !showModalDelete" > Close </button>
                            <button type="button" class="btn btn-primary" @click="deleteTask(task.id)" > Delete </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Edit-->
        <div class="loadingModal" v-if="showModalEdit">
            <div class="theModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Task</h5>
                            <button type="button" class="close" @click="showModalEdit = !showModalEdit">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row justify-content-center">
                                <div class="col-8">
                                    <form @submit.prevent="editTask(task.id)">
                                        <div class="form-group">
                                            <label for="title">Title :</label>
                                            <input type="text" class="form-control" v-model="title" id="title">
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
                                        <button class="btn btn-outline-primary mr-1">Update</button>
                                        <button class="btn btn-outline-secondary"
                                            @click="showModalEdit = !showModalEdit">Close</button>
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
    name: "CardTask",
    data() {
        return {
            baseUrl: "https://ren-kanban.herokuapp.com",
            showModalDelete: false,
            showModalEdit: false,
            showAction: false,
            currentUserId: +localStorage.currentUserId,
            title: this.task.title,
            description: this.task.description,
            category: this.task.category,
            due_date: this.task.due_date,
            userId: this.task.UserId
        }
    },
    props: [ 'task' ],
    methods: {
        deleteTask(id) {
            axios({
                method: 'delete',
                url: this.baseUrl + `/tasks/${id}`,
                headers: {
                    token: localStorage.token 
                },
            })
                .then((result) => {
                    console.log(result.data, 'delete task');
                    this.showModalDelete = false;
                    this.$emit("refresh");
                }).catch((err) => {
                    console.log(err, '<<< err deleteTask', );
                });
        },
        editTask(id) {
            console.log('edit task');
            axios({
                method: 'put',
                url: this.baseUrl + `/tasks/${id}`,
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
                    console.log('edit task');
                    this.showModalEdit = false,
                    this.$emit("refresh");
                    this.title = this.task.title
                    this.description = this.task.description
                    this.category = this.task.category
                    this.due_date = this.task.due_date
                })
                .catch((err) => {
                    console.log(err, '<<< err editTask');
                });
        }
    }
}
</script>

<style lang="stylus">
#cardBody {
    background-color: #282828;   
}
p {
    font-size : 15px
}
#title {
    font-size : 17px
}
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