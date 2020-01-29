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
      <!-- <template v-slot:cell()="data" >
        <p v-if="data.item.node.tags != null">{{ data.item.node.tags }}</p>
        <p v-else>Adicione</p>
      </template> -->
      <template v-slot:cell(Tools)="data">
        <button v-on:click="editTags(data.item, $event.target)">Edit</button>
      </template>
    </b-table>

    <b-modal :id="modalEdit.id" :title="modalEdit.title" ok-only @hide="resetInfoModal">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="repoName"
          label="Edit tags for " + modalEdit.item.name
          label-for="inputTags"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="inputTags"
            v-model="modalEdit.item.tags"
            placeholder="tags"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
            <b-form-checkbox value="me">Check me out</b-form-checkbox>
            <b-form-checkbox value="that">Check that out</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
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
      fields: [
        { key: 'Repository', sortable: true },
        { key: 'Description', sortable: true },
        { key: 'Language', sortable: true },
        { key: 'Tags', sortable: true },
        { key: 'Tools', sortable: true }
      ],
      userLogin: '',
      token: '',
      modalEdit: {
        id: 'editModal',
        title: 'Edit tags',
        item: {}
      }
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

      axios.post(vm.url, { query: queryGetRepo }, { headers: { Authorization: 'Bearer ' + vm.token } })
        .then((response) => {
          vm.list = response.data.data.user.starredRepositories.edges
        })
        .catch((error) => {
          alert('Houve um erro ao buscar os dados no git')
          console.log(error)
        })
    },
    editTags (data, button) {
      console.log(data.node)
      this.modalEdit.item = data.node
      this.$root.$emit('bv::show::modal', this.modalEdit.id, button)
    }
  },
  mounted () {
    let vm = this
    vm.userLogin = localStorage.userLogin
    vm.token = localStorage.token

    vm.loadRespositories()
  }
}
</script>
