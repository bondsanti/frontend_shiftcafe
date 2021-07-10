<template>
  <v-container  fluid tag="section">
    <v-row>
      <v-col cols="12">
        <base-material-card>
          <v-card-text class="px-0 pb-0">
            <v-sheet>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                :style="{
                  background: $vuetify.theme.themes[theme].formBackground
                }"
                class="elevation-5 rounded-lg px-5 py-2"
              >
                <v-row class="mb-0">
                  <v-col cols="12">
                    <v-toolbar class="mb-2 rounded-lg " color="#1d1d1d" dark flat>
                    <v-toolbar-title>
                      <v-icon class="mx-2" dark>
                    mdi-archive
                  </v-icon>
                      จัดการStock</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                     <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                      <v-btn
                  @click="addRow"
                  outlined
                  color="1d1d1d"
                  class="mx-6 ma-6"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                  <span>เพิ่มรายการ</span>
                </v-btn>

                    </v-toolbar>
                  </v-col>
                </v-row>

          
                <v-row
                  class="rounded mb-2 mx-0"
                  v-for="(job, index) in formData.jobs"
                  :key="index"
                  style="border: 1px solid lightgrey;"
                >
                  <v-col cols="3" md="3">
                    <v-autocomplete
                    outlined
                      v-model="job.position"
                      :items="positions"
                      label="เมนู"
                      prepend-icon="mdi-food"
                      :rules="requiredRules"
                    />
                  </v-col>
                  <v-col cols="3" md="2">
                    <v-text-field
                    outlined
                      label="จำนวลที่คาดว่าจะผลิดได้"
                      v-model="job.company"
                      :rules="requiredRules"
                      hint="The name is quite enough."
                      prepend-icon="mdi-bag-personal-outline"
                    />
                  </v-col>
                  <v-col cols="3" md="2">
                    <v-text-field
                    outlined
                      label="จำนวลไกล้หมดให้แจ้งเตือน"
                      v-model="job.company"
                      :rules="requiredRules"
                      hint="The name is quite enough."
                      prepend-icon="mdi-bell-ring-outline"
                    />
                  </v-col>
                  <v-col cols="3" md="3">
                    <v-dialog
                    outlined
                      ref="dialog"
                      v-model="calenderModal"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        outlined
                          v-model="job.dateRange"
                          label="วันที่ขาย"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="requiredRules"
                        ></v-text-field>
                      </template>

                      <v-date-picker v-model="job.dateRange" range>
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            calenderModal = false;
                            job.dateRange = null;
                          "
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="validateDate(job.dateRange, index)"
                        >
                          Save
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col
                    cols="12"
                    md="1"
                    class="d-flex justify-center align-center mx-0 px-0"
                  >
                    <v-btn
                      icon
                      small
                      color="primary"
                      :disabled="index === 0"
                      @click="moveUp(index)"
                    >
                      <v-icon>mdi-menu-up</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                      color="primary"
                      :disabled="
                        index === Object.keys(formData.jobs).length - 1
                      "
                      @click="moveDown(index)"
                    >
                      <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                      color="red"
                      :disabled="Object.keys(formData.jobs).length === 1"
                      @click="deleteRow(index)"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
             
                </v-row>
                
                <v-row justify="center" align="center">
                
                     <v-btn   color="#1d1d1d"   class="mx-2 ma-2 white--text" large elevation="5" rounded-lg @click="validate">
                      เพิ่มลงฐานข้อมูล
                    </v-btn>
    
                
                   

                 

                </v-row>
                
              </v-form>
            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <base-v-component />


    <base-material-card class="px-5 py-3">

    
    <v-sheet>
    <v-card    outlined
      color="#1d1d1d"  elevation="5"  class="px-0 pb-0 elevation-5 rounded-lg">
   
            
                   
    
                  
                   <v-toolbar class="mb-2 rounded-lg " color="#1d1d1d" dark flat>
                    <v-toolbar-title  single-line
                      sticky>
                      <v-icon class="mx-2" dark>
                    mdi-archive
                  </v-icon>
                      ข้อมูล stock </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                     <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                     <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="ค้นหา"
                      class="white--text subheading font-weight-bold mt-4"
                    ></v-text-field>

                    </v-toolbar>
      <v-simple-table>

        <thead>
          
          <tr>
            <th class="primary--text">
              ลำดับ
            </th>
            <th class="primary--text">
              ชื่อ
            </th>
            <th class="primary--text">
              จำนวล
            </th>
            <th class="primary--text">
              วันที่
            </th>
            <th class="text-right primary--text">
              ราคาที่คาดจะขายได้
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>แก้วกาแฟร้อน</td>
            <td>90</td>
            <td>18 มีนาคม 2564</td>
            <td class="text-right">
              36,738 บาท
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>แก้วกาแฟเย็น</td>
            <td>80</td>
            <td>18 มีนาคม 2564</td>
            <td class="text-right">
              23,789 บาท
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>เค้ก</td>
            <td>70</td>
            <td>18 มีนาคม 2564</td>
            <td class="text-right">
              56,142 บาท
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>น้ำดืม</td>
            <td>60</td>
            <td>18 มีนาคม 2564</td>
            <td class="text-right">
              38,735 บาท
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>น้ำอัดลม</td>
            <td>23</td>
            <td>18 มีนาคม 2564</td>
            <td class="text-right">
              63,542 บาท
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>อาหาร</td>
            <td>20</td>
            <td>18 มีนาคม 2564</td>
            <td class="text-right">
              78,615 บาท
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    </v-sheet>
    </base-material-card>

    <div class="py-3" />
  </v-container>
</template>
<script>
export default {
   middleware:'auth',
  data: () => ({
    valid: false,
    calenderModal: false,
    formLoading: false,
    positions: [
      "แก้วกาแฟเย็น",
      "แก้วกาแฟร้อน",
      "เค้ก",
      "น้ำดืม",
      "น้ำอัดลม",
      "อาหาร",
      "เคื่องเดืทชูกำลัง"
    ],
    formData: {
      jobs: [{}]
    },
    requiredRules: [v => !!v || "กรุณากรอกข้อมูลในช่องนี้!"],
    numberRules: [
      v => !!v || "กรุณากรอกข้อมูลในช่องนี้!",
      v => Number.isInteger(Number(v)) || "กรุณากรอกข้อมูลในช่องนี้!"
    ]
    // emailRules: [
    //   v => !!v || "กรุณากรอกข้อมูลในช่องนี้!",
    //   v =>
    //     !v ||
    //     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    //     "E-mail must be valid"
    // ]
  }),
  methods: {
    deleteRow(index) {
      this.formData.jobs.splice([index], 1);
    },
    addRow() {
      this.formData.jobs.push({});
    },
    moveUp(index) {
      let temp1 = this.formData.jobs[index];
      let temp2 = this.formData.jobs[index - 1];
      this.$set(this.formData.jobs, index, temp2);
      this.$set(this.formData.jobs, index - 1, temp1);
    },
    moveDown(index) {
      let temp1 = this.formData.jobs[index];
      let temp2 = this.formData.jobs[index + 1];
      this.$set(this.formData.jobs, index, temp2);
      this.$set(this.formData.jobs, index + 1, temp1);
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log("submit");
        this.formLoading = true;
        // Timeout Function only for showing loading progress
        setTimeout(() => {
          alert(JSON.stringify(this.formData));
          this.formLoading = false;
          this.reset();
        }, 4000);
      }
    },
    validateDate(dateRange, index) {
      if (dateRange.length === 2) {
        this.calenderModal = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
};
</script>
