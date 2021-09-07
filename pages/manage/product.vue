<template>
  <product
    :product="product"
    :unit="unit"
    :category="category"
    :list-order="listOrder"
    @refresh="refresh"
  />
</template>

<script>
import product from "@/components/manage/product.vue";
export default {
  layout: "layoutManage",
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
    const [product, unit, category, order] = await Promise.all([
      context.$axios.$get("/product"),
      context.$axios.$get("/unit"),
      context.$axios.$get("/category"),
      context.$axios.$get("/order")
    ]);
    //const products = await context.$axios.$get("/product");
    // console.log(category);
    return { product, unit, category, order };
  },
  components: {
    product
  },
  methods: {
    async refresh() {
      this.product = await this.$axios.$get("/product");
    },
    allListProduct() {
      const list = [];
      this.order.map(o => {
        list.push(...o.list_product);
      });
      this.listOrder = list;
    }
  },
  data: () => ({
    product: [],
    listOrder: []
  }),
  created() {
    this.allListProduct();
  }
};
</script>

<style></style>
