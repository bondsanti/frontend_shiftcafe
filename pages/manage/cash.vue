<template>
  <cash @addCashdraw="onSubmitted" :loadData="loadData"     @refresh="refresh" />
</template>

<script>
import cash from "@/components/manage/cash.vue";
export default {
  head: {
    title: "เงินทอน"
  },
  layout: "default",
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
