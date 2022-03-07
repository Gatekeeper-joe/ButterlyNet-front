<template>
    <div class="col-md-6">
        <div class="host-table-content">
            <v-container>
                <v-row>
                    <template>
                        <v-data-table
                            :headers="headers"
                            :items="items"
                            :items-per-page="5"
                            :disable-sort=true
                            sort-by="count"
                            class="elevation-1"
                            no-data-text=""
                        >
                            <template v-slot:[`item.host`] = "{ item }">
                                <a :href="item.url" target="_blank">{{ item.host }}</a>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon small @click="deleteItem(item)">
                                    mdi-delete
                                </v-icon>
                            </template>
                            <template v-slot:no-data>
                                <span>No data available</span>
                            </template>
                        </v-data-table>
                    </template>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user_id: this.$auth.user.id,
                pageData: '',
                count: '',
                index: '',
                items: [],
                editedItem: '',
                editedIndex: '',

                headers: [
                    {text: '', value: 'count'},
                    {text: 'Updated page', value: 'host'},
                    {text: 'Updated time', value: 'last_updated_at'},
                    {text: '', value: 'actions', sortable: false},
                ],

                updateTarget: {
                    uid: this.$auth.user.id,
                    host: '',
                },
            }
        },

        methods: {
            getUpdated () {
                this.$axios.$post('/getUpdated', { uid: this.user_id })
                .then((pageData) => {
                    this.pageData = pageData;
                    this.count = this.pageData.length;
                    this.pageData.forEach((v, i) => {
                        i += 1;
                        v['count'] = i;
                        this.items.push(v);
                    })
                })
                .catch ((err) => {
                    this.result = err;
                })
            },

            deleteItem (item) {
                this.index = this.items.indexOf(item);
                this.items.splice(this.index, 1);
                this.count = this.items.length;
                this.items.forEach((v, i) => {
                    i += 1;
                    v['count'] = i;
                });

                this.updateTarget.host = item.host;

                this.$axios.$post('/updateFlag', { targetData: this.updateTarget })
                .then((res) => {
                    return;
                })
                .catch((err) => {
                    errorMessage = 'データの削除に失敗しました。';
                    alert(errorMessage);
                })
            },
        },

        created () {
            this.getUpdated()
        },
    }
</script>

