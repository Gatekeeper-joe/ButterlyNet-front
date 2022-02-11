<template>
    <div class="col-md-12">
        <v-container>
            <v-row>
                <template>
                    <v-divider class="mb-5"></v-divider>
                    <v-data-table :headers="headers" :items="items" sort-by="id" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-row>
                                    <v-col cols="1">
                                        <v-row class="pa-6">
                                        <!-- Filter for id -->
                                            <v-text-field
                                                v-model="id"
                                                type="text"
                                                label="ID">
                                            </v-text-field>
                                        </v-row>
                                    </v-col>

                                    <v-col cols="6">
                                        <v-row class="pa-6">
                                            <!-- Filter for subject -->
                                            <v-text-field
                                                v-model="editedItem.subject"
                                                type="text"
                                                label="Subject and Body">
                                            </v-text-field>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="5" class="text-center">
                                        <v-dialog v-model="dialog" max-width="500px">
                                            <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="#795548" dark class="mb-2" v-bind="attrs" v-on="on">
                                                        <v-icon size="32" class="pr-5">
                                                            mdi-new-box
                                                        </v-icon>
                                                    </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>
                                                    <span class="text-h5">{{ formTitle }}</span>
                                                </v-card-title>

                                                <v-card-text>
                                                    <v-container>
                                                        <v-row>
                                                            <v-col cols="12" sm="6" md="4">
                                                                <v-text-field v-model="editedItem.responder" label="Responder"></v-text-field>
                                                            </v-col>
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
                                </v-row>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
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
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'ID', align: 'start',value: 'id'},
            { text: 'Subject', value: 'subject', width: 500 },
            { text: 'Responder', value: 'responder' },
            { text: 'Updater', value: 'Updater' },
            { text: 'Create time', value: 'createTime' },
            { text: 'Update time', value: 'updateTime' },
            { text: '', value: 'actions', sortable: false },
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
            responder: 0,
            subject: '',
            body: '',
        },
        defaultItem: {
            responder: 0,
            subject: '',
            body: '',
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
    this.initialize()
    },

    methods: {
    initialize () {
        this.handoffItems = [
            {
                subject: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
            },
        ]
    },

    editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
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

    save () {
        if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
        this.items.push(this.editedItem)
        }
        this.close()
    },
    },
}
</script>

<style>
.add-btn {
    margin-right: 20px;
}
</style>