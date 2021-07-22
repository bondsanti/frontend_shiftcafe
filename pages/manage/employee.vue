<template>
  <employee :employee="employee" :role="role" @addEmployee="addEmployee" />
</template>

<script>
import employee from "@/components/manage/employee.vue";
export default {
  middleware: ["auth", "check", "refresh"],
  head: {
    title: "จัดการพนักงาน"
  },
  async asyncData(context) {
    const [employee, role] = await Promise.all([
      context.$axios.$get("/employee"),
      context.$axios.$get("/role")
    ]);
    //const products = await context.$axios.$get("/product");
    // console.log(employee);
    return { employee, role };
  },
  components: {
    employee
  },
  methods: {
    async addEmployee(dataEmployee) {
      await this.$axios.$post("/employee", dataEmployee);
      this.employee = await this.$axios.$get("/employee");
    },
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
