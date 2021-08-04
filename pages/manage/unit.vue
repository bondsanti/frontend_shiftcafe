<template>
  <unit :unit="unit" @addUnit="addUnit" />
</template>

<script>
import unit from "@/components/manage/unit.vue";
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
