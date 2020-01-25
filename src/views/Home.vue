<template>
  <div class="home">
    <Login/>
    <TabList/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import TabList from '@/components/TabList.vue'
import 'bootstrap/dist/css/bootstrap.css'
export default {
  name: 'home',
  components: {
    Login,
    TabList
  },
  data: function () {
    return {
      list: []
    }
  }
}
</script>
