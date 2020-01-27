<template>
  <div class="home">
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
      list: [],
      userLogin: '',
      token: ''
    }
  },
  methods: {
    loadRespositories () {
      let vm = this
      let queryGet = `{
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
      axios.post(vm.url, { query: queryGet }, { headers: { Authorization: 'Bearer ' + vm.token } })
        .then((response) => {
          console.log('After')
          console.log(response.data.data.user)
          vm.list = response.data.data.user.staredRepositories
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
