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
          <v-card class="px-6 py-5 mb-5">
            <div class="text-center">
              <h2 class="">รายการประวัติการสั่งซื้อ</h2>
              <v-divider class="mt-3 mb-2"></v-divider>
            </div>
            <v-data-table
              :headers="headers"
              :items="historyBuy"
              :items-per-page="10"
              :sort-by="['datetime']"
              :sort-desc="[true, false]"
              class="mb-n5"
            >
              <template v-slot:[`item.datetime`]="{ item }">
                <span>{{ formatDate(item.datetime) }}</span>
              </template>
              <template v-slot:[`item.type_payment`]="{ item }">
                <v-chip :color="getColor(item.type_payment)" dark small>
                  {{ getTxt(item.type_payment) }}
                </v-chip>
              </template>
              <template v-slot:[`item.total_price`]="{ item }">
                {{ formatPrice(item.total_price) }}
              </template>
              <template v-slot:[`item.discount_price`]="{ item }">
                {{ formatPrice(item.discount_price) }}
              </template>
              <template v-slot:[`item.net_price`]="{ item }">
                {{ formatPrice(item.net_price) }}
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import MenuProfile from "~/components/memberLayout/MenuProfile";
export default {
  layout: "layoutMember",
  middleware: ["auth", "refresh"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "ประวัติการสั่งซื้อ",
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
          text: "วัน เวลา",
          align: "start",
          sortable: true,
          value: "datetime"
        },
        { text: "ประเภทชำระ", value: "type_payment" },
        { text: "ราคา", value: "total_price" },
        { text: "ส่วนลด", value: "discount_price" },
        { text: "ยอดสิทธิ", value: "net_price" },
        { text: "ได้พอยท์", value: "ref_point_pay_id.point" }
      ],
      historyBuy: []
    };
  },
  methods: {
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY H:mm");
    },
    formatPrice(total_price, discount_price, net_price) {
      const value = parseInt(total_price, discount_price, net_price);
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getColor(type_payment) {
      if (type_payment === "cash") return "#5C6BC0";
      else return "blue lighten-1";
    },
    getTxt(type_payment) {
      if (type_payment === "cash") return "เงินสด";
      else return "โอน";
    }
  },
  async asyncData(context) {
    const loadData = await context.$axios.$get(
      "/customer/" + context.$auth.user._id
    );
    const historyBuy = await context.$axios.$get(
      "/payment/customer/" + context.$auth.user._id
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

    //console.log(historyBuy);
    return { loadData, historyBuy, totalprice, Sumtotal };
  },

  components: {
    MenuProfile
  }
};
</script>

<style>
.text-plus {
  color: green;
  font-size: 14px;
}
.text-minus {
  color: red;
  font-size: 14px;
}
</style>
