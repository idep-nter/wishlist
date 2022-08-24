<template>
  <v-card class="mx-auto mt-12" :class="importantItem" max-width="800">
    <v-container>
      <v-row class="justify-center">
        <v-img
          :src="`${item.image}`"
          lazy-src="https://picsum.photos/id/11/100/60"
          max-height="300"
          class="mb-8"
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
      </v-row>
      <v-card-text>
        <p class="text-h4 text--primary">
          {{ item.name }}
        </p>
        <p>{{ item.price }} CZK</p>
        <p>
          <a :href="`${item.link}`" target="_blank">Link</a>
        </p>
        <div class="text--primary">
          {{ item.description }}
        </div>
        <v-row class="justify-center mt-12 mb-8">
          <v-btn class="mr-15" @click="editItem"> EDIT </v-btn>
          <v-btn @click="deleteItem"> DELETE </v-btn>
        </v-row>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      item: '',
      id: this.$route.params.id,
      important: true,
    };
  },
  created() {
    this.item = this.$store.getters['items/getItemById'](this.id);
  },
  computed: {
    importantItem() {
      return { important: this.important };
    },
  },
  methods: {
    deleteItem() {
      this.$store.dispatch('items/deleteItem', {
        id: this.id,
      });
      this.$router.replace('/items');
    },
    editItem() {
      this.$router.push('/items/edit/' + this.id);
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
  border-left: 50px solid transparent;
  border-right: 50px solid #006400;
  border-bottom: 50px solid transparent;
  border-top: 50px solid #006400;
  display: inline-block;
}
</style>
