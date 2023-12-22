<template>
  <span>
    <v-container>
      <v-row no-gutters>
        <v-col cols="6" sm="6" md="6">
          <v-card class="pa-2" flat tile>
            <h1 class=" d-flex align-start mb-6">Users Data Base</h1>
          </v-card>
        </v-col>
        <v-col cols="6" md="6">
          <v-card class="pa-2" flat tile>
            <v-btn color="primary" class="adduser-btn" v-on:click="handleOnEditClick('add')">Add User</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Company</th>
            <th class="text-left">Age</th>
            <th class="text-left">Created Date</th>
            <th class="text-left">Salary</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in usersData" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.company }}</td>
            <td>{{ item.age }}</td>
            <td>{{ new Date(item.createdDate).toLocaleDateString() }}</td>
            <td>{{ item.salary }}</td>
            <td>
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="edit-icon"
                v-on:click="handleOnEditClick('edit', item)" />
              <font-awesome-icon icon="fa-solid fa-trash" class="delete-icon"
                v-on:click="handleOnDeleteClick('edit', item)" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <CommonUserModal :visible="openModal" @close="handleOnEditClick('close')" @callAddUserOnclick="addUserOnclick"
      :userSeletedData="userSeletedData" :isItEditUsers="isItEditUsers" />
    <UesrDeleteModal :visible="openDeleteModal" @close="handleOnDeleteClick('close')" @callAddUserOnclick="addUserOnclick"
      :userSeletedData="userSeletedData" />
  </span>
</template>

<script>
import axios from "axios";
import CommonUserModal from "./modals/CommonUserModal.vue";
import UesrDeleteModal from "./modals/UesrDeleteModal.vue";

export default {
  name: "UserListLanding",
  components: { CommonUserModal, UesrDeleteModal },
  data() {
    return {
      usersData: {},
      openModal: false,
      openDeleteModal: false,
      isItEditUsers: false,
      userSeletedData: {}
    }
  },
  methods: {
    addUserOnclick() {
      axios.get("http://localhost:3000/users-api/getAllUsers")
        .then(res => this.usersData = res?.data)
        .catch(err => console.log(err))
    },
    handleOnDeleteClick(fromWHere, val) {
      if (fromWHere === "close") {
        this.userSeletedData = {};
        this.openDeleteModal = false
      } else {
        this.userSeletedData = { ...val };
        this.openDeleteModal = true
      }
    },
    handleOnEditClick(fromWHere, val) {
      if (fromWHere === 'add') {
        this.isItEditUsers = false;
        this.userSeletedData = {};
        this.openModal = true;
      } else if (fromWHere === "close") {
        this.isItEditUsers = false;
        this.userSeletedData = {};
        this.openModal = false;
      } else {
        this.isItEditUsers = true;
        this.userSeletedData = { ...val };
        this.openModal = true;
      }
    }
  },
  mounted() {
    this.addUserOnclick();
  }

}
</script>

<style>
.adduser-btn {
  background-color: rgb(47, 47, 241) !important;
}

.edit-icon {
  color: blue;
  padding: 0px 5px;
}

.delete-icon {
  color: red;
  padding: 0px 5px;
}
</style>