<template>
  <category
    :category="category"
    @addCategory="addCategory"
    @refresh="refresh"
  />
</template>

<script>
import category from "@/components/manage/category.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkManager", "checkChecker"],
  head: {
    title: "หมวดหมูสินค้า"
  },
  async asyncData(context) {
    const category = await context.$axios.$get("/category");
   
    return { category };
  },
  components: {
    category
  },
  methods: {
    async addCategory(dataCategory) {
      await this.$axios.$post("/category", dataCategory);
      this.category = await this.$axios.$get("/category");
    },
    async refresh() {
      //console.log("refresh here");
      this.category = await this.$axios.$get("/category");
    }
  },
  data: () => ({
    category: []
  })
};
</script>

<style></style>
