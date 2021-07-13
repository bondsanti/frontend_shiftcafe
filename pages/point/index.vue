<template>
  <div class="" style="height: 100%">
    <v-card class="py-5 px-5" style="height: 100%;" color="secondary">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3">
          <MenuProfile />
        </v-col>

        <v-col xs="12" sm="12" md="9" class="">
          <v-card class="px-6 py-5 mb-5">
            <div class="text-center">
              <h2 class="">รายการประวัติพอยท์ของฉัน</h2>
              <v-divider class="mt-3 mb-2"></v-divider>
            </div>
            <v-data-table
              :headers="headers"
              :items="pointItems"
              :items-per-page="10"
              class="mb-n5"
            ></v-data-table>
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
  data() {
    return {
      headers: [
        {
          text: "id",
          align: "start",
          sortable: false,
          value: "orderid"
        },
        { text: "รายการ", value: "name" },
        { text: "วันที่", value: "datetime" },
        { text: "จำนวน", value: "point" },
        { text: "คงเหลือ", value: "pointTotal" }
      ],
      pointItems: [
        {
          orderid: "214001",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 20,
          datetime: "13/7/2564 13:00"
        },
        {
          orderid: "214041",
          name: "ชาเขียว",
          point: 10,
          pointTotal: 30,
          datetime: "25/7/2564 17:00"
        },
        {
          orderid: "215001",
          name: "ช้าวผัด",
          point: 15,
          pointTotal: 40,
          datetime: "1/8/2564 11:35"
        },
        {
          orderid: "215010",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 50,
          datetime: "11/8/2564 13:00"
        },
        {
          orderid: "215055",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 60,
          datetime: "19/8/2564 13:00"
        },
        {
          orderid: "215055",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 70,
          datetime: "19/8/2564 13:00"
        },
        {
          orderid: "215055",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 80,
          datetime: "19/8/2564 13:00"
        },
        {
          orderid: "215055",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 90,
          datetime: "19/8/2564 13:00"
        },
        {
          orderid: "215055",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 80,
          datetime: "19/8/2564 13:00"
        },
        {
          orderid: "215055",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 90,
          datetime: "19/8/2564 13:00"
        },
        {
          orderid: "215055",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 80,
          datetime: "19/8/2564 13:00"
        },
        {
          orderid: "215055",
          name: "อเมริการโน",
          point: 10,
          pointTotal: 90,
          datetime: "19/8/2564 13:00"
        }
      ]
    };
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
