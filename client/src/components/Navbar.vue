<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light sticky-top" id="navbar-custom">
      <a class="navbar-brand mr-auto" href="#" onclick="auth()">Kanban</a>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          > {{ userEmail }} </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" @click="logout">Logout</a>
          </div>
        </li>
      </ul>
      <!-- <button class="btn btn-danger" @click="logout">Logout</button> -->
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      userEmail: localStorage.currentUserEmail
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      // this.isLogin = false;
      this.$emit('logoutDone')
    }
  }
};
</script>

<style lang="stylus">
#navbar-custom {
  background: #147dd9;
}
</style>