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
          <h2 class="text-left mb-2">คูปอง</h2>

          <v-text-field
            dense
            placeholder="ค้นหา"
            solo
            v-model="search"
          ></v-text-field>
          <v-row class="">
            <v-col
              v-for="(coupon, i) in visiblePages"
              :key="i"
              sm="6"
              md="4"
              cols="12"
              class="mt-n2"
            >
              <v-card class="rounded-xl">
                <v-img src="COUPON02.png" height="auto">
                  <v-row style="margin-top:13%" no-gutters justify="end">
                    <v-col cols="2"></v-col>
                    <v-col cols="10">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title
                            ><h4>CODE: {{ coupon.codename }}</h4>
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            จำนวนลด: {{ coupon.discount }} %
                          </v-list-item-subtitle>
                          <v-list-item-subtitle class="caption">
                            ระยะเวลา: {{ formatDate(coupon.start) }} -
                            {{ formatDate(coupon.end) }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-row justify="end" class="mb-2 mr-2"
                        >สิทธิ์การใช้งานคงเหลือ
                        {{ coupon.num_use }} ครั้ง</v-row
                      >
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
              <!-- <v-card color="primary" dark>
                <div class="d-flex flex-no-wrap justify-space-around">
                  <div>
                    <v-card-title class="text-h5">{{
                      coupon.codename
                    }}</v-card-title>

                    <v-card-subtitle
                      >ระยะเวลา {{ formatDate(coupon.start) }} -
                      {{ formatDate(coupon.end) }}
                      <p>{{ coupon.detail }}</p></v-card-subtitle
                    >

                    <v-card-actions>
                      <h2>{{ coupon.discount }}%</h2>

                      <v-btn class="ml-2 " outlined rounded small>
                        เหลือ {{ coupon.num_use }} ครั้ง
                      </v-btn>
                    </v-card-actions>
                  </div>

                  <v-avatar class="ma-2" size="80" tile>
                    <v-img
                      :src="
                        `${$nuxt.context.env.config.IMG_URL}${$store.getters['setting'][0].logo}`
                      "
                    ></v-img>
                  </v-avatar>
                </div>
              </v-card> -->
            </v-col>
          </v-row>
          <div class="text-center">
            <v-pagination
              color="error"
              v-model="currentPage"
              :length="Math.ceil(this.dealers.length / this.perPage)"
              circle
              class="mt-5"
            ></v-pagination>
          </div>
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
      title: "คูปอง",
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
  components: {
    MenuProfile
  },
  data() {
    return {
      search: "",
      currentPage: 1,
      perPage: 6,
      dealers: []
    };
  },
  computed: {
    visiblePages() {
      if (this.search) {
        return this.dealers.filter(rows => {
          return rows.codename
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      } else {
        return this.dealers.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        ); //แบ่งหน้า
        //return this.dealers;
      }
    }
  },
  async asyncData(context) {
    const loadData = await context.$axios.$get(
      "/customer/" + context.$auth.user._id
    );
    const levelMember = await context.$axios.$get("/level-member");
    const coupon = await context.$axios.$get("/coupon");

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
    //console.log(loadData);
    //console.log(context.$auth.user);
    return { loadData, totalprice, Sumtotal, coupon };
  },
  methods: {
    formatDate(date) {
      this.$moment().format("LLLL");
      let strdate = this.$moment(date).add(543, "years");
      return this.$moment(strdate).format("D MMMM YYYY");
    },
    filterCoupon() {
      const res = this.coupon.filter(c => c.status === 1);
      this.dealers = res;
      //console.log(res);
    }
  },
  created() {
    this.filterCoupon();
  }
};
</script>

<style>
.text-online {
  color: green;
  font-size: 14px;
}
</style>
