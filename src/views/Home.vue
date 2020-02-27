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
      url: 'http://localhost:3000/api/v1/tags?userLogin=',
      listar: localStorage.listar
    }
  }
  //     list: [],
  //     filteredList: [],
  //     fields: [
  //       { key: 'Repository', sortable: true },
  //       { key: 'Description', sortable: true },
  //       { key: 'Language', sortable: true },
  //       { key: 'Tags', sortable: true },
  //       { key: 'Tools', sortable: true }
  //     ],
  //     searchText: '',
  //     userLogin: '',
  //     token: '',
  //     modalEdit: {
  //       id: 'editModal',
  //       title: 'Edit tags',
  //       label: 'Edit tags for ',
  //       item: {}
  //     },
  //     itemEdit: {},
  //     showForm: false
  //   }
  // },
  // methods: {
  //   loadRespositories () {
  //     let vm = this
  //     axios.get(vm.url + vm.userLogin)
  //       .then((response) => {
  //         vm.list = response.data.user.starredRepositories.edges
  //         vm.filteredList = response.data.user.starredRepositories.edges
  //       })
  //       .catch((error) => {
  //         alert('Houve um erro ao buscar os dados na api')
  //         console.log(error)
  //       })
  //   },
  //   editTags (data, button) {
  //     console.log(data.node.tags)
  //     let tempItem = ''
  //     for (let tag in data.node.tags) {
  //       tempItem = tempItem + data.node.tags[tag].tag + '; '
  //     }
  //     this.modalEdit.item = data.node
  //     this.itemEdit = tempItem
  //     this.showForm = true
  //     this.$root.$emit('bv::show::modal', this.modalEdit.id, button)
  //   },
  //   reset (data, button) {
  //     this.itemEdit = {}
  //     this.$root.$emit('bv::hide::modal', this.modalEdit.id, button)
  //   },
  //   saveTags (data, button) {
  //     let vm = this
  //     vm.itemEdit = vm.itemEdit.replace(' ', '')
  //     let result = vm.itemEdit.split(';')
  //     let listTags = []
  //     for (let i in result) {
  //       let tag = {
  //         'tag': result[i]
  //       }
  //       listTags.push(tag)
  //     }

  //     vm.modalEdit.item.tags = listTags
  //     axios.patch(vm.url + vm.userLogin, vm.modalEdit.item)
  //       .then((response) => {
  //         alert('salvo')
  //       })
  //       .catch((error) => {
  //         alert('Houve um erro ao buscar os dados na api')
  //         console.log(error)
  //       })
  //     vm.$root.$emit('bv::hide::modal', this.modalEdit.id, button)
  //   },
  //   filterTable () {
  //     let vm = this
  //     if (vm.searchText !== '') {
  //       vm.filteredList = []
  //       vm.list.forEach(item => {
  //         item.node.tags.forEach(itemTag => {
  //           if (itemTag.tag.toLowerCase().includes(this.searchText.toLowerCase())) {
  //             vm.filteredList.push(item)
  //           }
  //         })
  //       })
  //     } else {
  //       vm.filteredList = vm.list
  //     }
  //   }
  // },
  // mounted () {
  //   let vm = this
  //   vm.userLogin = localStorage.userLogin
  //   vm.token = localStorage.token

  //   vm.loadRespositories()
  // }
}
</script>
