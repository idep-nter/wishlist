<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="mx-auto"
        :class="importantItem"
        @click="itemDetail"
        height="200px"
      >
        <v-img
          :src="`${image}`"
          height="100px"
          lazy-src="https://picsum.photos/id/11/100/60"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-text>
          <p :class="textSize">
            {{ name }}
          </p>
          <p>{{ price }} CZK</p>
        </v-card-text>

        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="#006400">
            <v-btn>See more info</v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: ['id', 'name', 'important', 'price', 'image', 'description'],
  data() {
    return {
      overlay: false,
    };
  },
  computed: {
    itemUrl() {
      return this.$route.path + '/items/' + this.id;
    },
    importantItem() {
      return { important: this.important };
    },
    textSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xl':
          return 'text-h5 text--primary';
        default:
          return 'text-h7 text--primary';
      }
    },
  },
  methods: {
    itemDetail() {
      this.$router.push({ path: `/items/${this.id}` });
    },
  },
};
</script>

<style scoped>
.important::after {
  content: '';
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  border-left: 20px solid transparent;
  border-right: 20px solid #006400;
  border-bottom: 20px solid transparent;
  border-top: 20px solid #006400;
  display: inline-block;
}
</style>
