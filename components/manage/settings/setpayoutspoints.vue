<template>
  <div>
    
        <v-card class="mx-auto" max-width="500" color="primary"  v-for="(settings, i) in settings" :key="i">
          <v-card-title>
            <h5 class="text-h5 white--text">
               ตั้งค่าการจ่ายแต้ม
              <v-avatar class="mx-auto" size="60" max-width="90px" tile>
                <v-img src="/wallet.gif"></v-img>
              </v-avatar>
            </h5>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text  class="white--text text-center">
            {{ settings.price_buy }}(฿) - ได้ {{ settings.point }}(P)
          </v-card-text>
          <v-divider color="white" class="mx-auto"></v-divider>
          <v-card-actions>
            <v-btn
              block
              class="primary--text"
              color="white"
               @click="editItem(settings)"
            >
              ไปหน้าตั้งค่า
            </v-btn>
          </v-card-actions>
        </v-card>
    
    <!-- <v-card
      class="pa-1 rounded-lg"
      color="primary"
      dark
      v-for="(settings, i) in settings"
      :key="i"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h5">
            ตั้งค่าจ่ายแต้ม
          </v-card-title>

          <v-card-subtitle>
            
              {{ settings.price_buy }}(฿) - ได้ {{ settings.point }}(P)
           
          </v-card-subtitle>

          <v-card-actions>
            <v-btn outlined roundedtext @click="editItem(settings)">
              ไปหน้าตั้งค่า
            </v-btn>
          </v-card-actions>
        </div>
        <v-avatar class="mx-auto mt-7" size="90" max-width="190px" tile>
          <v-img src="/wallet.gif"></v-img>
        </v-avatar>
      </div>
    </v-card> -->

    <v-dialog v-model="dialog" max-width="550">
      <v-card class="pa-6">
        <v-card-title class="text-h5">
          ตั้งค่าอัตราการจ่ายแต้ม
          {{ type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล" }}
        </v-card-title>
        <div>
          <v-row>
            <v-col cols="4">
              <v-subheader>จำนวลเงิน</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="บาท"
                outlined
                v-model="settingitem.price_buy"
                prefix="฿"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-subheader>จำนวลแต้ม</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="แต้ม"
                outlined
                v-model="settingitem.point"
                prefix="P"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <v-card-actions>
          <v-btn color="error darken-1" text @click="close()">
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon>
            ยกเลิก
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="save()">
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
      dialog: false,
      type: null,
      editedIndex: -1,
      settingitem: {
        _id: "",
        price_buy: "",
        point: ""
      }
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editItem(settings) {
      this.type = "edit";

      this.settingitem = {
        _id: settings._id,
        price_buy: settings.price_buy,
        point: settings.point
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
      formdata.append("price_buy", this.settingitem.price_buy);
      formdata.append("point", this.settingitem.point);

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

<style></style>
