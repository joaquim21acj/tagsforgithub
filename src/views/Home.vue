<template>
  <div class="home">
    <b-table striped hover :fields="fields" :items="list">
     <template v-slot:cell(Repository)="data">
        {{ data.item.node.name }}
      </template>
      <template v-slot:cell(Description)="data">
        {{ data.item.node.description }}
      </template>
      <template v-slot:cell(Language)="data">
         <p v-for="(item) in  data.item.node.languages.edges" :key="item.node.name">{{ item.node.name }}</p>
      </template>
      <template v-slot:cell(Description)="data" >
        <p v-if="data.item.node.tags != null">{{ data.item.node.tags }}</p>
        <p v-else>Adicione</p>
      </template>
    </b-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import TabList from '@/components/TabList.vue'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
export default {
  name: 'home',
  // components: {
  //   TabList
  // },
  data: function () {
    return {
      url: 'https://api.github.com/graphql',
      list: [],
      fields: ['Repository', 'Description', 'Language', 'Tags', 'Tools'],
      userLogin: '',
      token: ''
    }
  },
  methods: {
    loadRespositories () {
      let vm = this
      let queryGetRepo = `{
                            user(login: "` + vm.userLogin + `") {
                              id
                              starredRepositories(first: 10) {
                                edges {
                                  node {
                                    id
                                    description
                                    languages(first: 10) {
                                      edges {
                                        node {
                                          name
                                        }
                                      }
                                    }
                                    name
                                    projectsUrl
                                  }
                                }
                              }
                            }
                          }`
      console.log(vm.url)
      console.log(queryGetRepo)
      console.log(vm.token)
      axios.post(vm.url, { query: queryGetRepo }, { headers: { Authorization: 'Bearer ' + vm.token } })
        .then((response) => {
          console.log('After')
          console.log(response.data.data.user)
          vm.list = response.data.data.user.starredRepositories.edges
          console.log(vm.list)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    let vm = this
    console.log('aqui')
    console.log(localStorage.userLogin)
    console.log(localStorage.token)
    vm.userLogin = localStorage.userLogin
    vm.token = localStorage.token

    vm.loadRespositories()
  }
}
</script>
