<template>
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
                      <!-- <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item> -->
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
</template>

<script>
export default {

}
</script>

<style>

</style>