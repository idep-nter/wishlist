<template>
  <v-row class="mt-12 ml-2">
    <v-col cols="6" md="2" class="pt-0">
      <v-card class="" max-width="" height="">
        <v-col class="">
          <h2 class="text-h6 mb-2">Filter by name</h2>
          <v-text-field
            v-model="search"
            type="text"
            append-icon="mdi-magnify"
            label="Product name"
          ></v-text-field>
        </v-col>

        <v-col>
          <h2 class="text-h6 mb-2">Filter by importance</h2>
          <v-btn-toggle v-model="importance" tile group dense shaped>
            <v-container class="pl-0">
              <v-btn class="mr-1" value="all"> All </v-btn>
              <v-btn value="true"> Important </v-btn>
              <v-btn class="mt-2" value="false"> Not important </v-btn>
            </v-container>
          </v-btn-toggle>
        </v-col>

        <v-col>
          <h2 class="text-h6 mb-2">Filter by category</h2>
          <v-chip-group
            v-model="filteredCategories"
            column
            multiple
            value="true"
          >
            <v-chip
              v-for="category in categories"
              :key="category.value"
              filter
              label
            >
              {{ category.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="8">
      <v-card max-width="1200" :height="height" class="">
        <v-layout row class="justify-center pl-5 pr-10" v-if="hasItems">
          <v-flex xs6 sm4 md3 v-for="item in filteredItems" :key="item.id">
            <user-item
              class="ms-5 my-5"
              :key="item.id"
              :id="item.id"
              :name="item.name"
              :link="item.link"
              :category="item.category"
              :price="item.price"
              :image="item.image"
              :important="item.important"
            ></user-item>
          </v-flex>
          <v-pagination
            id="pagination"
            class="mt-8"
            color="#006400"
            v-model="currentPage"
            :length="3"
          ></v-pagination>
        </v-layout>
        <v-layout row class="justify-center pl-5 pr-10" v-else>
          <v-card-text align="center">
            <p class="text-h4 text--primary center">
              No items found - please <a href="/items/add">add</a> any that you
              wish to have.
            </p>
          </v-card-text>
        </v-layout>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserItem from "~/components/items/UserItem.vue";

export default {
  components: {
    UserItem,
  },
  // middleware: 'auth',
  data() {
    return {
      items: [],
      currentPage: 1,
      search: "",
      categories: [null],
      importance: "all",
      filteredCategories: [ ...Array(this.$store.getters["items/getCategories"].length).keys(),]
    };
  },
  computed: {
    // filteredCategories() {
    //   return [ ...Array(this.$store.getters["items/getCategories"].length).keys(),]
    // },
    apiData() {
      return this.$store["auth/APIData"];
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1300;
        default:
          return 800;
      }
    },
    hasItems() {
      return this.$store.getters["items/hasItems"];
    },
    filteredItems() {
      return this.items
        .filter((item) => {
          return item.name.toLowerCase().includes(this.search.toLowerCase());
        })
        .filter((item) => {
          if (this.importance === "all") {
            return item;
          }
          return item.important.toString() == this.importance;
        })
        .filter((item) => {
          return this.filteredCategories.includes(item.category - 1);
        });
    },
  },
  created() {
    this.loadItems();
    this.loadCategories();
    console.log(this.$store.getters['auth/loggg'])
  },
  methods: {
    loadItems() {
      this.$store.dispatch("items/loadItems");
      this.items = this.$store.getters["items/getItems"]
    },
    loadCategories() {
      this.$store.dispatch("items/loadCategories");
      this.categories = this.$store.getters["items/getCategories"]
      
    },
  },
};
</script>

<style scoped>
#container {
  position: relative;
}

#pagination {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 1.5rem;
}

a {
  text-decoration: none;
  color: #006400;
}
</style>
