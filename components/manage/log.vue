<template>
  <div class="ma-3 rounded-lg">
    <v-card
      class="mx-auto mt-6  py-3 rounded-xl"
      elevaation="5"
      justify-centaer
    >
      <v-card-title>
        <v-icon left large class=" mb-6 ">mdi-folder-clock-outline </v-icon>
        <span class=" mb-6 ">บันทึกกิจกรรม</span>
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
        :items="LogTableData"
        :search="search"
        :items-per-page="30"
        :footer-props="{
          'items-per-page-options': [30, 40, 50, -1],
          prevIcon: 'mdi-chevron-left',
          nextIcon: 'mdi-chevron-right',
          'items-per-page-text': 'ข้อมูลหน้าต่อไป'
        }"
      >
        >

        <template v-slot:[`item.No`]="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="reloadPage">
            Reset
          </v-btn>
        </template>
      </v-data-table>
      <v-card-text>
        <v-alert
          outlined
          color="info"
          prominent
          border="left"
          class="text-center"
        >
          หน้านี้เป็นการเก็บเหตุการณ์ทั้งหมดในเว็บไซต์
          <q class="font-weight-black ">
            ระบบจะบันทึกกิจกรรมทุกอย่าง
          </q>
          <v-icon color="info">mdi-spin mdi-update</v-icon>
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/th";
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "ลำดับ",
        sortable: false,
        value: "No"
      },
      {
        text: "วันที่",
        sortable: false,
        value: "datetime"
      },
      {
        text: "บุคคลที่ดำเนินการ",
        align: "start",
        value: "emp_id",
        sortable: false
      },
      {
        text: "เหตุการณ์",
        value: "activity",
        sortable: false
      }
    ]
  }),

  computed: {
    LogTableData() {
      return this.log.reverse().map(item => {
        return {
          emp_id: `${
            item.emp_id
              ? item.emp_id.fname + " " + item.emp_id.lname
              : "ไม่พบรหัสพนักงานนี้"
          }`,
          _id: item._id,
          datetime: this.formatDate(item.datetime),
          activity: item.activity
        };
      });
    }
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return moment(strdate).format("DD MMMM YYYY  เวลา H.mm.ss น.");
    }
  },
  props: ["log"]
};
</script>
