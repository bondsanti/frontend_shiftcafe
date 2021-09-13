<template>
  <bank :bank="bank" @refresh="refresh" />
</template>

<script>
import bank from "@/components/manage/settings/bank.vue";
export default {
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการธนาคาร",
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
  layout: "layoutManage",
  middleware: ["auth", "checkAll", "refresh", "checkChecker"],
  async asyncData(context) {
    const [bank] = await Promise.all([context.$axios.$get("/bank")]);
    return { bank };
  },
  components: {
    bank
  },

  methods: {
    async refresh() {
      this.bank = await this.$axios.$get("/bank");
    }
  },
  data: () => ({
    //stock: []
  })
};
</script>

<style></style>
