<template>
  <div class="ma-3">
    <v-card class="mx-auto mt-6 py-3 rounded-xl" elevaation="1" justify-center>
      <v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="$store.getters['position'] !== 'checker'"
              color="primary"
              dark
              class="mr-5 rounded-xl ma-2"
              elevation="1"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left> mdi-cash-register</v-icon> ลงข้อมูลเงินทอน
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-form>
              <v-card-title>
                <span class="text-h">
                  <v-icon left> mdi-cash-register </v-icon>
                  กรอกข้อมูลเงินทอน
                </span>
                <v-btn text color="error" class="mr-4" @click="reset">
                  รีเซ็ตแบบฟอร์ม
                </v-btn>
              </v-card-title>
              <v-divider class="mb-3"></v-divider>
              <v-form v-model="valid" ref="form">
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="cashdraw.type"
                        label="เลือก"
                        clearable
                        outlined
                        color="primary"
                        :items="items"
                        :rules="rules"
                        required
                        hide-details
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="cashdraw.datetime"
                            label="วันที่"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            clearable
                            v-bind="attrs"
                            v-on="on"
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="cashdraw.datetime"
                          @input="menu2 = false"
                          locale="th-TH"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="12" class="mt-n7">
                      <v-text-field
                        outlined
                        label="จำนวนเงิน"
                        clearable
                        required
                        type="number"
                        v-model="cashdraw.total_money"
                        :rules="rules"
                        color="primary"
                        prefix="฿"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="mt-n7">
                      <v-textarea
                        color="primary"
                        outlined
                        v-model="cashdraw.remark"
                        :rules="rules"
                        label="หมายเหตุ"
                        clearable
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-form>
              <v-divider class="mt-n3"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  class="mr-1 rounded-xl"
                  elevation="1"
                  @click="close"
                >
                  <v-icon left> mdi-close </v-icon>ปิด
                </v-btn>
                <v-btn
                  color="primary"
                  class="mr-1 rounded-xl"
                  elevation="1"
                  :disabled="!valid"
                  @click="saveData()"
                >
                  <v-icon left> mdi-content-save </v-icon>บันทึก
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogeditItem" max-width="500px">
          <v-card class="rounded-xl">
            <v-form>
              <v-card-title>
                <span class="text-h">
                  <v-icon left> mdi-cash-register </v-icon> แก้ไขข้อมูล
                </span>
                <v-btn text color="error" class="mr-4" @click="reset">
                  รีเซ็ตแบบฟอร์ม
                </v-btn>
              </v-card-title>
              <v-divider class="mb-3"></v-divider>
              <v-form v-model="valid" ref="form">
                <v-card-text>
                  <v-row>
                    <v-col cols="12"> </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-textarea
                        color="primary"
                        outlined
                        v-model="cashdrawedi.remark"
                        :rules="rules"
                        label="หมายเหตุ"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-form>
              <v-divider class="mt-n3"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  class="mr-1 rounded-xl"
                  elevation="1"
                  @click="closeedit"
                >
                  <v-icon left> mdi-close </v-icon>ปิด
                </v-btn>
                <v-btn
                  color="primary"
                  class="mr-1 rounded-xl"
                  elevation="1"
                  :disabled="!valid"
                  @click="saveData()"
                >
                  <v-icon left> mdi-content-save </v-icon>บันทึก
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหา"
          class="rounded-xl"
          single-line
          solo
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        multi-sort
        :items="cashTableData"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50, -1],
          prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right',
          'items-per-page-text': 'ข้อมูลหน้าต่อไป'
        }"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="410">
            <v-card>
              <v-card-title class="justify-center error">
                คุณต้องลบรายการนี้หรือไม่?
              </v-card-title>
              <v-divider class="mx-auto"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="" class="rounded-xl" @click="closeDelete">
                  <v-icon aria-hidden="false" class="ma-1 ">
                    mdi-close-box </v-icon
                  >ยกเลิก
                </v-btn>
                <v-btn
                  class="rounded-xl"
                  color="primary"
                  :disabled="
                    $store.getters['position'] === 'cashier' ||
                      $store.getters['position'] === 'checker'
                  "
                  @click="deleteItemConfirm()"
                >
                  <v-icon aria-hidden="false" class="ma-1 rounded-xl">
                    mdi-delete-forever </v-icon
                  >ลบ
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            class="mr-1 rounded-xl ma-2"
            elevation="1"
            color="warning"
            small
            @click="editItem(item)"
            :disabled="$store.getters['position'] === 'checker'"
          >
            <v-icon aria-hidden="false" class="mx-2">
              mdi-pencil-plus
            </v-icon>
            แก้ไข
          </v-btn>
          <v-btn
            class="mr-1 rounded-xl ma-2"
            elevation="1"
            color="error"
            small
            :disabled="
              $store.getters['position'] === 'cashier' ||
                $store.getters['position'] === 'checker'
            "
            @click="deleteItem(item)"
          >
            <v-icon dark class="mx-2">
              mdi-delete-forever
            </v-icon>
            ลบ
          </v-btn>
        </template>
        <template v-slot:[`item.type`]="{ item }">
          <v-chip :color="getColor(item.type)" dark small>
            {{ item.type }}
          </v-chip>
        </template>
        <template v-slot:[`item.total_money`]="{ item }">
          <span class="">{{ formatPrice(item.total_money) }}</span>
        </template>
        <template v-slot:[`item.no`]="{ index }">
          {{ index + 1 }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "layoutCashier",
  data() {
    return {
      //loadData: [],
      dialog: false,
      dialogedi: false,
      dialogDelete: false,
      dialogeditItem: false,
      //

      rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
      valid: true,
      //
      menu2: false,
      deleteId: null,
      search: "",
      editedIndex: -1,
      type: null,
      cashdraw: {
        _id: " ",
        type: "",
        total_money: "",
        remark: "",
        datetime: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      },
      cashdrawedi: {
        _id: " ",
        remark: ""
      },
      items: ["นำเงินเข้า", "นำเงินออก"],
      headers: [
        {
          text: "ลำดับ",

          value: "no"
        },
        {
          text: "วันที่",
          value: "datetime"
        },
        {
          text: "ผู้ทำการบันทึก",
          value: "ref_emp_id"
        },
        {
          text: "ประเภท",
          value: "type"
        },
        {
          text: "จำนวนเงิน",
          value: "total_money"
        },
        {
          text: "หมายเหตุ",
          value: "remark"
        },
        {
          text: "เครื่องมือ",
          value: "actions"
        }
      ]
    };
  },
  computed: {
    cashTableData() {
      return this.loadData.reverse().map(item => {
        return {
          _id: item._id,
          datetime: this.formatDate(item.datetime),
          ref_emp_id: `${item.ref_emp_id.fname} ${item.ref_emp_id.lname}`,
          type: item.type,
          total_money: item.total_money,
          remark: item.remark
        };
      });
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    initialize() {},
    formatPrice(total_money) {
      const value = parseInt(total_money);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getColor(type) {
      if (type === "นำเงินเข้า") return "green";
      else return "red";
    },
    editItem(item) {
      this.type = "edit";
      this.cashdrawedi = item;
      this.dialogeditItem = true;
    },

    deleteItem(item) {
      this.deleteId = item._id;
      this.editedIndex = this.loadData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.loadData.splice(this.editedIndex, 1);
      this.$axios
        .$delete("/withdraw/" + this.deleteId)
        .then(res => {
          this.$emit("refresh");
          this.closeDelete();
          this.$swal({
            type: "success",
            title: res.message
          });
        })
        .catch(e => {
          this.$swal({
            type: "error",
            title: e
          });
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeedit() {
      this.dialogeditItem = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    saveData() {
      this.$refs.form.validate();
      if (this.type === "edit") {
        this.loading = true;
        this.$axios
          .$put("/withdraw/" + this.cashdrawedi._id, this.cashdrawedi)
          .then(res => {
            // console.log(res);
            this.$emit("refresh");
            this.$swal.fire({
              type: "success",
              title: res.message
            });
            this.closeedit();
            this.type = null;
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        // add
        this.loading = true;
        this.$axios
          .$post("/withdraw/", this.cashdraw)
          .then(res => {
            // console.log(res);
            this.$emit("refresh");
            this.close();
            this.$swal.fire({
              type: "success",
              title: res.message
            });
          })
          .catch(e => {
            this.$swal({
              type: "error",
              title: e
            });
          });
        this.dialog = false;
        this.reset();
        this.type = null;
        //console.log(this.cashdraw);
      }
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY");
    }
  },

  props: ["loadData"]
};
</script>
