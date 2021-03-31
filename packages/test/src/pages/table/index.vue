<template>
<!--  <div class="q-pa-md">-->
<!--    <q-table-->
<!--      :fullscreen="$q.fullscreen.isActive"-->
<!--      :grid="grid"-->
<!--      :rows="rows"-->
<!--      color="primary"-->
<!--      square-->
<!--      row-key="name"-->
<!--      selection="multiple"-->
<!--      v-model:selected="selected"-->
<!--      no-data-label="No data"-->
<!--      :columns="columns"-->
<!--      v-model:pagination="paginationParams"-->
<!--      hide-pagination-->
<!--      :loading="tableLoading"-->
<!--    >-->
<!--      <template v-slot:loading>-->
<!--        <q-inner-loading showing color="primary" />-->
<!--      </template>-->
<!--      <template v-slot:top>-->
<!--        Table-->
<!--        <q-space />-->
<!--        <q-btn-->
<!--          flat-->
<!--          stretch-->
<!--          @click="$q.fullscreen.toggle()"-->
<!--          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"-->
<!--          :label="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"-->
<!--        ></q-btn>-->
<!--        <q-btn flat stretch @click="grid = !grid" :icon="grid ? 'grid_off' : 'grid_on'" label="grid"></q-btn>-->
<!--      </template>-->
<!--      <template v-slot:no-data="{ icon, message, filter }">-->
<!--        <div class="full-width row flex-center text-primary q-gutter-sm">-->
<!--          <q-icon size="2em" name="sentiment_dissatisfied" />-->
<!--          <span>Well this is sad... {{ message }}</span>-->
<!--          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />-->
<!--        </div>-->
<!--      </template>-->
<!--      <template v-slot:item="props">-->
<!--        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">-->
<!--          <q-card :class="props.selected ? 'bg-grey-2' : ''">-->
<!--            <q-card-section>-->
<!--              <q-checkbox dense v-model="props.selected" :label="props.row.name" />-->
<!--            </q-card-section>-->
<!--            <q-separator />-->
<!--            <q-list dense>-->
<!--              <q-item v-for="col in props.cols.filter((col) => col.name !== 'desc')" :key="col.name">-->
<!--                <q-item-section>-->
<!--                  <q-item-label>{{ col.label }}</q-item-label>-->
<!--                </q-item-section>-->
<!--                <q-item-section side>-->
<!--                  <q-item-label caption>{{ col.value }}</q-item-label>-->
<!--                </q-item-section>-->
<!--              </q-item>-->
<!--            </q-list>-->
<!--          </q-card>-->
<!--        </div>-->
<!--      </template>-->
<!--      <template v-slot:body="props">-->
<!--        <q-tr :props="props">-->
<!--          <q-td class="text-center">-->
<!--            <q-checkbox dense v-model:model-value="props.selected" />-->
<!--          </q-td>-->
<!--          <q-td key="name" :props="props">{{ props.row.name }}</q-td>-->
<!--          <q-td key="calories" :props="props">{{ props.row.calories }}</q-td>-->
<!--          <q-td key="fat" :props="props">{{ props.row.fat }}</q-td>-->
<!--          <q-td key="carbs" :props="props">{{ props.row.carbs }}</q-td>-->
<!--          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>-->
<!--          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>-->
<!--          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>-->
<!--          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>-->
<!--          <q-td key="option" class="text-right row a-center j-end">-->
<!--            <span class="link-type">details</span>-->
<!--            <span class="m-l-5 delete-type vertical-middle relative">-->
<!--              <q-icon name="delete_forever" />delete-->
<!--              <q-popup-edit v-model:model-value="props.row.name" buttons title="Confirm?" label-set="ok" square></q-popup-edit>-->
<!--            </span>-->
<!--          </q-td>-->
<!--        </q-tr>-->
<!--      </template>-->
<!--    </q-table>-->
<!--    <div class="row justify-center q-mt-md">-->
<!--      <q-pagination v-model:model-value="paginationParams.page" :max="pagesNumber" :input="false"></q-pagination>-->
<!--    </div>-->
<!--  </div>-->
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:pagination="pagination"
      v-model:selected="selected"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
      :grid="grid"
      :fullscreen="$q.fullscreen.isActive"
    >
            <template v-slot:top>
              Table
              <q-space />
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn
                flat
                stretch
                @click="$q.fullscreen.toggle()"
                :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                :label="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
              ></q-btn>
              <q-btn flat stretch @click="grid = !grid" :icon="grid ? 'grid_off' : 'grid_on'" label="grid"></q-btn>
            </template>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                <q-card :class="props.selected ? 'bg-grey-2' : ''">
                  <q-card-section>
                    <q-checkbox dense v-model="props.selected" :label="props.row.name" />
                  </q-card-section>
                  <q-separator />
                  <q-list dense>
                    <q-item v-for="col in props.cols.filter((col) => col.name !== 'desc')" :key="col.name">
                      <q-item-section>
                        <q-item-label>{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption>{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td class="text-center">
                  <q-checkbox dense v-model:model-value="props.selected" />
                </q-td>
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                <q-td key="calories" :props="props">{{ props.row.calories }}</q-td>
                <q-td key="fat" :props="props">{{ props.row.fat }}</q-td>
                <q-td key="carbs" :props="props">{{ props.row.carbs }}</q-td>
                <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
                <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
                <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
                <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
                <q-td key="option" class="text-right row a-center j-end">
                  <!--todo-->
                  <span class="link-type">details</span>
                  <span class="delete-type m-l-10">delete</span>
                </q-td>
              </q-tr>
            </template>
    </q-table>
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed, ref, reactive, onMounted} from 'vue'
  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Dessert (100g serving)',
      align: 'left',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
    { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
    { name: 'carbs', label: 'Carbs (g)', field: 'carbs', sortable: true },
    { name: 'protein', label: 'Protein (g)', field: 'protein', sortable: true },
    { name: 'sodium', label: 'Sodium (mg)', field: 'sodium', sortable: true },
    { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'option', label: 'option' },
  ]

  const originalRows = [
    { id: 1, name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
    { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
    { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
    { id: 4, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
    { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
    { id: 6, name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
    { id: 7, name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
    { id: 8, name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
    { id: 9, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
    { id: 10, name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' },
    { id: 11, name: 'Frozen Yogurt-1', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
    { id: 12, name: 'Ice cream sandwich-1', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
    { id: 13, name: 'Eclair-1', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
    { id: 14, name: 'Cupcake-1', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
    { id: 15, name: 'Gingerbread-1', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
    { id: 16, name: 'Jelly bean-1', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
    { id: 17, name: 'Lollipop-1', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
    { id: 18, name: 'Honeycomb-1', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
    { id: 19, name: 'Donut-1', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
    { id: 20, name: 'KitKat-1', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' },
    { id: 21, name: 'Frozen Yogurt-2', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
    { id: 22, name: 'Ice cream sandwich-2', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
    { id: 23, name: 'Eclair-2', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
    { id: 24, name: 'Cupcake-2', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
    { id: 25, name: 'Gingerbread-2', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
    { id: 26, name: 'Jelly bean-2', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
    { id: 27, name: 'Lollipop-2', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
    { id: 28, name: 'Honeycomb-2', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
    { id: 29, name: 'Donut-2', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
    { id: 30, name: 'KitKat-2', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' },
    { id: 31, name: 'Frozen Yogurt-3', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
    { id: 32, name: 'Ice cream sandwich-3', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
    { id: 33, name: 'Eclair-3', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
    { id: 34, name: 'Cupcake-3', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
    { id: 35, name: 'Gingerbread-3', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: '7%', iron: '16%' },
    { id: 36, name: 'Jelly bean-3', calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: '0%', iron: '0%' },
    { id: 37, name: 'Lollipop-3', calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: '0%', iron: '2%' },
    { id: 38, name: 'Honeycomb-3', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: '0%', iron: '45%' },
    { id: 39, name: 'Donut-3', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%' },
    { id: 40, name: 'KitKat-3', calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: '12%', iron: '6%' }
  ]
export default defineComponent({
  name: 'TableIndex',
  setup() {
    const rows = ref<typeof originalRows>([])
    const filter = ref('')
    const loading = ref(false)
    const selected = ref([])
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10
    })

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    function fetchFromServer (startRow, count, filter, sortBy, descending) {
      const data = filter
        ? originalRows.filter(row => row.name.includes(filter))
        : originalRows.slice()

      // handle sortBy
      if (sortBy) {
        const sortFn = sortBy === 'desc'
          ? (descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
          )
          : (descending
              ? (a, b) => (parseFloat(b[ sortBy ]) - parseFloat(a[ sortBy ]))
              : (a, b) => (parseFloat(a[ sortBy ]) - parseFloat(b[ sortBy ]))
          )
        data.sort(sortFn)
      }

      return data.slice(startRow, startRow + count)
    }

    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount (filter) {
      if (!filter) {
        return originalRows.length
      }
      let count = 0
      originalRows.forEach(treat => {
        if (treat.name.includes(filter)) {
          ++count
        }
      })
      return count
    }

    function onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        pagination.value.rowsNumber = getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        const returnedData = fetchFromServer(startRow, fetchCount, filter, sortBy, descending)
        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData)

        // don't forget to update local pagination object
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending

        // ...and turn of loading indicator
        loading.value = false
      }, 1500)
    }

    const grid = ref(false)

    onMounted(() => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value,
        filter: undefined
      })
    })

    return {
      filter,
      loading,
      pagination,
      columns,
      rows,
      onRequest,

      grid,
      selected,
    }
  }
})
</script>

<style scoped lang='scss'>
.grid-style-transition {
  transition: transform 0.28s, background-color 0.28s;
}
</style>
