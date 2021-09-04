<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile
            :loadData="loadData"
            :totalprice="totalprice"
            :Sumtotal="Sumtotal"
          />
        </v-col>
        <v-col xs="12" sm="12" md="9" class="">
          <v-card>
            <v-card-title class="primary white--text text-h5">
              พอยท์ของฉัน
            </v-card-title>
            <v-row class="pa-4" justify="space-between">
              <v-row no-gutters style="flex-wrap: nowrap">
                <v-col cols="1"></v-col>
                <v-col cols="10" class="flex-grow-0 flex-shrink-0 text-center">
                  <v-img
                    src="coin-gif.gif"
                    class="mx-auto mt-n1"
                    max-width="80px"
                  ></v-img>

                  <h1 class="pa-2 mt-n2">
                    {{ formatPrice(loadData.point) }}
                  </h1>
                  <h1 class="mt-n4 text-point">Point Coin</h1>
                  <!-- <div class="text-center grey lighten-5">อัพเดท {{}}</div> -->
                </v-col>
                <v-col cols="1"> </v-col>
              </v-row>
            </v-row>
          </v-card>
          <v-row>
            <v-col class="">
              <v-card class="px-6 py-5 mb-5 mt-5">
                <div class="text-center">
                  <h2 class="">รายการประวัติพอยท์ของฉัน</h2>
                  <v-divider class="mt-3 mb-2"></v-divider>
                </div>
                <v-data-table
                  :headers="headers"
                  :items="loadPoint"
                  :items-per-page="10"
                  :sort-by="['datetime']"
                  :sort-desc="[true, false]"
                  class="mb-n5"
                >
                  <template v-slot:[`item.datetime`]="{ item }">
                    <span>{{ formatDate(item.datetime) }}</span>
                  </template>
                  <template v-slot:[`item.point_by`]="{ item }">
                    <v-chip :color="getForm(item.point_by)" dark small>
                      {{ getFormTxt(item.point_by) }}
                    </v-chip>
                  </template>
                  <template v-slot:[`item.status`]="{ item }">
                    <v-chip :color="getColor(item.status)" dark small>
                      {{ getTxt(item.status) }} {{ item.point }} พอยท์
                    </v-chip>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import MenuProfile from "~/components/memberLayout/MenuProfile";
export default {
  layout: "layoutMember",
  middleware: ["auth", "refresh"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "พอยท์",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$store.getters["setting"][0].sub_title
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`
        }
      ]
    };
  },

  data() {
    return {
      headers: [
        {
          text: "วันที่",
          align: "start",
          sortable: true,
          value: "datetime"
        },
        { text: "รายการ", value: "point_by" },
        { text: "จำนวน", value: "status" }
      ]
    };
  },
  methods: {
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    },
    formatPrice(point) {
      const value = parseInt(point);
      let val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getColor(status) {
      if (status === "plus") return "green";
      else return "red";
    },
    getTxt(status) {
      if (status === "plus") return "+";
      else return "-";
    },
    getForm(point_by) {
      if (point_by === "buy") return "#5C6BC0";
      else return "blue lighten-1";
    },
    getFormTxt(point_by) {
      if (point_by === "buy") return "ซื้อ อาหารและเครื่องดื่ม";
      else return "ระบบ";
    }
  },

  async asyncData(context) {
    const loadData = await context.$axios.$get(
      "/customer/" + context.$auth.user._id
    );
    const loadPoint = await context.$axios.$get(
      "/point-manage/customer/" + context.$auth.user._id
    );
    const levelMember = await context.$axios.$get("/level-member");

    const startDate = new Date(loadData.mission.start);
    const endDate = new Date(loadData.mission.end);

    let totalprice = 0;
    let Sumtotal = 0;
    if (loadData.ref_level_id) {
      //เรียงจากน้อยไปมาก เรียงตาม target_price
      const dataMem = levelMember.sort(
        (a, b) => a.target_price - b.target_price
      );
      //หา target ใหม่เพื่อเปลี่ยนระดับสมาชิก
      const newTarget = dataMem.find(
        d => loadData.ref_level_id.target_price < d.target_price
      );
      //console.log(newTarget);
      //นำ target_price ใหม่ที่ได้ไปเปลี่ยนอันเก่า
      loadData.ref_level_id.target_price = newTarget
        ? newTarget.target_price
        : 1000000;
      const data = await context.$axios.$get(
        "/payment/customer/" + context.$auth.user._id
      );
      const newData = data.filter(p => {
        return (
          new Date(p.datetime).getTime() >= startDate.getTime() &&
          new Date(p.datetime).getTime() <= endDate.getTime()
        );
      });
      for (let key in newData) {
        totalprice += data[key].net_price;
      }
      let target_price = loadData.ref_level_id.target_price;

      Sumtotal = (totalprice / target_price) * 100;
    } else {
      Sumtotal = 0;
      totalprice = 0;
    }
    //console.log(loadPoint);
    //console.log(context.$auth.user);
    return { loadData, loadPoint, totalprice, Sumtotal };
  },
  filters: {
    moment: function(date) {
      // return moment(date).format('Do MMMM YYYY').add(543, 'years')
      var strdate = moment(date).add(543, "years");
      return moment(strdate).format("D/MM/YY H:mm");
    }
  },
  components: {
    MenuProfile
  }
};
</script>

<style scoped>
.v-icon {
  animation: bounce 2s infinite;
}
.text-point {
  font-size: 30px;
  letter-spacing: 0.1em;
  line-height: 1.5;
  color: #00c853;
  font-weight: 900;
}

.text-plus {
  color: green;
  font-size: 14px;
}
.text-minus {
  color: red;
  font-size: 14px;
}
</style>
