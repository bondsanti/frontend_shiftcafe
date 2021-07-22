<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6  py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-card color="primary" dark class="mr-5 mb-4">
              <v-btn color="primary" @click="dialog = true">
                <v-icon left> mdi-file-powerpoint-box </v-icon>จัดการพอยท์
                เพิ่ม/ลด
              </v-btn>
            </v-card>
            <v-btn
              color="primary"
              disabled
              dark
              class="mr-5"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left> mdi-barley </v-icon> จัดการพอยท์
            </v-btn>
          </template>
        </v-dialog>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table :headers="headers" :items="pointmanage" :search="search">
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  ><v-icon left>mdi-card-account-details-outline </v-icon>
                  ข้อมูลพนักงาน</span
                >
              </v-card-title>

              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <div>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete
                          outlined
                          v-model="cusId"
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
                          outlined
                          required
                          color="#1D1D1D"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="status"
                          outlined
                          :items="items"
                          label="Standard"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  class="ma-1"
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
                <v-btn class="ma-1" color="info" @click="save()">
                  <v-icon aria-hidden="false" class="mx-2">
                    mdi-content-save
                  </v-icon>
                  บันทึกข้อมูล
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
         <template v-slot:[`item.ref_emp_id`]="{ item }">
          {{ item.ref_emp_id.pname }} {{ item.ref_emp_id.fname }}
          {{ item.ref_emp_id.lname }}
        </template> 
        <template v-slot:[`item.point`]="{ item }">
          <v-icon class="ma-2 ml-2" color="primary">
            mdi-file-powerpoint-box
          </v-icon>
          {{ item.point }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColorstatus(item.status)" dark small>
            {{ getTxt(item.status) }}
          </v-chip>
        </template>
        <template v-slot:[`item.datetime`]="{ item }">
          <span>{{ item.datetime | moment }}</span>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    dialog: false,

    dialogDelete: false,
    search: "",
    headers: [
      { text: "ลำดับ", sortable: false, value: "No" },
      {
        text: "ชื่อลูกที่ถูกจัดการ",
        align: "start",
        sortable: false,
        value: "ref_cus_id"
      },
      { text: "ชื่อพนักงานที่จัดการ", sortable: false, value: "ref_emp_id" },

      { text: "แต้ม(P)", align: "start", sortable: false, value: "point" },
      { text: "สถานะ", align: "start", sortable: false, value: "status" },

      { text: "วันทีเพิ่มลดแต้ม", sortable: false, value: "datetime" }
      //   { text: "Actions", value: "actions", sortable: false }
    ],
    cusId: null,
    customers2: [],
    items: ["เพิ่ม", "ลด"],
    status: "เพิ่ม",
    point: 0,
    valid: true
  }),

  filters: {
    moment: function(date) {
      // return moment(date).format('Do MMMM YYYY').add(543, 'years')
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY");
    }
  },

  methods: {
    getTxt(status) {
      if (status === "plus") return "เพิ่ม";
      else return "ลบ";
    },
    getColorstatus(status) {
      if (status === "plus") return "green";
      else return "red";
    },
    save() {
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
          console.log(res);
          this.dialog = false;
        })
        .catch(e => {
          console.log(e);
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
    }
  },
  props: ["pointmanage", "customers"],
  created() {
    this.improveCus();
  }
};
</script>
