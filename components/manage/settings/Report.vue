<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogRe"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('closeRe')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="open">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <Print ref="print" />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { createPdfFromHtml } from "./logic.js";
import Print from "./Print.vue";
export default {
  props: ["dialogRe"],
  components: {
    Print
  },
  methods: {
    open() {
      // alert(this.$refs.print);
      createPdfFromHtml(this.$refs.print.$el);
    }
  }
};
</script>
