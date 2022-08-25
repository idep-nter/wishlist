<template>
  <v-card color="grey" flat height="50px" tile dark>
    <v-toolbar extend>
      <NuxtLink to="/" class="links">
        <v-row>
          <v-icon class="ml-5 mr-2" medium color="#006400"> mdi-cart </v-icon>
          <v-toolbar-title class="headline font-weight-bold">{{
            title
          }}</v-toolbar-title>
        </v-row>
      </NuxtLink>
      <div class="left">
        <NuxtLink to="items/add" class="ml-8 links">
          <v-btn :small="buttonSize">Add Item</v-btn>
        </NuxtLink>
        <NuxtLink to="/items" class="links">
          <v-btn :small="buttonSize">My items</v-btn>
        </NuxtLink>
      </div>
      <v-spacer></v-spacer>

      <div class="right">
        <template v-if="loggedIn">
          <v-btn :small="buttonSize" @click="dialog = true">Logout</v-btn>
          <v-dialog v-model="dialog" max-width="320">
            <layout-the-dialog @disagree="closeDialog" @agree="logout"
              >>
              <template v-slot:text> Do you really want to logout? </template>
            </layout-the-dialog>
          </v-dialog>
        </template>

        <NuxtLink to="/auth/login" class="links" v-else>
          <v-btn :small="buttonSize">Sign in</v-btn>
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
      return this.$store.getters['auth/loggedIn'];
    },
    title() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'W';
        default:
          return 'Wishlist';
      }
    },
    buttonSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
    logout() {
      this.dialog = false;
      this.$store.dispatch('auth/logout');
      this.$router.replace('/');
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
