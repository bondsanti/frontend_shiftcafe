<template>
  <v-container style="background-color:#ededed;height:100%" fluid>
    <v-card class="mx-auto mt-6 py-3" elevaation="5" justify-centaer>
      <v-card-title>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mr-5" v-bind="attrs" v-on="on">
              <v-icon left> mdi-archive</v-icon> จัดการStock
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"
                ><v-icon left> mdi-archive </v-icon> ข้อมูลสิ้นค้า</span
              >
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      label="รายการอาหาร"
                      outlined
                      color="#1D1D1D"
                      :items="items"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="จำนวลอาหารที่พร้อมขาย"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="mt-n7">
                    <v-text-field
                      outlined
                      label="ให้แจ้งเตื่อนเมื่่อใกล้หมด"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n7">
                    <v-text-field
                      outlined
                      label="วันที่ลงข้อมูล"
                      required
                      color="#1D1D1D"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn class="ma-1" color="primary" dark @click="close">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-bag-personal-off
                </v-icon>
                ยกเลิก
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="info" @click="save">
                <v-icon aria-hidden="false" class="mx-2">
                  mdi-bag-personal
                </v-icon>
                เพิ่มข้อมูล
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาข้อมูล"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import milkShake from "@/assets/milkshake.svg";
export default {
  data() {
    return {
      search: "",
      items: ["แก้วกาแฟร้อน", "เค้ก", "อาหาร"],
      headers: [
        {
          text: "รายการอาหาร",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "จำนวลที่พร้อมขาย", value: "calories" },
        { text: "ให้แจ้งเตื่อนเมื่อใกล้หมด", value: "fat" },
        { text: "วันที่ลงข้อมูล", value: "protein" }
      ],
      desserts: [
        {
          name: "โยเกริตแช่แข็ง",
          calories: 159,
          fat: "10",

          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "แซนวิชไอศกรีม",
          calories: 237,
          fat: "10",

          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: "10",

          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "คัพเค้ก",
          calories: 305,
          fat: "10",
          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "ขนมปังปิง",
          calories: 356,
          fat: "10",
          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "เนยถั่วและเยลลี่",
          calories: 175,
          fat: "10",
          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "อมยิ้ม",
          calories: 192,
          fat: "10",

          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "รังฝึ้งสด",
          calories: 408,
          fat: "10",

          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "โดนัท",
          calories: 452,
          fat: "10",
          protein: "11/กรกฏาคม/2564"
        },
        {
          name: "คิทแคท",
          calories: 518,
          fat: "10",
          protein: "11/กรกฏาคม/2564"
        }
      ]
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  components: {
    milkShake
  }
};
</script>

<style>
.scroll::-webkit-scrollbar {
  width: 17px;
}

.scroll::-webkit-scrollbar-track {
  background: #ededed;
  border-left: 1px solid #ededed;
  border-radius: 10px;
}

.scroll::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background: black;
}
</style>
