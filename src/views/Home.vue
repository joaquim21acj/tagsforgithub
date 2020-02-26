<template>
  <div class="home">
    <div style="width: 90%; text-align-last: center; margin: 0 auto;">
      <div style="width: 20%;">
        <b-form-input v-model="searchText" placeholder="Search by tag"></b-form-input>
      </div>
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
        <template v-slot:cell(Tags)="data" >
          <p v-for="(item) in  data.item.node.tags" :key="item.tag">{{ item.tag }}</p>
          <!-- <p v-if="data.item.node.tags != null">{{ data.item.node.tags }}</p>
          <p v-else>Adicione</p> -->
        </template>
        <template v-slot:cell(Tools)="data">
          <button v-on:click="editTags(data.item, $event.target)">Edit</button>
        </template>
      </b-table>
    </div>
    <b-modal :id="modalEdit.id" :title="modalEdit.label + modalEdit.item.name" :hide-footer="true">
      <b-form @submit="saveTags" @reset="reset">
        <b-form-group
          id="repoName"
          label-for="inputTags"
          description="Separate the tags by ',' : front, back"
        >
          <b-form-input
            id="inputTags"
            v-model="itemEdit"
            placeholder="tags"
          ></b-form-input>
        </b-form-group>
        <div style="width: 100%; text-align-last: center;">
          <b-button type="submit" variant="outline-success" style="margin: 5px;">Save</b-button>
          <b-button type="reset" variant="outline-danger">Cancel</b-button>
        </div>
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
      url: 'http://localhost:3000/api/v1/tags?userLogin=',
      list: [],
      fields: [
        { key: 'Repository', sortable: true },
        { key: 'Description', sortable: true },
        { key: 'Language', sortable: true },
        { key: 'Tags', sortable: true },
        { key: 'Tools', sortable: true }
      ],
      searchText: '',
      userLogin: '',
      token: '',
      modalEdit: {
        id: 'editModal',
        title: 'Edit tags',
        label: 'Edit tags for ',
        item: {}
      },
      itemEdit: {},
      showForm: false
    }
  },
  methods: {
    loadRespositories () {
      let vm = this
      axios.get(vm.url + vm.userLogin)
        .then((response) => {
          vm.list = response.data.user.starredRepositories.edges
        })
        .catch((error) => {
          alert('Houve um erro ao buscar os dados na api')
          console.log(error)
        })
    },
    editTags (data, button) {
      console.log(data.node.tags)
      let tempItem = ''
      for (let tag in data.node.tags) {
        tempItem = tempItem + data.node.tags[tag].tag + '; '
      }
      this.modalEdit.item = data.node
      this.itemEdit = tempItem
      this.showForm = true
      this.$root.$emit('bv::show::modal', this.modalEdit.id, button)
    },
    reset (data, button) {
      this.itemEdit = {}
      this.$root.$emit('bv::hide::modal', this.modalEdit.id, button)
    },
    saveTags (data, button) {
      let vm = this
      vm.itemEdit = vm.itemEdit.replace(' ', '')
      let result = vm.itemEdit.split(';')
      let listTags = []
      for (let i in result) {
        let tag = {
          'tag': result[i]
        }
        listTags.push(tag)
      }

      vm.modalEdit.item.tags = listTags
      axios.patch(vm.url + vm.userLogin, vm.modalEdit.item)
        .then((response) => {
          alert('salvo')
        })
        .catch((error) => {
          alert('Houve um erro ao buscar os dados na api')
          console.log(error)
        })
      vm.$root.$emit('bv::hide::modal', this.modalEdit.id, button)
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
