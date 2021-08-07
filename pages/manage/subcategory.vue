<template>
  <subcategory
    :category="category"
    @addCategory="addCategory"
    @refresh="refresh"
  />
</template>

<script>
import subcategory from "@/components/manage/subcategory.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkManager", "checkChecker"],
  layout: "layoutManage",
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "ท็อปปิ้ง",
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
    const category = await context.$axios.$get("/category");

    return { category };
  },
  components: {
    subcategory
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
