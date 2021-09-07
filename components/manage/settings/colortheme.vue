<template>
  <div>
    <v-card class="mx-auto rounded-xl" max-width="500" color="primary ">
      <v-card-title>
        <h5 class="text-h5 white--text">
          Color Theme

          <v-avatar class="mx-auto" size="60" max-width="90px" tile>
            <v-img src="/wallet_1.png"></v-img>
          </v-avatar>
        </h5>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="white--text text-center">
        เปลี่ยนสีของเว็บไซต์
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
        <p class="text-md-body-1 text-center">COLOR THEME</p>
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
                    <v-btn
                      :color="
                        colors.picker_primary
                          ? colors.picker_primary.hex
                          : 'primary'
                      "
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Color-primary
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      canvas-height="100"
                      v-model="colors.picker_primary"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_primary = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="primary" text @click="menu_primary = false">
                        ตกลง
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
                    <v-btn
                      :color="
                        colors.picker_info ? colors.picker_info.hex : 'info'
                      "
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Color-info
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="colors.picker_info"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_info = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="primary" text @click="menu_info = false">
                        ตกลง
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
                    <v-btn
                      :color="
                        colors.picker_secondary
                          ? colors.picker_secondary.hex
                          : 'secondary'
                      "
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Color-secondary
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="colors.picker_secondary"
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
                        @click="menu_secondary = false"
                      >
                        ตกลง
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
                    <v-btn
                      :color="
                        colors.picker_accent
                          ? colors.picker_accent.hex
                          : 'accent'
                      "
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Color-accent
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="colors.picker_accent"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_accent = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="primary" text @click="menu_accent = false">
                        ตกลง
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
                    <v-btn
                      :color="
                        colors.picker_warning
                          ? colors.picker_warning.hex
                          : 'warning'
                      "
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Color-warning
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="colors.picker_warning"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_warning = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="primary" text @click="menu_warning = false">
                        ตกลง
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
                    <v-btn
                      :color="
                        colors.picker_error ? colors.picker_error.hex : 'error'
                      "
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Color-error
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="colors.picker_error"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_error = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="primary" text @click="menu_error = false">
                        ตกลง
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
                    <v-btn
                      :color="
                        colors.picker_success
                          ? colors.picker_success.hex
                          : 'success'
                      "
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Color-success
                      <v-icon color="">mdi-select-color</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-color-picker
                      class="ma-2"
                      canvas-height="100"
                      v-model="colors.picker_success"
                      show-swatches
                    ></v-color-picker>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="menu_success = false">
                        ยกเลิก
                      </v-btn>
                      <v-btn color="primary" text @click="menu_success = false">
                        ตกลง
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
          <v-btn color="green darken-1" text @click="setThemeColor">
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
const { colors } = require("@/instant/colors.js");
export default {
  props: ["settings"],

  data() {
    return {
      colors: {
        picker_secondary: null,
        picker_primary: null,
        picker_info: null,
        picker_accent: null,
        picker_warning: null,
        picker_error: null,
        picker_success: null
      },
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
    setThemeColor() {
      //console.log(this.colors);
      this.$vuetify.theme.themes.light.success = this.colors.picker_success
        ? this.colors.picker_success.hex
        : colors.success;
      this.$vuetify.theme.themes.light.error = this.colors.picker_error
        ? this.colors.picker_error.hex
        : colors.error;
      this.$vuetify.theme.themes.light.warning = this.colors.picker_warning
        ? this.colors.picker_warning.hex
        : colors.warning;
      this.$vuetify.theme.themes.light.accent = this.colors.picker_accent
        ? this.colors.picker_accent.hex
        : colors.accent;
      this.$vuetify.theme.themes.light.primary = this.colors.picker_primary
        ? this.colors.picker_primary.hex
        : colors.primary;
      this.$vuetify.theme.themes.light.info = this.colors.picker_info
        ? this.colors.picker_info.hex
        : colors.info;
      this.$vuetify.theme.themes.light.secondary = this.colors.picker_secondary
        ? this.colors.picker_secondary.hex
        : colors.secondary;

      ///เก็บลง local storage
      localStorage.setItem(
        "primary",
        this.colors.picker_primary
          ? this.colors.picker_primary.hex
          : colors.primary
      );
      localStorage.setItem(
        "success",
        this.colors.picker_success
          ? this.colors.picker_success.hex
          : colors.success
      );
      localStorage.setItem(
        "error",
        this.colors.picker_error ? this.colors.picker_error.hex : colors.error
      );
      localStorage.setItem(
        "warning",
        this.colors.picker_warning
          ? this.colors.picker_warning.hex
          : colors.warning
      );
      localStorage.setItem(
        "accent",
        this.colors.picker_accent
          ? this.colors.picker_accent.hex
          : colors.accent
      );
      localStorage.setItem(
        "info",
        this.colors.picker_info ? this.colors.picker_info.hex : colors.info
      );
      localStorage.setItem(
        "secondary",
        this.colors.picker_secondary
          ? this.colors.picker_secondary.hex
          : colors.secondary
      );

      this.dialog = false;
      //console.log(localStorage.getItem("colors"));
    }
    // setthemecololr_success() {
    //   this.$vuetify.theme.themes.light.success = this.picker_success.hex;
    //   localStorage.setItem("success", this.$vuetify.theme.light.success());
    // },
    // setthemecololr_error() {
    //   this.$vuetify.theme.themes.light.error = this.picker_error.hex;
    // },
    // setthemecololr_warning() {
    //   this.$vuetify.theme.themes.light.warning = this.picker_warning.hex;
    // },
    // setthemecololr_accent() {
    //   this.$vuetify.theme.themes.light.accent = this.picker_accent.hex;
    // },
    // setthemecololr_primary() {
    //   this.$vuetify.theme.themes.light.primary = this.picker_primary.hex;
    //   localStorage.setItem("primary", this.picker_primary.hex);
    // },
    // setthemecololr_info() {
    //   this.$vuetify.theme.themes.light.info = this.picker_info.hex;
    // },
    // setthemecololr_secondary() {
    //   this.$vuetify.theme.themes.light.secondary = this.picker_secondary.hex;
    // }
  },
  mounted() {}
};
</script>

<style></style>
