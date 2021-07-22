<template>
  <unit :unit="unit" @addUnit="addUnit" />
</template>

<script>
import unit from "@/components/manage/unit.vue";
export default {
  middleware: ["auth", "check", "refresh", "checkManager"],
  head: {
    title: "จัดการหน่วยนับ"
  },
  async asyncData(context) {
    const unit = await context.$axios.$get("/unit");
    //console.log(unit);
    return { unit };
  },
  components: {
    unit
  },
  methods: {
    async addUnit(dataUnit) {
      await this.$axios.$post("/unit", dataUnit);
      this.unit = await this.$axios.$get("/unit");
    }
  },
  data: () => ({
    unit: []
  })
};
</script>

<style></style>
