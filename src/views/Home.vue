<template>
  <div class="home">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import 'bootstrap/dist/css/bootstrap.css'
export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
