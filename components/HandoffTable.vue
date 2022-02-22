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
                                                <div>
                                                    <v-btn color="#000000" dark class="mb-2" @click="show()">
                                                        <v-icon size="32" class="pr-5">
                                                            mdi-new-box
                                                        </v-icon>
                                                    </v-btn>
                                                    <b-modal id="modal-center" size="lg" centered v-model="dialog">
                                                        <!-- 引継ぎを作成する段階ではステータスをいじれる必要がないのでコメントアウト。内容変更する際に以下のコードは使いそうだから残しておく。 -->
                                                        <!-- <v-row>
                                                            <v-col class="d-flex pb-0" sm="3">
                                                                <v-select :items="status" label="Open"></v-select>
                                                            </v-col>
                                                        </v-row> -->
                                                        <v-row class="mb-1">
                                                            <v-col cols="10" class="pt-0">
                                                                <v-text-field label="Subject" autofocus v-model="newItem.subject"></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="mb-1">
                                                            <v-col>
                                                                <v-textarea
                                                                    outlined
                                                                    label="Please enter the body text."
                                                                    v-model="newItem.body"
                                                                    height="240"
                                                                >
                                                                </v-textarea>
                                                            </v-col>
                                                        </v-row>
                                                    </b-modal>
                                                </div>
                                            </template>
                                        </v-col>
                                    </v-col>
                                </v-row>
                            </v-toolbar>
                        </template>
                        <template v-slot:expanded-item="{ item }">
                            <td :colspan="4">
                                {{ item.body }}
                            </td>
                        </template>
                        <template v-slot:[`item.subject`]="{ item }">
                            <v-edit-dialog
                                :return-value.sync="item.subject"
                                >
                                {{ item.subject }}
                                <template v-slot:input>
                                    <v-text-field
                                    v-model="item.subject"
                                    @change="updateRecord(item)"
                                    :rules="[max25chars]"
                                    label="Edit"
                                    single-line
                                    counter
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip
                                :color="getColor(item.status)"
                                dark
                            >
                                {{ item.status }}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <span>引継ぎはありません</span>
                        </template>
                    </v-data-table>
                </template>
            </v-row>
        </v-container>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    props: ['gid', 'uname'],

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
        expanded: [],
        status: ['Open', 'Pending', 'Close'],

        search: '',

        max25chars: v => v.length <= 25 || 'Input too long!',

        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        newItem: {
            group_id: '',
            subject: '',
            body: '',
            status: '',
        },
        obj: {
            gid: '',
            id: '',
            subject: '',
            status: '',
        },
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
        this.setProp();
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

        updateRecord (item) {
            this.obj.id = item.id;
            this.obj.subject = item.subject;
            this.obj.status = item.status;
            this.$axios.$post('/save', {obj: this.obj})
            .then ((records) => {
                this.items = records;
            })
            .catch ((err) => {
                console.log(err);
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
        },

        getColor (status) {
            if (status === 'Open') return '#F44336'
            else if (status === 'Pending')  return '#FF9800'
            else return '#9E9E9E'
        },

        //Can't assign props: ['gid'] to this.gid in data(). For that reason, this function was created.
        setProp () {
            this.obj.gid = this.gid;
            this.newItem.group_id = this.gid;
        },

        show () {
            this.dialog = true;
            let date = new Date();
            let datetime = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
            let uname = this.uname;
            let prefix = datetime + ' ' + uname;
            this.newItem.body = prefix;
        }
    },

    // mounted() {
    //     For enabling autofocus.
    //     this.$nextTick(() => this.$refs.inputSubject.focus();
    // }
}

</script>

<style>
.add-btn {
    margin-right: 20px;
}

.col-6 {
    padding: 0;
}

.v-messages__message {
    color: red;
}

</style>