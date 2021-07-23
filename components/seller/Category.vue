<template>
  <v-card
    class="rounded-xl d-flex flex-column align-center   cursor ma-1"
    elevation="0"
    color="primary"
    width="200px"
    height="80px"
    @click="changPic(cate)"
  >
    <v-img
      class="d-flex flex-row mt-1"
      contain
      max-height="40px"
      max-width="40px"
      :src="`https://api.shift-cafe.com/${cate.img}`"
    ></v-img>
    <h2 class="d-flex flex-row white--text">{{ cate.cate_name }}</h2>
  </v-card>
</template>
<script>
export default {
  methods: {
    changPic() {
      this.$emit("changPic", this.cate);
    }
  },
  props: {
    cate: {
      type: Object
    }
  }
};
</script>
