<template>
  <v-row class="md-4">
    <!-- --------------------ยอดขายวันนี้--------------------------- -->
    <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card
          class="pa-1 rounded-lg"
          color="primary"
          :elevation="hover ? 16 : 2"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                ยอดขายวันนี้
              </v-card-title>
              <v-card-subtitle> จะมาในอีกอนาคต.</v-card-subtitle>
              <v-card-actions>
                <v-list-item-title class="headline mb-1 white--text">
                  ฿ 5,000
                </v-list-item-title>
              </v-card-actions>
            </div>
            <v-avatar class="mx-auto mt-7" size="105" max-width="90px" tile>
              <v-img src="/wallet.gif"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-hover>
    </v-col>
    <!-- --------------------ยอดขายวันนี้---------------------------  -->

    <!-- --------------------สัปดาห์นี้--------------------------- -->
    <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card
          class="pa-1 rounded-lg"
          color="primary"
          :elevation="hover ? 16 : 2"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                ยอดขายสัปดาห์นี้
              </v-card-title>
              <v-card-subtitle>
                วันจันทร์ 12/0764 - อาทิต18/07/64</v-card-subtitle
              >
              <v-card-actions>
                <v-list-item-title class="headline mb-1 white--text">
                  ฿ 38,000
                </v-list-item-title>
              </v-card-actions>
            </div>
            <v-avatar class="mx-auto mt-7" size="105" max-width="90px" tile>
              <v-img src="/wallet.gif"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-hover>
    </v-col>
    <!-- --------------------สัปดาห์นี้---------------------------  -->
    <!-- --------------------เดือน--------------------------- -->
    <v-col cols="12" xs="12" sm="12" md="4" class="py-6">
      <v-hover v-slot="{ hover }" open-delay="300">
        <v-card
          class="pa-1 rounded-lg"
          color="primary"
          :elevation="hover ? 16 : 2"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5">
                ยอดขายรวมเดือนนี้
              </v-card-title>
              <v-card-subtitle> กรกฎาคม 2564</v-card-subtitle>
              <v-card-actions>
                <v-list-item-title class="headline mb-1 white--text">
                  ฿ 172,200
                </v-list-item-title>
              </v-card-actions>
            </div>
            <v-avatar class="mx-auto mt-7" size="105" max-width="90px" tile>
              <v-img src="/wallet.gif"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-hover>
    </v-col>
    <!-- --------------------เดือน---------------------------  -->
  </v-row>
  <!-- จบ row1 -->
</template>

<script>
export default {};
</script>

<style></style>
