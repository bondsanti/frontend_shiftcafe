<template>
  <div class="ma-3">
    <v-card
      class="mx-auto mt-6  py-3 rounded-xl "
      elevation="1"
      justify-centaer
    >
      <v-card-title>
        <v-btn
          color="primary"
          class="mr-1 mb-6 rounded-xl"
          elevation="1"
          @click="dialog = true"
        >
          <v-icon left> mdi-file-powerpoint-box </v-icon>จัดการพอยท์ เพิ่ม/ลด
        </v-btn>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          class="rounded-xl"
          solo
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="pointTableData"
        :search="search"
        :items-per-page="25"
        :footer-props="{
          'items-per-page-options': [30, 40, 50, -1],
          prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right',
          'items-per-page-text': 'ข้อมูลหน้าต่อไป'
        }"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="800px">
            <v-form v-model="valid" ref="form">
              <v-card>
                <v-card-title>
                  <span class="text-h5">
                    <v-icon left>mdi-file-powerpoint-box </v-icon>
                    จัดการพอยท์ เพิ่ม/ลด
                  </span>
                  <v-btn text color="error" class="mr-4" @click="reset">
                    รีเซ็ตแบบฟอร์ม
                  </v-btn>
                </v-card-title>

                <v-card-text>
                  <div>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete
                          outlined
                          v-model="cusId"
                          :rules="[v => v !== null || 'เลือกลูกค้าก่อนเน้อ']"
                          chips
                          clearable
                          label="ค้นหาข้อมูลลูกค้า"
                          :items="customers2.flat()"
                          item-value="_id"
                          item-text="name"
                        ></v-autocomplete>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="point"
                          label="จำนวนแต้ม"
                          min="1"
                          outlined
                          required
                          clearable
                          color="primary"
                          type="number"
                          :rules="[v => v > 0 || '0 ไม่ได้น้า ต้อง 1 ขึ้นเน้อ']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="status"
                          outlined
                          clearable
                          :items="items"
                          label="Standard"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    class="ma-1 rounded-xl"
                    elevation="1"
                    color="primary"
                    dark
                    @click="dialog = false"
                  >
                    <v-icon aria-hidden="false" class="mx-2">
                      mdi-close-box
                    </v-icon>
                    ยกเลิก
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ma-1 rounded-xl"
                    elevation="1"
                    color="info"
                    @click="save()"
                    :disabled="!valid"
                  >
                    <v-icon aria-hidden="false" class="mx-2">
                      mdi-content-save
                    </v-icon>
                    บันทึกข้อมูล
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:[`item.ref_cus_id`]="{ item }">
          <v-icon>mdi-account</v-icon>{{ item.ref_cus_id }}
        </template>
        <template v-slot:[`item.point`]="{ item }">
          <v-icon class="ma-2 ml-2" color="primary">
            mdi-file-powerpoint-box
          </v-icon>
          {{ item.point }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColorstatus(item.status)" dark small>
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="reloadPage">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,

    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "ลำดับ",
        sortable: false,
        value: "No"
      },

      {
        text: "วันทีเพิ่มลดแต้ม",
        sortable: false,
        value: "datetime"
      },
      {
        text: "ชื่อลูกค้าที่ถูกจัดการ",
        sortable: false,
        value: "ref_cus_id"
      },
      {
        text: "ชื่อพนักงานที่จัดการ",
        sortable: false,
        value: "ref_emp_id"
      },

      {
        text: "แต้ม(P)",
        sortable: false,
        value: "point"
      },
      {
        text: "สถานะ",
        sortable: false,
        value: "status"
      }

      //   { text: "Actions", value: "actions", sortable: false }
    ],
    cusId: null,
    customers2: [],
    items: ["เพิ่ม", "ลด"],
    status: "เพิ่ม",
    point: 0,
    valid: true
  }),
  computed: {
    pointTableData() {
      return this.pointmanage.reverse().map(item => {
        return {
          ref_cus_id: `${item.ref_cus_id ? item.ref_cus_id.pname : ""} ${
            item.ref_cus_id ? item.ref_cus_id.fname : ""
          } ${item.ref_cus_id ? item.ref_cus_id.lname : ""}`,
          ref_emp_id: `${item.ref_emp_id.fname} ${item.ref_emp_id.lname}`,
          point: item.point,
          status: item.status === "plus" ? "เพิ่ม" : "ลบ",
          datetime: this.formatDate(item.datetime)
        };
      });
    }
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    getColorstatus(status) {
      if (status === "เพิ่ม") return "green";
      else return "red";
    },
    save() {
      this.$refs.form.validate();
      let newPoint = {};
      if (this.status === "เพิ่ม") {
        newPoint = {
          ref_cus_id: this.cusId,
          point: this.point,
          status: "plus"
        };
      } else {
        newPoint = {
          ref_cus_id: this.cusId,
          point: this.point,
          status: "minus"
        };
      }
      this.$axios
        .$post("/point-manage", newPoint)
        .then(res => {
          this.$emit("refreshPoint");
          //console.log(res);
          this.$swal({
            type: "success",
            title: res.message
          });
          this.dialog = false;
        })
        .catch(e => {
          this.$swal({
            type: "error",
            title: e
          });
        });
    },
    improveCus() {
      for (let i in this.customers) {
        let cus = {
          _id: this.customers[i]._id,
          name: `${this.customers[i].fname} ${this.customers[i].lname} || tel : ${this.customers[i].tel}`
        };
        this.customers2.push(cus);
      }
    },
    reloadPage() {
      window.location.reload();
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY ");
    }
  },
  props: ["pointmanage", "customers"],
  created() {
    this.improveCus();
  }
};
</script>
