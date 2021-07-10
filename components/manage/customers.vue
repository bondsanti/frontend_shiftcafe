<template>
  <v-app>
     <v-sheet>
       <v-card>
    <v-app-bar
      class="white--text  darken-4"
      elevation="15"
      dense
      dark
    >
      <v-toolbar-title >
        <v-icon> mdi-format-list-checks </v-icon>
        customers
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
          outlined
          color="orange"
          dark
          class="mr-1 black--text text--black"
        ></v-text-field>
      </div>

      <v-btn fab small @click.stop="drawer = !drawer" icon>
        <v-icon>mdi-filter-outline</v-icon>
      </v-btn>

      <v-btn fab small @click.stop="dialog = true" icon>
        <v-icon>mdi-pencil-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" right absolute temporary>
      <v-list-item>
        <v-list-item-avatar color="deep-purple accent-4">
          <v-icon color="white">mdi-filter-outline</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>customers</v-list-item-title>
          <v-list-item-subtitle>Filters</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-select
              :items="['All', 'platinum', 'gold', 'Low']"
              v-model="filters.level"
              label="level"
              hide-details
              dense
              outlined
            ></v-select>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-select
              :items="['All', 'Overdue', 'For today', 'For the future']"
              v-model="filters.deadline"
              label="Deadline"
              hide-details
              dense
              outlined
            ></v-select>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-data-table
      :search="search"
      :headers="headers"
      :items="tasks"
      sort-by="deadline"
    >
      <template v-slot:top>
        <v-toolbar flat height="0">
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text class="pb-0">
                <v-container>
                  <v-form ref="form" v-model="form_valid" lazy-validation>
                    <v-row class="mt-1">
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="editedItem.name"
                          :rules="[(v) => !!v || 'Task Name is required']"
                          :readonly="editedIndex === 0"
                          required
                          label="Task Name"
                          dense
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="['platinum', 'gold', 'Low']"
                          v-model="editedItem.level"
                          :rules="[(v) => !!v || 'Task level is required']"
                          :readonly="editedIndex === 0"
                          required
                          label="level"
                          dense
                          outlined
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-dialog
                          ref="dialog"
                          v-model="modal_date_picker"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.deadline"
                              :rules="[
                                (v) => !!v || 'Task Deadline is required',
                              ]"
                              :readonly="editedIndex === 0"
                              required
                              label="Deadline"
                              dense
                              outlined
                              v-on="editedIndex === 0 ? '' : on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.deadline"
                            scrollable
                            class="pb-2"
                          >
                            <v-btn
                              text
                              color="primary"
                              @click="modal_date_picker = false"
                            >
                              Cancel
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              class="white--text"
                              @click="$refs.dialog.save(editedItem.deadline)"
                            >
                              Select
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          outlined
                          dense
                          name="task_details"
                          label="Task Details (Optional)"
                          auto-grow
                          v-model="editedItem.details"
                          :readonly="editedIndex === 0"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions v-if="editedIndex !== 0" class="pb-4">
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  color="blue darken-1"
                  class="white--text"
                  :loading="loading"
                  plain
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="300px">
            <v-card>
              <v-card-title class="subtitle-1">แน่ใจแล้วใช่มั้ย?</v-card-title>
              <v-card-actions class="pb-4">
                <!-- close -->
                <v-btn
                  :disabled="loading"
                  class="ma-1"
                  color="grey"
                  plain
                  @click="closeDelete"
                >
                  ยกเลิก
                </v-btn>
                <v-spacer></v-spacer>
                <!-- del confirm -->
                <v-btn
                  :loading="loading"
                  class="ma-1"
                  color="error"
                  plain
                  @click="deleteItemConfirm"
                >
                  ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.level`]="{ item }">
        <v-chip
          class="ma-2"
          :color="getlevelColor(item.level)"
          text-color="white"
          small
        >
          {{ item.level }}
        </v-chip>
      </template>

      <template v-slot:[`item.deadline`]="{ item }">
        <v-chip
          class="ma-2"
          :color="getDateColor(item.deadline)"
          :text-color="getDateColor(item.deadline)"
          outlined
          small
        >
          {{ getFormattedDate(item.deadline) }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <!-- view -->
        <v-btn
          class="white--text"
          color="green"
          elevation="0"
          medium
          outlined
          @click="viewItem(item)"
        >
          <v-icon>mdi-eye</v-icon>ข้อมมูล
        </v-btn>
        <!-- edit -->
        <v-btn
          class="white--text"
          color="orange"
          elevation="0"
          medium
          outlined
          @click="editItem(item)"
        >
          <v-icon>mdi-delete</v-icon>แก้ไข
        </v-btn>
        <!-- del -->
        <v-btn
          class="white--text"
          color="red"
          elevation="0"
          medium
          outlined
          @click="deleteItem(item)"
        >
          <v-icon>mdi-delete</v-icon>ลบ
        </v-btn>
      </template>

      <template v-slot:no-data>
        <div class="mt-4 mb-4">
          Nothing to show 😞<br />
          <a class="text-decoration-underline" @click="initialize"
            >Click here</a
          >
          to reset.
        </div>
      </template>
    </v-data-table>
       </v-card>
     </v-sheet>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    filters: {
      priority: '',
      status: '',
      deadline: '',
    },
    drawer: null,
    search: '',
    dialog: false,
    dialogDelete: false,
    tasks: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      priority: '',
      status: '',
      deadline: '',
      details: '',
    },
    defaultItem: {
      name: '',
      priority: '',
      status: '',
      deadline: '',
      details: '',
    },
    modal_date_picker: false,
    form_valid: true,
  }),

  computed: {
    headers() {
      return [
        {
          text: 'คำนำหน้าชื่อ',
          value: 'pname',
        },
        {
          text: 'ชื่อจริง',
          value: 'fname',
        },
        { text: 'นามสกุล', value: 'lname' },
        { text: 'Username', value: 'username' },
        { text: 'วันเกิด ', value: 'birthday' },
        { text: 'เบอร์โทร ', value: 'tel' },
        { text: 'อีเมล์', value: 'email' },
        { text: 'ที่อยู่', value: 'address' },
        // { text: 'Task', align: 'start', sortable: false, value: 'name', divider: true },
        {
          text: 'Priority',
          value: 'priority',
          align: 'center',
          filter: (value) => {
            if (!this.filters.priority || this.filters.priority === 'All')
              return true
            return value === this.filters.priority
          },
        },
        {
          text: 'Status',
          value: 'status',
          align: 'center',
          filter: (value) => {
            if (!this.filters.status || this.filters.status === 'All')
              return true
            return value === this.filters.status
          },
        },
        {
          text: 'Deadline',
          value: 'deadline',
          align: 'center',
          filter: (value) => {
            if (!this.filters.deadline || this.filters.deadline === 'All')
              return true
            return this.classifyDate(value) === this.filters.deadline
          },
        },
        { text: 'Actions', align: 'center', value: 'actions', sortable: false },
      ]
    },
    formTitle() {
      if (this.editedIndex === -1) {
        return 'New task'
      } else if (this.editedIndex === 0) {
        return 'View task'
      } else {
        return 'Edit task'
      }
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    getPriorityColor(priority) {
      if (priority === 'High') return 'red'
      else if (priority === 'Medium') return 'yellow'
      else return 'grey'
    },

    getStatusColor(status) {
      if (status === 'To do') return 'blue'
      else if (status === 'Doing') return 'orange'
      else return 'success'
    },

    getFormattedDate(date) {
      return new Date(date).toJSON().slice(0, 10).replace(/-/g, '/')
    },

    classifyDate(date) {
      if (new Date().toJSON().slice(0, 10) === date) return 'For today'
      else if (new Date().toJSON().slice(0, 10) > date) return 'Overdue'
      else return 'For the future'
    },

    getDateColor(date) {
      if (this.classifyDate(date) === 'For today') return 'orange'
      else if (this.classifyDate(date) === 'Overdue') return 'red'
      else return 'success'
    },

    initialize() {
      this.tasks = [
        {
          name: 'Make the bed',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'Low',
          status: 'To do',
          deadline: '2022-05-05',
        },
        {
          name: 'Have breakfast',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'High',
          status: 'Doing',
          deadline: '2021-05-22',
        },
        {
          name: 'Take a shower',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'Medium',
          status: 'Done',
          deadline: '2023-05-03',
        },
        {
          name: 'Call mom',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'High',
          status: 'Doing',
          deadline: '2021-05-25',
        },
        {
          name: 'Take the dog for a walk',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'Medium',
          status: 'To do',
          deadline: '2024-05-13',
        },
        {
          name: 'Do the dishes',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'High',
          status: 'To do',
          deadline: '2021-05-21',
        },
        {
          name: 'Watch Game of Thrones',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'Low',
          status: 'Doing',
          deadline: '2021-05-09',
        },
        {
          name: 'Go shopping',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'Medium',
          status: 'Done',
          deadline: '2021-05-20',
        },
        {
          name: 'Take a nap',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'High',
          status: 'To do',
          deadline: '2023-05-16',
        },
        {
          name: 'Go to the gym',
          details:
            'Lorem ipsum is a placeholder text used to fill unfilled spaces until proper text is found.',
          priority: 'Low',
          status: 'Done',
          deadline: '2021-05-19',
        },
      ]
    },

    viewItem(item) {
      this.editedIndex = 0
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    editItem(item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.loading = true
      this.tasks.splice(this.editedIndex, 1)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      this.loading = false
      this.closeDelete()
    },

    close() {
      this.$refs.form.resetValidation()
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // save() {
    //   if (this.validateForm()) {
    //     if (this.editedIndex > -1) {
    //       Object.assign(this.tasks[this.editedIndex], this.editedItem)
    //     } else {
    //       this.tasks.push(this.editedItem)
    //     }
    //     this.close()
    //   }
    // },

    async save() {
      this.loading = true
      if (this.validateForm()) {
        if (this.editedIndex > -1) {
          Object.assign(this.tasks[this.editedIndex], this.editedItem)
await new Promise((resolve) => setTimeout(resolve, 1000))

        } else {
          this.tasks.push(this.editedItem)
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
        this.close()
      }

      this.loading = false
      this.close()
    },

    validateForm() {
      return this.$refs.form.validate()
    },
  },
}
</script>
<style scoped>
.v-application .primary--text {
    color: #1d0000 !important;
    caret-color: #000000 !important;
}
.theme--light.v-label {
    color: rgb(0 0 0 / 60%);
}
</style>