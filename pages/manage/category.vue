<template>
  <category
    :category="category"
    @refresh="refresh"
  />
</template>

<script>
import category from "@/components/manage/category.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkManager", "checkChecker"],
  layout: "layoutManage",
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการหมวดหมู่",
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
    category
  },
  methods: {
    async refresh() {
      this.category = await this.$axios.$get("/category");
    }
  },
  data: () => ({
    category: []
  })
};
</script>

<style></style>
