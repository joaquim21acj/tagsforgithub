<template>
  <div class="Login">
    <!-- <h1>{{ msg }}</h1> -->
    <label for="basic-url">Please tipe your username from github</label>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon3">https://github.com/</span>
      </div>
      <input type="text" v-model="userLogin" class="form-control" aria-label="Username" placeholder="Username" id="user" aria-describedby="basic-addon3" />
    </div>
      <button type="button" class="btn btn-info" v-on:click="validateUserlogin">Get repositories</button>

  </div>
</template>

<script>
import axios from 'axios'
import gql from 'graphql.macro'
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data: function () {
    return {
      url: 'https://api.github.com/graphql',
      Authorization: 'bearer 2169cdd161b5f3a50bd495c98426b2b088ded55d'
    }
  },
  methods: {
    validateUserlogin () {
      let vm = this
      if (vm.userLogin === null) {
        alert('Preencha o nome de usuário')
      }
    },
    loadRespositories () {
      let vm = this
      let header = vm.Authorization
      let query = gql`{
                            user(login: "joaquim21acj") {
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
      axios.post(vm.url, query, header)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
