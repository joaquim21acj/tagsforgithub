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
      <button type="button" class="btn btn-info" v-on:click="validateUserlogin()">Get repositories</button>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
// import gql from 'graphql.macro'
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data: function () {
    return {
      url: 'https://api.github.com/graphql',
      Authorization: 'bearer 8359c5f807a3cf3e031d0d02197d54a27a6396d5  ',
      token: '8359c5f807a3cf3e031d0d02197d54a27a6396d5  ',
      userLogin: ''
    }
  },
  methods: {
    validateUserlogin () {
      let vm = this
      if ((vm.userLogin === null) || (vm.userLogin === '')) {
        alert('Preencha o nome de usuário')
        return true
      } else {
        let resp = vm.loadRespositories()
        if ((resp !== null) && (resp !== '')) {
          localStorage.userLogin = vm.userLogin
          router.push({ name: 'home' })
        } else {
          alert('O usuário digitado não possui repositório git')
          return false
        }
      }
    },
    loadRespositories () {
      let vm = this
      let queryGet = `{
                        user(login: "` + vm.userLogin + `") {
                          id
                        }
                      }`
      axios.post(vm.url, { query: queryGet }, { headers: { Authorization: 'Bearer ' + vm.token } })
        .then((response) => {
          return response.data.data.user.id
        })
        .catch((error) => {
          console.log(error)
          return ''
        })
    }
  },
  mounted () {
    let vm = this
    localStorage.token = vm.token
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
