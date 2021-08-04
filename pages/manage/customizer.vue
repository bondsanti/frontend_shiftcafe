<template>

  <Customizer :settings="settings" @refresh="refresh" />

</template>

<script>
import Customizer from "@/components/manage/settings/Customizer.vue";
export default {
    head() {
    return {
      titleTemplate: `${this.$store.getters["setting"][0].head_title}  | %s`,
      title: "ปรับแต่ง",
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
components: {
    Customizer
},
middleware: ["auth", "checkAll", "refresh", "checkChecker"],
async asyncData(context) {
    const [settings] = await Promise.all([context.$axios.$get("/setting")]);
   //console.log(settings);
    return { settings };
   
  },
  
  methods: {
    async refresh() {
      this.settings = await this.$axios.$get("/setting");
    }
  },

}
</script>

<style>

</style>