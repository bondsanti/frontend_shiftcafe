<template>
  <pointmanage
    :pointmanage="pointmanage"
    :customers="customers"
    @refreshPoint="refreshPoint"
  />
</template>

<script>
import pointmanage from "@/components/manage/pointmanage.vue";
export default {
  layout: "layoutManage",
  middleware: ["auth", "check", "refresh", "checkChecker"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการพอยท์ลูกค้า",
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
    const pointmanage = await context.$axios.$get("/point-manage");
    const customers = await context.$axios.$get("/customer2");
    //console.log(pointmanage);
    return { pointmanage, customers };
  },
  components: {
    pointmanage
  },
  methods: {
    async refreshPoint() {
      this.pointmanage = await this.$axios.$get("/point-manage");
    }
  },
  data: () => ({
    pointmanage: []
  })
};
</script>

<style></style>
