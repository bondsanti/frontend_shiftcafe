<template>
  <div>
    <v-card class="mx-auto rounded-xl" max-width="500" color="primary ">
      <v-card-title>
        <h5 class="text-h5 white--text">
          Colortheme

          <v-avatar class="mx-auto" size="60" max-width="90px" tile>
            <v-img src="/wallet_1.png"></v-img>
          </v-avatar>
        </h5>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="white--text text-center">
        Colortheme
      </v-card-text>
      <v-divider color="white" class="mx-auto"></v-divider>
      <v-card-actions>
        <v-btn
          block
          class="primary--text rounded-xl"
          color="white"
          @click.stop="dialog = true"
        >
          ไปหน้าตั้งค่า
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" max-width="900">
      <v-card class="pa-6 rounded-xl">
        <p class="text-md-body-1 text-center">Colortheme</p>
        <div>
          <v-row>
            <!-- Color-primary -->
            <v-col cols="3">
              <div class="text-center">
                <v-menu
                  v-model="menu_primary"
                  :close-on-content-click="false"
                  :nudge-width="120"
                  offset-z
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Color-primary
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      canvas-height="100"
                      v-model="picker_primary"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_primary = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="
                          setthemecololr_primary();
                          menu_primary = false;
                        "
                      >
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <!--Color-primary  -->
            <!-- Color-info -->
            <v-col cols="3">
              <div class="text-center">
                <v-menu
                  v-model="menu_info"
                  :close-on-content-click="false"
                  :nudge-width="120"
                  offset-z
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="info" dark v-bind="attrs" v-on="on">
                      Color-info
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="picker_info"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_info = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="
                          setthemecololr_info();
                          menu_info = false;
                        "
                      >
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <!-- Color-info -->
            <!--   Color-secondary -->
            <v-col cols="3">
              <div class="text-center">
                <v-menu
                  v-model="menu_secondary"
                  :close-on-content-click="false"
                  :nudge-width="120"
                  offset-z
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="secondary" dark v-bind="attrs" v-on="on">
                      Color-secondary
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="picker_secondary"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_secondary = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="
                          setthemecololr_secondary();
                          menu_secondary = false;
                        "
                      >
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <!--   Color-secondary -->
            <!--   Color-accent -->
            <v-col cols="3">
              <div class="text-center">
                <v-menu
                  v-model="menu_accent"
                  :close-on-content-click="false"
                  :nudge-width="120"
                  offset-z
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="accent" dark v-bind="attrs" v-on="on">
                      Color-accent
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="picker_accent"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_accent = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="
                          setthemecololr_accent();
                          menu_accent = false;
                        "
                      >
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <!--   Color-accent -->
          </v-row>
          <v-row>
            <!--   Color-warning -->
            <v-col cols="3">
              <div class="text-center">
                <v-menu
                  v-model="menu_warning"
                  :close-on-content-click="false"
                  :nudge-width="120"
                  offset-z
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="warning" dark v-bind="attrs" v-on="on">
                      Color-warning
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="picker_warning"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_warning = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="
                          setthemecololr_warning();
                          menu_warning = false;
                        "
                      >
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <!--   Color-warning -->
            <!--   Color-error-->
            <v-col cols="3">
              <div class="text-center">
                <v-menu
                  v-model="menu_error"
                  :close-on-content-click="false"
                  :nudge-width="120"
                  offset-z
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="error" dark v-bind="attrs" v-on="on">
                      Color-error
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="picker_error"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_error = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="
                          setthemecololr_warning();
                          menu_error = false;
                        "
                      >
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <!--   Color-error -->
            <!--   Color-error-->
            <v-col cols="3">
              <div class="text-center">
                <v-menu
                  v-model="menu_success"
                  :close-on-content-click="false"
                  :nudge-width="120"
                  offset-z
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="success" dark v-bind="attrs" v-on="on">
                      Color-success
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="picker_success"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_success = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="
                          setthemecololr_warning();
                          menu_success = false;
                        "
                      >
                        บันทึก
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <!--   Color-error -->
          </v-row>
        </div>
        <v-card-actions class="mt-6">
          <v-btn color="error darken-1" text @click="dialog = false">
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon>
            ยกเลิก
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            <v-icon aria-hidden="false" class="mx-2">
              mdi-content-save
            </v-icon>
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["settings"],

  data() {
    return {
      picker_secondary: null,
      picker_primary: null,
      picker_info: null,
      picker_accent: null,
      picker_warning: null,
      picker_error: null,
      picker_success: null,
      //
      dialog: false,
      //
      menu_info: false,
      menu_primary: false,
      menu_secondary: false,
      menu_accent: false,
      menu_warning: false,
      menu_error: false,
      menu_success: false
    };
  },
  methods: {
    setthemecololr_success() {
      this.$vuetify.theme.themes.light.success = this.picker_success.hex;
      localStorage.setItem("success", this.$vuetify.theme.light.success());
    },
    setthemecololr_error() {
      this.$vuetify.theme.themes.light.error = this.picker_error.hex;
    },
    setthemecololr_warning() {
      this.$vuetify.theme.themes.light.warning = this.picker_warning.hex;
    },
    setthemecololr_accent() {
      this.$vuetify.theme.themes.light.accent = this.picker_accent.hex;
    },
    setthemecololr_primary() {
      this.$vuetify.theme.themes.light.primary = this.picker_primary.hex;
      localStorage.setItem("primary", this.picker_primary.hex);
    },
    setthemecololr_info() {
      this.$vuetify.theme.themes.light.info = this.picker_info.hex;
    },
    setthemecololr_secondary() {
      this.$vuetify.theme.themes.light.secondary = this.picker_secondary.hex;
    }
  },
  mounted() {
    const theme = localStorage.getItem("primary");
    //console.log(theme);
    //this.$vuetify.theme.themes.light.primary = theme;
    // if (theme) {
    //   if (theme == "true") {
    //     this.$vuetify.theme.light = true;
    //   } else {
    //     this.$vuetify.theme.dark = false;
    //   }
    // }
  }
};
</script>

<style></style>
