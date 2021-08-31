<template>
  <log :log="log" />
</template>

<script>
import log from "@/components/manage/log.vue";
export default {
  layout: "layoutManage",
  middleware: ["auth", "check", "refresh", "checkManager", "checkChecker"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการหน่วยนับสินค้า",
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
    const log = await context.$axios.$get("/log");
    // console.log(log);
    return { log };
  },
  components: {
    log
  },
  data: () => ({
    log: []
  })
};
</script>

<style></style>
