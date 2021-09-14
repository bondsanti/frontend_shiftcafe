<template>
  <div>
    <v-card
      class="mx-auto rounded-xl"
      max-width="500"
      color="primary"
      v-for="(settings, i) in settings"
      :key="i"
    >
      <v-card-title>
        <h5 class="text-h5 white--text">
          ตั้งค่าการจ่ายแต้ม

          <v-avatar class="mx-auto" size="60" max-width="90px" tile>
            <v-img src="/wallet_1.png"></v-img>
          </v-avatar>
        </h5>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="white--text text-center">
        {{ settings.price_buy }}(฿) - ได้ {{ settings.point }}(P)
      </v-card-text>
      <v-divider color="white" class="mx-auto"></v-divider>
      <v-card-actions>
        <v-btn
          block
          class="primary--text rounded-xl"
          color="white"
          @click="editItem(settings)"
        >
          ไปหน้าตั้งค่า
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" max-width="400">
      <v-card class=" rounded-xl">
        <v-card-title class="primary--text  justify-center ">
          ตั้งค่าอัตราการจ่ายแต้ม
          <v-icon color="shades" class="mx-2">mdi-point</v-icon>
        </v-card-title>
        <v-divider class="mx-auto"></v-divider>
        <v-card-actions class="mt-6">
          <v-row color="primary">
            <v-col cols="12">
              <v-text-field
                label="จำนวนเงิน"
                prepend-inner-icon="mdi-point-of-sale"
                solo
                color="success"
                v-model="settingitem.price_buy"
                type="number"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="จำนวนแต้ม"
                solo
                color="success"
                prepend-inner-icon="mdi-file-powerpoint-box"
                v-model="settingitem.point"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="error " text rounded x-large @click="close()">
            <v-icon aria-hidden="false" class="mx-2"> mdi-close-box </v-icon>
            ยกเลิก
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" text rounded x-large @click="save()">
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
      console.log(formdata);
      this.$axios
        .$put("/setting/" + this.settingitem._id, formdata)
        .then(res => {
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
          this.$swal({
            type: "success",
            title: res.message
          });
          this.imageURL = null;
          this.preImg = null;
        })
        .catch(e => {
          this.$swal({
            type: "error",
            title: e
          });
        });
    }
  }
};
</script>
