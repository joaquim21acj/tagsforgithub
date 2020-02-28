<template>
  <div class="home">
  <div>
    <div style="text-align: -webkit-left;">
      <h3>GitHubStars</h3>
    </div>
    <div style="text-align: -webkit-right; margin-right: 10%;">
      <router-link to="/">Home</router-link>
    </div>
  </div>
    <tabList v-if="listar"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TabList from '@/components/TabList.vue'
import 'bootstrap/dist/css/bootstrap.css'
// import axios from 'axios'
export default {
  name: 'repositories',
  components: {
    TabList
  },
  data: function () {
    return {
      listar: localStorage.listar // Seria usado para validar se o componente de tabelas pode ser exibido
    }
  }
}
</script>
