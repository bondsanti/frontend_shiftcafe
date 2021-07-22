<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        test
      </h1>
      <h2 class="subtitle">
        My premium Nuxt.js project
      </h2>
      <div class="links">
        <v-btn>Documentation</v-btn>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
          >GitHub</a
        >
      </div>
    </div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  middleware: ["auth", "checkAll"],
  components: {
    Logo
  },
  created() {
    const position = this.$store.getters["position"];
    console.log(position);
    if (
      position === "admin" ||
      position === "manager" ||
      position === "checker"
    ) {
      this.$router.push("/manage");
    } else if (position === "staff" || position === "cashier") {
      this.$router.push("/seller");
    } else {
      this.$router.push("/member");
    }

    //this.$router.push("/");
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
