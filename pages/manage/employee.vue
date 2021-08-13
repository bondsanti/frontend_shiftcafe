<template>
  <employee :employee="employee" :role="role" @refresh="refresh" />
</template>

<script>
import employee from "@/components/manage/employee.vue";
export default {
  layout: "layoutManage",
  middleware: ["auth", "check", "refresh", "checkChecker"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "จัดการพนักงาน",
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
    const [employee, role] = await Promise.all([
      context.$axios.$get("/employee"),
      context.$axios.$get("/role")
    ]);
    return { employee, role };
  },
  components: {
    employee
  },
  methods: {
    async refresh() {
      this.employee = await this.$axios.$get("/employee");
    }
  },
  data: () => ({
    employee: []
  })
};
</script>

<style></style>
