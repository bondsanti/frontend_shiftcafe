<template>
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
                          ฿ 5,000
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                      <v-img
                    src="wallet.gif"
                    class="mx-auto mt-5"
                    max-width="90px"
                  ></v-img>
                         <v-list-item-title>
                         
                        </v-list-item-title>
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
                          ฿ 38,000
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-img
                    src="wallet.gif"
                    class="mx-auto mt-5"
                    max-width="90px"
                  ></v-img>
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
                          ฿ 172,200
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="4">
                       <v-img
                    src="wallet.gif"
                    class="mx-auto mt-5"
                    max-width="90px"
                  ></v-img>>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
          <!-- --------------------เดือน---------------------------  -->
        </v-row>
        <!-- จบ row1 -->
</template>

<script>
export default {

}
</script>

<style>

</style>