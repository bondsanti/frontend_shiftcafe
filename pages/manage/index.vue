<template>
  <div>
  <v-app>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col
                    class="white--text text-center"
                    cols="12"
                    tag="h1"
                  >
                    <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                      class="font-weight-light"
                    >
                    ADMIN-MANAGE
                    </span>
                    <br>
                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >
                      CAFE SHIFT
                    </span>

                  </v-col>

                  <v-btn
                    class="align-self-end"
                    fab
                    outlined
                    @click="$vuetify.goTo('#about-me')"
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">@DevFong88  · LINE</h2>

          <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
      Dev Fong ให้บริการออกแบบเว็บไซต์ งานออกแบบทุกชนิด และการตลาดออนไลน์ ด้วยทีมงานมืออาชีพ
          </v-responsive>

          <v-avatar
            class="elevation-12 mb-12"
            size="128"
          >
            <v-img src="https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.6435-9/194284580_105927081715424_6331902365999543189_n.png?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeEk6y10_WRBlGVtU5mz6UVCdoatWGqKYEZ2hq1YaopgRtce95IbluSx7YdZA0q_doejpS84AdAQAyvhbhHjGKCr&_nc_ohc=UQiUA5mDWmkAX8BiKZ7&_nc_ht=scontent.fbkk5-6.fna&oh=29cc3f6e2c9aaad14ce7c3959d9baeff&oe=60F57D9B"></v-img>
          </v-avatar>

          <div></div>

          <v-btn
            color="grey"
            href="https://www.facebook.com/DevFong88"
            outlined
            large
          >
            <span class="grey--text text--darken-1 font-weight-bold">
              Dev Fong Co.,Ltd.
            </span>
          </v-btn>
        </v-container>

        <div class="py-12"></div>
      </section>


  </v-app>
 </div>
  
</template>
<script>
export default {
  setup() {
    
  },
}
</script>