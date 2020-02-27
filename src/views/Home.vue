<template>
  <div class="home">
    <tabList v-if="listar"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TabList from '@/components/TabList.vue'
import 'bootstrap/dist/css/bootstrap.css'
// import axios from 'axios'
export default {
  name: 'home',
  components: {
    TabList
  },
  data: function () {
    return {
      listar: localStorage.listar //Seria usado para validar se o componente de tabelas pode ser exibido
    }
  }
}
</script>
