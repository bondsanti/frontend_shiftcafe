<template>
  <product
    :product="product"
    :unit="unit"
    :category="category"
    @refresh="refresh"
  />
</template>

<script>
import product from "@/components/manage/product.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkChecker"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการสินค้า",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$store.getters["setting"][0].sub_title
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${this.$nuxt.context.env.config.IMG_URL}${this.$store.getters["setting"][0].logo}`
        }
      ]
    };
  },
  async asyncData(context) {
    const [product, unit, category] = await Promise.all([
      context.$axios.$get("/product"),
      context.$axios.$get("/unit"),
      context.$axios.$get("/category")
    ]);
    //const products = await context.$axios.$get("/product");
    // console.log(category);
    return { product, unit, category };
  },
  components: {
    product
  },
  methods: {
    // async addProduct(dataProduct) {
    //   await this.$axios.$post("/product", dataProduct);

    //   this.product = await this.$axios.$get("/product");
    // },
    async refresh() {
      this.product = await this.$axios.$get("/product");
    }
  },
  data: () => ({
    product: []
  })
};
</script>

<style></style>
