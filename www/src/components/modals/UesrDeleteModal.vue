<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="690">
            <v-card>
                <v-card-title class="text-h5">
                    Delete User
                </v-card-title>
                <v-card-text>
                    Are you you want to delete this user {{ userSeletedData.name }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" class="mr-4 createuser-btn" @click="handleAddUser">
                        Delete
                    </v-btn>
                    <v-btn color="green darken-1" class="createuser-btn-cancle" text @click.stop="show = false">
                        Cancle
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import axios from "axios";
export default {
    name: "UesrDeleteModal",
    props: {
        visible: {
            type: Boolean
        },
        userSeletedData: {
            default: () => ({}),
            type: Object
        }
    },
    methods: {
        handleAddUser() {
            let data = {
                "id": this.userSeletedData._id
            };
            axios.post(`http://localhost:3000/users-api/deleteUsers`, data)
                .then(res => {
                    if (res?.status === 200) {
                        this.$emit('close');
                        this.$emit('callAddUserOnclick');
                    }
                })
                .catch(err => alert(err?.response?.data?.msg))
        }
    },
    computed: {
        show: {
            get() {
                return this.visible;
            },
            set(value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    }
}
</script>


<style>
.createuser-btn {
    background-color: rgb(247, 46, 46) !important;
}

.createuser-btn-cancle {
    background-color: rgb(230, 230, 104) !important;
}
</style>