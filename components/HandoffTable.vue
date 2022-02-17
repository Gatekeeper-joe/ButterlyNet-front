<template>
    <div class="col-md-12">
        <v-container>
            <v-row>
                <template>
                    <v-divider class="mb-5"></v-divider>
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        :search="search"
                        :expanded.sync="expanded"
                        loading
                        loading-text="Loading... Please wait"
                        sort-by="id"
                        show-expand
                        class="elevation-1"
                    >
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-row>
                                    <v-col cols="6">
                                        <v-row class="pa-6">
                                            <v-text-field
                                                v-model="search"
                                                append-icon="mdi-magnify"
                                                type="text"
                                                label="Search">
                                            </v-text-field>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="6" class="text-center">
                                        <v-col cols="6">
                                            <template>
                                                    <v-btn color="#795548" dark class="mb-2" @click="save">
                                                        <v-icon size="32" class="pr-5">
                                                            mdi-new-box
                                                        </v-icon>
                                                    </v-btn>
                                            </template>
                                            <v-dialog v-model="dialog" max-width="500px">
                                                <v-card>
                                                    <v-card-title>
                                                        <span class="text-h5">{{ formTitle }}</span>
                                                    </v-card-title>

                                                    <v-card-text>
                                                        <v-container>
                                                            <v-row>
                                                                <v-col cols="12" sm="6" md="4">
                                                                    <v-text-field v-model="editedItem.subject" label="Subject"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" sm="6" md="4">
                                                                    <v-text-field v-model="editedItem.body"></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-card-text>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="blue darken-1" text @click="save">
                                                            Save
                                                        </v-btn>
                                                        <v-btn color="blue darken-1" text @click="close">
                                                            Cancel
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                            <v-dialog v-model="dialogDelete" max-width="500px">
                                                <v-card>
                                                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                                                    <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                                    <v-spacer></v-spacer>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-col>
                                    </v-col>
                                </v-row>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:expanded-item="{ item }">
                            <td :colspan="5">
                                {{ item.body }}
                            </td>
                            <td>
                                <v-btn depressed color="error">
                                    Add
                                </v-btn>
                            </td>
                        </template>
                        <template v-slot:no-data>
                            <span>引継ぎはありません</span>
                        </template>
                    </v-data-table>
                </template>
            </v-row>
        </v-container>
        {{ records }}
    </div>
</template>

<script>
const axios = require('axios');

export default {
    records: '',
    props: ['gid'],

    data: () => ({
        headers: [
            { text: 'ID', align: 'center',value: 'id'},
            { text: 'Subject', value: 'subject', width: 450},
            { text: 'Status', value: 'status', sortable: false},
            { text: 'Created Time', value: 'created_at', filterable: false },
            { text: 'Updated Time', value: 'updated_at', filterable: false },
            { text: '', value: 'actions', sortable: false, filterable: false},
        ],
        items: [],
        dialog: false,
        dialogDelete: false,
        search: '',
        expanded: [],

        editedIndex: -1,
        editedItem: {
            subject: '',
            body: '',
        },
        defaultItem: {
            subject: '',
            body: '',
        },
        newItem: {
            group_id: '1',
            status: 'in progress',
            subject: '手順書作成',
            body: '障害対応の手順書が未完成のため、対応お願いいたします。',
        }
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Handoff' : 'Edit Handoff'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },

    created () {
        this.getRecord();
    },

methods: {
    getRecord () {
        this.$axios.$post('/getRecord', {gid: this.gid} )
        .then((records) => {
            this.items = records;
        })
        .catch((err) => {
            alert(err);
        })
    },

    deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
    },

    deleteItemConfirm () {
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
    },

    close () {
        this.dialog = false
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        })
    },

    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        })
    },

    // save () {
    //     if (this.editedIndex > -1) {
    //     Object.assign(this.items[this.editedIndex], this.editedItem)
    //     } else {
    //     this.items.push(this.editedItem)
    //     }
    //     this.close()
    // },
    save () {
        this.$axios.$post('/save', { newItem: this.newItem })
        .then((records) => {
            this.items = records;
        })
        .catch((err) => {
            alert(err);
        })
    }
    },
}
</script>

<style>
.add-btn {
    margin-right: 20px;
}
</style>