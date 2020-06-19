new Vue ({
    el: '#app',
    data: {
        baseUrl: 'http://localhost:3000',
        message: 'hai vue',
        emailLogin: '',
        passwordLogin: '',
        isLogin: false,
        tasks: [],
        userEmail: '',
        title: '',
        description: '',
        category: '',
        due_date: ''
    },
    computed: {
        fetchBackLog() {
            const backLog = []
            this.tasks.forEach(el => {
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
    },
    methods: {
        login() {
            let email = this.emailLogin;
            let password = this.passwordLogin;

            axios({
                method: 'post',
                url: this.baseUrl + '/login',
                data: { email, password }
            })
                .then(respon => {
                    const { email, token } = respon.data;
                    localStorage.setItem('token', token)
                    localStorage.setItem('currentUserEmail', email)
                    console.log(localStorage.currentUserEmail, '<< email user');
                    this.userEmail = localStorage.currentUserEmail
                    this.fetchTasks()
                })
                .catch(err => {
                    console.log('error');
                    console.log(err, '<< err');
                })
        },
        logout() {
            localStorage.clear()
            this.isLogin = false
        },
        fetchTasks() {
            axios({
                method: 'get',
                url: this.baseUrl + '/tasks',
                headers: {
                    token: localStorage.token
                }
            })
                .then((result) => {
                    this.tasks = result.data
                }).catch((err) => {
                    console.log(err, '<< err fecthTask');
                });
        },
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
    created() {
        console.log('ini created');
        const token = localStorage.token

        if (token) {
            this.isLogin = true
            this.userEmail = localStorage.currentUserEmail
            this.fetchTasks()
        }
    },
    mounted() {
        console.log('ini mounted');
    }
})