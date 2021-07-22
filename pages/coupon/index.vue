<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile :loadData="loadData" />
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
              v-for="(rows, dealers) in visiblePages"
              :key="dealers"
              sm="12"
              md="4"
              cols="12"
              class="mt-n2"
            >
              <v-card class="rounded-xl">
                <v-img height="100%" src="COUPON.png" elevation="5">
                  <v-row align="end">
                    <v-col align-self="start" class="pa-6" cols="4"> </v-col>
                    <v-col align-self="start" class="pa-5 mt-10 " cols="8">
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
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
  middleware: ["auth"],
  data() {
    return {
      search: "",
      currentPage: 1,
      perPage: 6,
      dealers: [
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        },
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        },
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        },
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        },
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        },
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        },
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        },
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        },
        {
          name: "โคตรรวย",
          url: "/members/history_buy_detail",
          datedue: "16/2/64",
          dateorder: "+10 พอยท์"
        }
      ]
    };
  },
  computed: {
    visiblePages() {
      if (this.search) {
        return this.dealers.filter(rows => {
          return rows.name.toLowerCase().includes(this.search.toLowerCase());
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
    console.log(loadData);
    //console.log(context.$auth.user);
    return { loadData };
  },
  components: {
    MenuProfile
  }
};
</script>

<style>
.text-online {
  color: green;
  font-size: 14px;
}
</style>
