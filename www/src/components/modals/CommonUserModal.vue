<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="690">
            <v-card>
                <v-card-title class="text-h5">
                    Add User
                </v-card-title>
                <v-form v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="6" md="4">
                                <v-text-field v-model="userEnteredDeatils.name" :rules="nameRules" type="text"
                                    label="First name" required></v-text-field>
                            </v-col>
                            <v-col cols="6" md="4">
                                <v-text-field v-model="userEnteredDeatils.email" :rules="emailRules" type="email"
                                    label="E-mail" required></v-text-field>
                            </v-col>
                            <v-col cols="6" md="4">
                                <v-text-field v-model="userEnteredDeatils.company" type="text" label="Company"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="6" md="4">
                                <v-text-field v-model="userEnteredDeatils.age" min="0" type="number" label="Age"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="6" md="4">
                                <v-text-field v-model="userEnteredDeatils.salary" min="0" type="number" label="Salary"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="6" md="4">
                                <v-text-field v-model="userEnteredDeatils.workExperence" min="0" type="number"
                                    label="Work Experence" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" color="success" class="mr-4 createuser-btn" @click="handleAddUser">
                        Add User
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
const userData = { name: '', company: '', email: '', age: '', salary: '', workExperence: '', };
export default {
    name: "CommonUserModal",
    props: {
        visible: {
            type: Boolean
        },
        isItEditUsers: {
            type: Boolean
        },
        userSeletedData: {
            default: () => ({}),
            type: Object
        }
    },
    data() {
        return {
            valid: false,
            userEnteredDeatils: { ...userData },
            nameRules: [
                v => !!v || 'Name is required',
                // v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ]
        }
    },
    methods: {
        handleAddUser() {
            let endpoint = this.isItEditUsers ? "editUsers" : "saveUsers";
            let data = {
                "id": this.isItEditUsers ? this.userEnteredDeatils._id : "",
                "name": this.userEnteredDeatils.name,
                "email": this.userEnteredDeatils.email,
                "age": this.userEnteredDeatils.age,
                "company": this.userEnteredDeatils.company,
                "salary": this.userEnteredDeatils.salary,
                "workExperence": this.userEnteredDeatils.workExperence
            };
            axios.post(`http://localhost:3000/users-api/${endpoint}`, data)
                .then(res => {
                    if (res?.status === 200) {
                        this.userEnteredDeatils = { ...userData };
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
                if (this.isItEditUsers) {
                    this.userEnteredDeatils = { ...this.userSeletedData };
                }
                return this.visible;
            },
            set(value) {
                if (!value) {
                    this.userEnteredDeatils = { ...userData };
                    this.$emit('close')
                }
            }
        }
    }
}
</script>


<style>
.createuser-btn {
    background-color: rgb(49, 225, 90) !important;
}

.createuser-btn-cancle {
    background-color: rgb(230, 230, 104) !important;
}
</style>