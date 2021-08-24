<template>
  <v-sheet
    elevation="18"
    class="ma-auto pa-5"
    height="296mm"
    width="210mm"
    id="print"
  >
    <v-row class="justify-center align-center">
      <h2>{{ $store.getters["setting"][0].restaurant }}</h2>
    </v-row>
    <v-row class="justify-center align-center">
      <h3>รายงานยอดขายตามชนิดสินค้า</h3>
    </v-row>
    <v-row class="justify-center align-center mt-6">
      <p style="font-size:14px">
        ยอดขายวันที่ : 24 สิงหาคม 2564 08:00 น. - 24 สิงหาคม 2564 20:00 น.
      </p>
      <p style="font-size:14px" class="mx-8">จำนวน : 154</p>
      <p style="font-size:14px">รวมยอด : ฿ 10,895.00 บาท</p>
    </v-row>
    <v-row class="mx-auto">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left" width="60px">
                ลำดับ
              </th>
              <th class="text-left" width="300px">
                รายการ
              </th>
              <th class="text-left" width="100px">
                จำนวน
              </th>
              <th class="text-left" width="200px">
                ต่อหน่วย
              </th>
              <th class="text-left" width="200px">
                รวม
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in desserts" :key="item.name">
              <td>{{ i + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.total }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Eclair",
          calories: 262,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Cupcake",
          calories: 305,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Gingerbread",
          calories: 356,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Jelly bean",
          calories: 375,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Lollipop",
          calories: 392,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Honeycomb",
          calories: 408,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "Donut",
          calories: 452,
          count: "$ 30",
          total: "$30,000"
        },
        {
          name: "KitKat",
          calories: 518,
          count: "$ 30",
          total: "$30,000"
        }
      ]
    };
  }
};
</script>
<style scoped>
#print {
  margin: 0;
  font-family: "Roboto";
  text-align: justify;
  /* font-family: "Lato", sans-serif;
  font-family: "Montserrat", sans-serif;
  font-family: "Open Sans", sans-serif;
  font-family: "Raleway", sans-serif;
  font-family: "Roboto", sans-serif; */
}
</style>
