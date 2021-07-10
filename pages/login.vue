<template>
  <v-row
    justify="center"
    align="center"
    style="height: 100%; background-color: #1d1d1d"
  >
    <v-col cols="12">
      <template>
        <v-row>
          <v-col cols="1" sm="1" md="3" lg="4"></v-col>
          <v-col cols="10" sm="10" md="6" lg="4">
            <v-row justify="center" width="100">
              <v-img
                class="white--text align-end mb-7"
                src="logo.png"
                max-height="300"
                contain
              >
              </v-img>
            </v-row>

            <div class="mt-4">
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="USERNAME"
                  :rules="rules"
                  hide-details="auto"
                  color="secondary"
                  outlined
                  dark
                  class="mb-3"
                  append-icon="mdi-account-circle-outline"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  label="PASSWORD"
                  color="secondary"
                  :rules="rules"
                  dark
                  outlined
                  :type="!showPass ? 'password' : 'text'"
                  @click:append="showPass = !showPass"
                  append-icon="mdi-eye-off"
                  v-model="password"
                  @keypress.prevent.enter="login"
                ></v-text-field>
              </v-form>
            </div>

            <v-btn block light @click="login" :disabled="!valid"> Login </v-btn>
          </v-col>
          <v-col cols="1" sm="1" md="3" lg="4"></v-col>
        </v-row>
      </template>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="timeout" centered color="red">
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" icon @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
export default {
  layout: "login",
  middleware: "isLoggedIn",
  data() {
    return {
      showPass: false,
      rules: [value => !!value || "โปรดกรอกข้อมูลให้ครบถ้วน"],
      username: "",
      password: "",
      snackbar: false,
      timeout: 2000,
      error: null,
      valid: true
    };
  },
  methods: {
    async login() {
      this.$refs.form.validate();
      const payload = {
        data: {
          username: this.username,
          password: this.password
        }
      };

      this.$auth.loginWith("local", payload).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$router.push("/seller");
        } else {
          this.snackbar = true;
          this.error = res.data.message;
        }
      });
    }
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  created() {}
};
</script>
<style scoped>
.img-logo {
  width: 200px;
  height: 200px;
  background-size: cover;
}
</style>
