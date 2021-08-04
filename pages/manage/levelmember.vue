<template>
  <levelmember
    :levelmember="levelmember"
    @addlevelmember="addlevelmember"
    @refresh="refresh"
  />
</template>

<script>
import levelmember from "@/components/manage/levelmember.vue";
export default {
  layout: "layoutManage",
  middleware: ["auth", "check", "refresh", "checkChecker"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการระดับสมาชิก",
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
    const levelmember = await context.$axios.$get("/level-member");
    //console.log(levelmember);
    return { levelmember };
  },
  components: {
    levelmember
  },
  methods: {
    async addlevelmember(datalevelmember) {
      await this.$axios.$post("/level-member", datalevelmember);
      this.levelmember = await this.$axios.$get("/level-member");
    },
    async refresh() {
      this.levelmember = await this.$axios.$get("/level-member");
    }
  },
  data: () => ({
    levelmember: []
  })
};
</script>

<style></style>
