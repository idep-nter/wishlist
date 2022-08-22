<template>
  <v-card color="grey" flat height="50px" tile dark>
    <v-toolbar extend>
      <NuxtLink to="/" class="links">
        <v-row>
          <v-icon class="ml-5 mr-2" medium color="#006400"> mdi-cart </v-icon>
          <v-toolbar-title class="headline font-weight-bold"
            >WISHLIST</v-toolbar-title
          >
        </v-row>
      </NuxtLink>
      <div class="right">
        <NuxtLink to='items/add' class="ml-8 links">
          <v-btn>Add Item</v-btn>
        </NuxtLink>
        <NuxtLink to='/items' class="links">
          <v-btn>My items</v-btn>
        </NuxtLink>
      </div>
      <v-spacer></v-spacer>

      <div class="left">
        <template v-if="loggedIn">
          <v-row justify="center">
            <v-dialog v-model="dialog" max-width="320">
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark v-bind="attrs" v-on="on" class="mr-3">
                  Logout
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h6">
                  Do you really want to logout?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#006400" text @click="dialog = false">
                    Disagree
                  </v-btn>
                  <v-btn
                    color="#006400"
                    text
                    @click="
                      dialog = false;
                      logout();
                    "
                  >
                    Agree
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>

        <NuxtLink to="/auth/login" class="links" v-else>
          <v-btn>Sign in</v-btn>
        </NuxtLink>
      </div>
    </v-toolbar>
  </v-card>
</template>

<style scoped>
.links {
  text-decoration: none;
  color: #ffffff;
}
</style>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/");
    },
    // redirect(page) {
    //   return this.loggedIn
    //     ? page
    //     : { path: "/auth/login", query: { warn: true } };
    // },
  },
};
</script>
