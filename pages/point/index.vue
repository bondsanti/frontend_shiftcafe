<template>
   <div class="my-5">
    <v-card class="py-5 px-5" color="grey darken-3">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile />
        </v-col>
        <v-col xs="12" sm="12" md="9" class="">
          <h2 class="text-left white--text mb-2">ประวัติการได้พอยท์</h2>
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
              <v-card class="mx-auto">
                <v-card-title>
                  <span class="mt-n2"
                    >Order ID <font class="red_fix--text">11001441</font>

                  
                  </span>
                </v-card-title>
                <v-row :align="align" no-gutters class="mt-n5">
                  <v-col class="text-caption">
                    <v-card class="pa-2" outlined tile color="red lighten-4">
                      วันที่ซื้อ
                      <font class="red_fix--text">{{ rows.datedue }}</font>
                    </v-card>
                  </v-col>

                  <v-col class="text-caption">
                    <v-card class="pa-2" outlined tile color="red lighten-4">
                      พอยท์ที่ได้
                      <font class="red_fix--text">{{ rows.dateorder }}</font>
                    </v-card>
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-list-item class="grow ml-n3">
                    <v-list-item-avatar
                      color=""
                      v-if="$vuetify.breakpoint.smAndUp"
                    >
                      <v-img
                        class="elevation-6"
                        alt=""
                      
                      ></v-img>
                    </v-list-item-avatar>

                    <v-row justify="end">
                      <v-btn outlined  color="red_fix" text :to="rows.url">
                        ดูรายละเอียด
                      </v-btn>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <div class="text-center">
            <v-pagination
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
import MenuProfile from '~/components/memberLayout/MenuProfile'
export default {
 layout:"layoutMember",
  data() {
    return {
      search: '',
      currentPage: 1,
      perPage: 6,
      dealers: [
        {
          name: 'โคตรรวย',
          url: '/members/history_buy_detail',
          datedue: '16/2/64',
          dateorder: '+10 พอยท์',
        },
      ],
    }
  },
  computed: {
    visiblePages() {
      if (this.search) {
        return this.dealers.filter((rows) => {
          return rows.name.toLowerCase().includes(this.search.toLowerCase())
        })
      } else {
        return this.dealers.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        ) //แบ่งหน้า
        //return this.dealers;
      }
    },
  },
  components: {
    MenuProfile,
  },
}
</script>

<style>
.text-online {
  color: green;
  font-size: 14px;
}
</style>