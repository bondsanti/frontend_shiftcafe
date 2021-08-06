<template>
  <div class="pa-3 ma-3">
    <!-- <v-card class=" ma-2 rounded-xl" elevation="24">
      <v-breadcrumbs :items="items" divider=">" three-line></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        กลับไปหน้าหลัก
      </v-btn>
    </v-card> -->
    <v-row style="min-height: 100px;">
      <v-col class="shrink"></v-col>
      <v-breadcrumbs large :items="items" divider=">"></v-breadcrumbs>
    </v-row>

    <v-card
      color="primary"
      elevation="24"
      class="rounded-xl"
      v-for="(settings, i) in settings"
      :key="i"
    >
      <v-card-title flat class="subheading font-weight-bold  white--text">
        <v-icon class="mr-3" color="white">mdi-cog-outline</v-icon>
        ตั้งค่า
      </v-card-title>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content><h3>ชื่อร้าน:</h3></v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.head_title }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content><h3>หัวเรื่องย่อย:</h3></v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.sub_title }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content><h3>ขื่อร้านอาหาร:</h3></v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.restaurant }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content><h3>ที่อยู่:</h3></v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.address }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <h3>เบอร์โทรติดต่อ:</h3>
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.tel }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <h3>ส่วนแสดงผลที่อยู่ด้านล่างสุดของเว็บไซต์ :</h3>
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ settings.footer }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content><h3>โลโก้:</h3></v-list-item-content>
          <v-spacer></v-spacer>
          <v-card color="#ccd1d6" class="px-1 pa-3 mt-2 ">
            <v-img
              :src="`${$nuxt.context.env.config.IMG_URL}${settings.logo}`"
              class=""
              aspect-ratio="1"
              width="250px"
              height="200px"
              contain
            />
          </v-card>
          <v-spacer></v-spacer>
        </v-list-item>

        <v-list-item>
          <v-spacer></v-spacer>
          <v-list-item-content class="align-end">
            <v-btn
              text
              color="pink lighten-4"
              class="mt-3"
              @click="editItem(settings)"
            >
              <span class="primary--text">
                <v-icon>mdi-pencil</v-icon>
                แก้ไขข้อมูล
              </span>
            </v-btn>
          </v-list-item-content>
          <v-spacer></v-spacer>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- 1 -->
    <!-- add  edit -->
    <v-dialog v-model="dialog" max-width="1200px" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 mb-6">
          ตั้งค่า
        </v-card-title>

        <v-card-text>
          <div>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="ชื่อร้าน"
                  v-model="settingitem.head_title"
                  required
                  append-icon="mdi-home-city"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="หัวเรื่องย่อย"
                  v-model="settingitem.sub_title"
                  required
                  append-icon="mdi-text-subject"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="ชื่อใบเสร็จ"
                  v-model="settingitem.restaurant"
                  required
                  append-icon="mdi-receipt"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-textarea
                  rows="2"
                  label="ที่อยู่"
                  v-model="settingitem.address"
                  required
                  outlined
                  append-icon="mdi-map-marker"
                ></v-textarea>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="เบอร์โทรติดต่อ"
                  v-model="settingitem.tel"
                  required
                  append-icon="mdi-cellphone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  label="ส่วนแสดงผลที่อยู่ด้านล่างสุดของเว็บไซต์"
                  v-model="settingitem.footer"
                  required
                  append-icon="mdi-page-layout-footer"
                ></v-text-field>
              </v-col>

              <!-- รูป -->
              <v-col cols="4" sm="4" md="4"> </v-col>

              <v-col cols="12" sm="12" md="4">
                <h2><v-icon class="ma-2">mdi-flower</v-icon>โลโก้</h2>
                <v-card color="#ccd1d6" class="px-1 pa-3 mt-2 " elevation-12>
                  <v-img
                    v-if="imageURL"
                    :src="imageURL"
                    max-height="200px"
                    max-width="200px"
                    class="ma-auto pa-auto mt-auto"
                  >
                  </v-img>
                </v-card>
                <v-spacer></v-spacer>
                <input
                  accept="image/*"
                  class="mt-3"
                  type="file"
                  @change="onFileSelected"
                />
              </v-col>

              <!-- รูป -->
              <v-col cols="4" sm="4" md="4"> </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            class="ma-1"
            color="primary"
            dark
            @click="close()"
            style=" padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon>
            ยกเลิก
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            class="ma-1"
            color="info2"
            @click="save()"
            style="color: #fff;border-radius: 0.25rem; padding: 0.5rem 1rem; border: none; outline: none;"
          >
            <v-icon aria-hidden="false" class="mx-2">
              mdi-content-save
            </v-icon>
            {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 1 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "ตั้งค่า",
          disabled: false,
          href: "/manage/settings"
        },
        {
          text: "ปรับแต่ง",
          disabled: true,
          href: "Customizer"
        }
      ],
      dialog: false,
      type: null,
      imageURL: null,
      preImg: null,
      error: {
        state: false,
        msg: ""
      },
      uploadState: false,
      editedIndex: -1,
      logo: [],
      settingitem: {
        _id: "",
        head_title: "",
        sub_title: "",
        restaurant: "",
        address: "",
        tel: "",
        footer: ""
      }
    };
  },
  props: ["settings"],
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = event => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.preImg = event.target.files[0];
      //console.log(this.preImg);
    },
    getProductImage(settings) {
      if (this.settingitem.img.length > 0) {
        return this.settingitem.logo;
      } else {
        return `${$nuxt.context.env.config.IMG_URL}${settings.logo}`;
      }
    },
    editItem(settings) {
      this.type = "edit";
      this.imageURL = `${$nuxt.context.env.config.IMG_URL}${settings.logo}`;
      // this.imageURL2 = `${$nuxt.context.env.config.IMG_URL}${item.img_cover}`;
      this.settingitem = {
        _id: settings._id,
        head_title: settings.head_title,
        sub_title: settings.sub_title,
        restaurant: settings.restaurant,
        address: settings.address,
        tel: settings.tel,
        footer: settings.footer
      };
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({});
        this.$emit("refresh");
      });
    },
    save() {
      // edti
      this.loading = true;
      let formdata = new FormData();
      formdata.append("head_title", this.settingitem.head_title);
      formdata.append("sub_title", this.settingitem.sub_title);
      formdata.append("restaurant", this.settingitem.restaurant);
      formdata.append("address", this.settingitem.address);
      if (this.preImg !== null) {
        formdata.append("logo", this.preImg);
      }
      // if (this.preImg2 !== null) {
      //   formdata.append("img_cover", this.preImg2);
      // }
      console.log(formdata);
      this.$axios
        .$put("/setting/" + this.settingitem._id, formdata)
        .then(() => {
          this.$emit("refresh");
          //this.$nuxt.refresh()
          this.close();
          window.location.reload();
          this.$forceUpdate();
          this.settingitem = {
            _id: "",
            head_title: "",
            sub_title: "",
            restaurant: "",
            address: "",
            tel: "",
            footer: ""
          };
          this.imageURL = null;
          this.preImg = null;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
@media (hover: none) and (pointer: coarse) {
  .v-list-item {
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    flex-direction: column;
  }
}
</style>
