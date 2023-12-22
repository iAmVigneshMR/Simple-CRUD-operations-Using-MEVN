<template>
  <!-- <div id="app"> -->
  <div id="app" data-app app-data="true" light>
    <UserListLanding />
  </div>
</template>

<script>
import UserListLanding from './components/UserListLanding.vue'

export default {
  name: 'App',
  components: {
    UserListLanding
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
