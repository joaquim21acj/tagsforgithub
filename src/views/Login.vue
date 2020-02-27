<template>
  <div class="Login">
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

export default {
  name: 'Login',
  data: function () {
    return {
      url: 'https://api.github.com/graphql',
      token: 'a232abbb5b93c77a39b3aafd4803660fdb1f2724',
      userLogin: ''
    }
  },
  methods: {
    validateUserlogin () {
      // Função que valida se o usuário tem cadastro no git
      let vm = this
      if ((vm.userLogin === null) || (vm.userLogin === '')) {
        alert('Preencha o nome de usuário')
        return true
      } else {
        let vm = this
        let queryGet = `{
                        user(login: "` + vm.userLogin + `") {
                          id
                        }
                      }`
        axios.post(vm.url, { query: queryGet }, { headers: { Authorization: 'Bearer ' + vm.token } })
          .then((response) => {
            if ((response.data.data.user.id === null) || (response.data.data.user.id === '')) {
              // Mensagem de erro caso usuário não possua cadastro no git
              alert('O usuário digitado não possui repositório git')
              return
            } else {
              // Redirecionamento quando o usuário é validado
              localStorage.userLogin = vm.userLogin
              localStorage.listar = true
              router.push({ name: 'home' })
            }
            return response.data.data.user.id
          })
          .catch((error) => {
            console.log(error)
            alert('Ocorreu um erro ao tentar buscar')
          })
      }
    }
  },
  mounted () {
    let vm = this
    // Adição do token no localStorage
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
