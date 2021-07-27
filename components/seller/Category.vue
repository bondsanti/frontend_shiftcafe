<template>
  <v-col cols="12" sm="6" md="4" lg="3">
    <v-card
      class="rounded-xl d-flex flex-column align-center cursor ma-1"
      elevation="0"
      color="primary"
      width="100%"
      height="80px"
      @click="changPic(cate)"
    >
      <v-img
        class="d-flex flex-row mt-1"
        contain
        max-height="40px"
        max-width="40px"
        :src="`${$nuxt.context.env.config.IMG_URL}${cate.img}`"
      ></v-img>
      <h2 class="d-flex flex-row white--text text-md-body-1">
        {{ cate.cate_name }}
      </h2>
    </v-card>
  </v-col>
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
