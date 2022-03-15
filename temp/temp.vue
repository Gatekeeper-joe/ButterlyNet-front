複数列でfilterをかけるコード
<template>
    <v-data-table :headers="headers" :items="desserts" item-key="name" class="elevation-1 pa-6">
        <template v-slot:top>

        <v-container fluid>
            <v-row>

            <v-col cols="4">
                <v-row class="pa-6">
                <!-- Filter for Desert -->
                <v-text-field
                    v-model="dessertFilterValue"
                    type="text"
                    label="Desert Name">
                </v-text-field>
                </v-row>
            </v-col>

            <v-col cols="4">
                <v-row class="pa-6">
                <!-- Filter for Calories -->
                <v-select
                    :items="caloriesList"
                    v-model="caloriesFilterValue"
                    label="Calories"
                ></v-select>

                </v-row>
            </v-col>

            <v-col cols="4">
                <v-row class="pa-6">
                <!-- Filter for Fat-->
                <v-text-field
                    v-model="FatFilterValue"
                    type="text"
                    label="Fat">
                </v-text-field>
                </v-row>
            </v-col>

            </v-row>
        </v-container>

        </template>
    </v-data-table>
</template>

<script>
  // Table info.
  import tableData from './sampleDataTable';
  export default {
    name: 'Table',
    data() {
      return {
        // We need some values for our select.
        caloriesList: [
          {text: "All", value: null},
          {text: "Only 237", value: 237},
          {text: "Only 305", value: 305},
        ],
        // Filter models.
        dessertFilterValue: '',
        FatFilterValue: '',
        caloriesFilterValue: null,
        // Table data.
        desserts: tableData.data,
      }
    },
    computed: {
      headers() {
        return [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name',
            filter: this.nameFilter,
          },
          {
            text: 'Calories',
            value: 'calories',
            filter: this.caloriesFilter,
          },
          {
            text: 'Fat (g)',
            value: 'fat',
            filter: this.FatFilter,
          },
          {text: 'Carbs (g)', value: 'carbs'},
          {text: 'Protein (g)', value: 'protein'},
          {text: 'Iron (%)', value: 'iron'},
        ]
      },
    },
    methods: {
      nameFilter(value) {
        // this.dessertFilterValue がなければフィルタリングしない
        if (!this.dessertFilterValue) {
          return true
        }
        return value.toLowerCase().includes(this.dessertFilterValue.toLowerCase());
      },
      caloriesFilter(value) {
        if (!this.caloriesFilterValue) {
          return true
        }
        return value === this.caloriesFilterValue
      },
      FatFilter(value) {
        if(!this.FatFilterValue) {
          return true
        }
        return value === parseInt(this.FatFilterValue)
      }
    }
  }
</script>