<template>
  <v-row justify="center" align="center" style="height: 100%">
    <h1 v-if="error.statusCode === 500">SERVER NOT RESPONSE</h1>
    <h1 v-else-if="error.statusCode === 404">PAGE NOT FOUND</h1>
    <h1 v-else>An error occurred</h1>
  </v-row>
</template>

<script>
export default {
  props: ["error"],
  layout: "error" // you can set a custom layout for the error page
};
</script>
