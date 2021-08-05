<template>
  <levelmember :levelmember="levelmember" @refresh="refresh" />
</template>

<script>
import levelmember from "@/components/manage/levelmember.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkChecker"],
  head: {
    title: "ระดับสมาชิก"
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
    // async addlevelmember(datalevelmember) {
    //   await this.$axios.$post("/level-member", datalevelmember);
    //   this.levelmember = await this.$axios.$get("/level-member");
    // },
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
