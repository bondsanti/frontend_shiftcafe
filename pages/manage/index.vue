<template>
  <div>
    <section>
      <div class="text-center  py-6 pl-4 pr-4">
        <v-row class="md-4">
          <!-- --------------------ยอดขายวันนี้--------------------------- -->
          <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
            <v-hover v-slot="{ hover }" open-delay="300">
              <v-card color="primary" :elevation="hover ? 16 : 2">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4"></div>
                        <v-list-item-title class="headline mb-1 white--text">
                          ยอดขายวันนี้
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text"
                          >วันศุกร์ที่ 16 กรกฎาคม 2564</v-list-item-subtitle
                        >
                        <div class="mb-4"></div>
                        <v-list-item-title class="headline mb-1 white--text">
                          ฿ 5000
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-img src="wallet.png"></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
          <!-- --------------------ยอดขายวันนี้---------------------------  -->
          <!-- --------------------สัปดาห์นี้--------------------------- -->
          <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
            <v-hover v-slot="{ hover }" open-delay="300">
              <v-card color="primary" :elevation="hover ? 16 : 2">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4"></div>
                        <v-list-item-title class="headline mb-1 white--text">
                          ยอดขายสัปดาห์นี้
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text"
                          >วันจันทร์ 12/0764 -
                          อาทิต18/07/64</v-list-item-subtitle
                        >
                        <div class="mb-4"></div>
                        <v-list-item-title class="headline mb-1 white--text">
                          ฿ 8000
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-img src="wallet.png"></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
          <!-- --------------------สัปดาห์นี้---------------------------  -->
          <!-- --------------------เดือน--------------------------- -->
          <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
            <v-hover v-slot="{ hover }" open-delay="300">
              <v-card color="primary" :elevation="hover ? 16 : 2">
                <v-row>
                  <v-col cols="12" sm="8">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4"></div>
                        <v-list-item-title class="headline mb-1 white--text">
                          ยอดขายรวมเดือนนี้
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text"
                          >กรกฎาคม 2564</v-list-item-subtitle
                        >
                        <div class="mb-4"></div>
                        <v-list-item-title class="headline mb-1 white--text">
                          ฿ 72200
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-avatar size="100" class="ml-n10 mt-6" tile>
                      <v-img src="wallet.png"></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
          <!-- --------------------เดือน---------------------------  -->
        </v-row>
        <!-- จบ row1 -->

        <v-row>
          <v-col cols="12" sm="12">
            <v-card>
              <v-app-bar flat color="rgba(0,0,0,0)">
                <v-toolbar-title class="title black--text pl-0 ml-2">
                  ภาพรวมร้านค่าในวันนี้
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <!-- <v-btn color="deep-purple" class="white--text mr-2">Weekly</v-btn> -->
                <!-- <v-btn color="deep-purple lighten-4" class="deep-purple--text ">Monthly</v-btn> -->
                <div class="text-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        วันที่ 16/7/2564
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-app-bar>
              <client-only>
                <div>
                  <VueApexCharts
                    max-width="100"
                    height="350"
                    type="area"
                    :options="chartOptions"
                    :series="series"
                  ></VueApexCharts>
                </div>
              </client-only>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card>
              <v-app-bar flat >
                <v-toolbar-title class="subtitle black--text pl-0">
                  สินค้าขายดี3อันดับ - ของเดือน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <div class="text-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        กรกฎาคม 2564
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-app-bar>

              <v-app-bar flat color="rgba(0,0,0,0)">
                <v-img
                  class="rounded-lg"
                  max-height="50"
                  max-width="50"
                  src="https://images.unsplash.com/photo-1620080360587-21ad6c7b0416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80"
                ></v-img>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  ชามะนาว
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  150
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  ขวด
                </v-toolbar-title>
              </v-app-bar>
              <!-- 2 -->
              <v-app-bar flat color="rgba(0,0,0,0)" class="mt-2 mb-2">
                <v-img
                  class="rounded-lg"
                  max-height="50"
                  max-width="50"
                  src="https://images.unsplash.com/photo-1620080360587-21ad6c7b0416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80"
                ></v-img>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  ชามะนาว
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  150
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  ขวด
                </v-toolbar-title>
              </v-app-bar>
              <!-- 3 -->
              <v-app-bar flat color="rgba(0,0,0,0)" class="mt-2 mb-2">
                <v-img
                  class="rounded-lg"
                  max-height="50"
                  max-width="50"
                  src="https://images.unsplash.com/photo-1620080360587-21ad6c7b0416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80"
                ></v-img>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  ชามะนาว
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  150
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class=" black--text">
                  ขวด
                </v-toolbar-title>
              </v-app-bar>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card >
              <v-simple-table height="270px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div class="py-3"></div>
    </section>
  </div>
</template>
<script>
export default {
  components: {
    VueApexCharts: () => import("vue-apexcharts")
  },
  data: () => ({
     desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
    chartOptions: {
      chart: {
        id: "vuechart-example"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },

    series: [
      {
        name: "STOCK ABC",
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      }
    ],

    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ],
    tab: null,
    text: "center",
    fill: true,
    padding: 8,
    radius: 10,
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    width: 2,
    lineCap: "round",
    type: "trend",
    autoLineWidth: false,
    fills: false
  }),

  methods: {}
};
</script>
