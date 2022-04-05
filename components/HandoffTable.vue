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
                        loading-text="Loading... Please wait"
                        sort-by="id"
                        :sort-desc="true"
                        show-expand
                        class="elevation-1"
                    >
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-row class="pt-4">
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
                                                    <v-btn color="#000000" dark class="mt-4" @click="show()">
                                                        <v-icon size="32">
                                                            mdi-new-box
                                                        </v-icon>
                                                    </v-btn>
                                                    <b-modal id="modal-center" size="lg" centered v-model="dialog" ok-title="Create" @hidden="updateFlag=false">
                                                        <v-row v-if="updateFlag">
                                                            <v-col class="d-flex pb-0" sm="3">
                                                                <!-- <v-select :items="status" :label="editedItem.status" v-model="editedItem.status"></v-select> -->
                                                                <v-select :items="status" :label="Status" v-model="editedItem.status"></v-select>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="mb-1">
                                                            <v-col cols="10" class="pt-0">
                                                                <v-text-field label="Subject" autofocus v-model="editedItem.subject"></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="mb-1">
                                                            <v-col>
                                                                <v-textarea
                                                                    outlined
                                                                    v-model="editedItem.body"
                                                                    height="240"
                                                                >
                                                                </v-textarea>
                                                            </v-col>
                                                        </v-row>
                                                        <template #modal-footer="{ cancel }" v-if="updateFlag">
                                                            <b-button @click="cancel()">
                                                                Cancel
                                                            </b-button>
                                                            <b-button @click="updateRecord()" variant="danger">
                                                                Update
                                                            </b-button>
                                                        </template>
                                                        <template #modal-footer="{ cancel }" v-else>
                                                            <b-button @click="cancel()">
                                                                Cancel
                                                            </b-button>
                                                            <b-button @click="create()" variant="primary">
                                                                Create
                                                            </b-button>
                                                        </template>
                                                    </b-modal>
                                                </div>
                                            </template>
                                        </v-col>
                                    </v-col>
                                </v-row>
                            </v-toolbar>
                        </template>
                        <template v-slot:expanded-item="{ item }">
                            <td :colspan="4" style="white-space:pre-wrap;">{{ item.body }}</td>
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
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <b-modal id="modal-center"
                                centered
                                v-model="updateDialog"
                                ok-title="Update"
                                @hidden="updateFlag=false"
                            >
                            </b-modal>
                            <v-icon small @click="deleteItemConfirm(item)">
                                mdi-delete
                            </v-icon>
                            <b-modal id="modal-center" centered v-model="deleteDialog" ok-title="Delete">
                                <p class="my-4">Are you sure you want to delete this record?</p>
                                    <template #modal-footer="{ cancel }">
                                        <b-button @click="cancel()">
                                            Cancel
                                        </b-button>
                                        <b-button @click="deleteRecord(item)" variant="danger">
                                            OK
                                        </b-button>
                                    </template>
                            </b-modal>
                        </template>
                    </v-data-table>
                </template>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import { Doughnut, mixins } from "vue-chartjs"
    const { reactiveProp } = mixins;
    const axios = require('axios');

    export default {
        props: ['gid', 'uname'],
        mixins: [reactiveProp],

        data: () => ({
            count: '',
            headers: [
                { text: 'ID', align: 'center',value: 'id'},
                { text: 'Subject', value: 'subject', width: 450},
                { text: 'Status', value: 'status'},
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
            deleteDialog: false,
            updateDialog: false,
            updateFlag: false,
            editedIndex: '',
            editedItem: {
                group_id: '',
                status: '',
                subject: '',
                body: '',
            },
            defaultItem: {
                group_id: '',
                status: '',
                subject: '',
                body: '',
            },
            deleteItem: {
                group_id: '',
                id: '',
            },
        }),

        watch: {
            dialog (val) {
                val || this.close()
            },
            deleteDialog (val) {
                val || this.closeDelete()
            },
        },

        created () {
            this.setProp();
        },

        methods: {
            getRecord () {
                this.$axios.$get('/getRecord')
                .then((records) => {
                    this.items = records;
                    this.aggregate();
                })
                .catch((err) => {
                    console.log(err);
                })
            },

            aggregate () {
                let openCount = 0;
                let pendingCount = 0;
                let closeCount = 0;

                this.items.forEach(obj => {
                    if (obj.status === 'Open') {
                        openCount += 1;
                    } else if (obj.status === 'Pending') {
                        pendingCount += 1;
                    } else {
                        closeCount += 1;
                    }
                });

                const datasets = [
                    {
                        data: [openCount, pendingCount, closeCount],
                        backgroundColor: ['#F44336', '#FF9800', '#9E9E9E']
                    }
                ];

                this.$emit('receiveChartData', datasets);
                return;
            },

            updateRecord () {
                this.$axios.$post('/update', {editedItem: this.editedItem})
                .then (() => {
                    location.reload();
                    this.dialog = false;
                })
                .catch ((err) => {
                    console.log(err);
                })
            },

            deleteItemConfirm (item) {
                this.editedIndex = this.items.indexOf(item)
                this.deleteItem = Object.assign({}, item)
                this.deletedStatus = this.deleteItem.status;
                this.deleteDialog = true
            },

            deleteRecord () {
                this.$axios.$post('/delete', {deleteItem: this.deleteItem})
                .then(() => {
                    location.reload();
                    this.closeDelete();
                })
                .catch((err) => {
                    console.log(err);
                })
            },

            close () {
                this.dialog = false,
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                })
            },

            closeDelete () {
                this.deleteDialog = false
                this.editedItem = Object.assign({}, this.defaultItem)
            },

            getColor (status) {
                if (status === 'Open') return '#F44336'
                else if (status === 'Pending')  return '#FF9800'
                else return '#9E9E9E'
            },

            //Can't assign prop: ['gid'] to this.gid in data(). For that reason, this function was created.
            setProp () {
                this.editedItem.group_id = this.gid;
                this.deleteItem.group_id = this.gid;
            },

            show () {
                let date = new Date();
                let datetime = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
                let uname = this.uname;
                let prefix = datetime + ' ' + uname + "\n";
                this.editedItem.body = prefix;
                this.dialog = true;
            },

            create () {
                this.editedItem.group_id = this.gid;
                this.editedItem.status = '';
                this.$axios.$post('create', {editedItem: this.editedItem})
                .then(() => {
                    location.reload();
                    this.dialog = false;
                })
                .catch((err) => {
                    console.log(err);
                })
            },

            editItem (item) {
                this.editedIndex = this.items.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.updateFlag = true;
                this.dialog = true;
            },
        },

        mounted () {
            this.getRecord();
        }
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