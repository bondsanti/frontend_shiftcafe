<template>
  <section class="container">
    <div>
      <span
        :class="[$vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4']"
        class="font-weight-black"
      >
        {{ $store.getters["setting"][0].head_title }}
      </span>
      <h2 class="subtitle"></h2>
      <v-btn outlined to="/">กลับไปหน้าหลัก</v-btn>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ["auth", "checkAll", "refresh"],
  head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "ยินดีต้อนรับ",
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
  created() {
    const position = this.$store.getters["position"];
    //console.log(position);
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
