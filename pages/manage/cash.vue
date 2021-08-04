<template>
  <cash @addCashdraw="onSubmitted" :loadData="loadData" @refresh="refresh" />
</template>

<script>
import cash from "@/components/seller/cashdraw.vue";
export default {
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการเงินทอน",
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
  middleware: ["auth", "check", "refresh"],
  data() {
    return {
      loadData: []
    };
  },
  async asyncData(context) {
    const loadData = await context.$axios.$get("/withdraw");
    return { loadData };
  },
  components: {
    cash
  },
  methods: {
    async onSubmitted(cashdrawData) {
      await this.$axios.$post("/withdraw", cashdrawData);
      this.loadData = await this.$axios.$get("/withdraw");
    },
    async refresh() {
      this.loadData = await this.$axios.$get("/withdraw");
    }
  },
  data: () => ({
    loadData: []
  })
};
</script>
