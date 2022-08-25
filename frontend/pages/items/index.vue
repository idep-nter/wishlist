<template>
  <v-row class="mt-12 mainRow">
    <v-col md="3" sm="4" class>
      <v-card class="pa-2 filterCard">
        <v-col class="">
          <h2 class="text-h6 mb-2">Filter by name</h2>
          <v-text-field
            v-model="search"
            type="text"
            prepend-icon="mdi-magnify"
            label="Product name"
            :style="inputSize"
          ></v-text-field>
        </v-col>

        <v-col class="">
          <h2 class="text-h6 mb-2">Filter by price</h2>
          <v-text-field
            v-model="minPrice"
            type="text"
            prepend-icon="mdi-currency-usd"
            label="Min price"
            :style="inputSize"
          ></v-text-field>
          <v-text-field
            v-model="maxPrice"
            type="text"
            prepend-icon="mdi-currency-usd"
            label="Max price"
            :style="inputSize"
          ></v-text-field>
        </v-col>

        <v-col>
          <h2 class="text-h6 mb-2">Filter by importance</h2>
          <v-btn-toggle v-model="importance" tile group dense shaped>
            <v-container class="pl-0">
              <v-btn :small="buttonSize" class="mr-1" value="all"> All </v-btn>
              <v-btn :small="buttonSize" class="mr-1" value="true">
                Important
              </v-btn>
              <v-btn :small="buttonSize" value="false"> Not important </v-btn>
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
              :small="buttonSize"
            >
              {{ category.name }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-card>
    </v-col>

    <v-col md="6" sm="7">
      <v-card max-width="1200" height="800" class="pa-2 itemCard">
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
            :length="pageCount"
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
import UserItem from '~/components/items/UserItem.vue';
import { notLoggedGuard, range } from '~/helperFunctions';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      search: '',
      categories: [],
      importance: 'all',
      filteredCategories: [],
      pageCount: null,
      minPrice: null,
      maxPrice: null,
    };
  },
  watch: {
    currentPage(value) {
      this.loadItems(value);
    },
    filteredCategories(value) {
      console.log(this.filteredCategories);
      // const x = this.keyArray()
      // console.log(this.items)
      console.log(this.categories);
    },
  },
  computed: {
    getMax() {
      if (this.maxPrice === null || this.maxPrice === '') {
        return 9999999999;
      } else {
        return this.maxPrice;
      }
    },
    getMin() {
      if (this.minPrice === null || this.minPrice === '') {
        return 0;
      } else {
        return this.minPrice;
      }
    },
    apiData() {
      return this.$store['auth/APIData'];
    },
    hasItems() {
      return this.$store.getters['items/hasItems'];
    },
    filteredItems() {
      return (
        this.items
          .filter((item) => {
            return item.name.toLowerCase().includes(this.search.toLowerCase());
          })
          .filter((item) => {
            if (this.importance === 'all') {
              return item;
            }
            return item.important.toString() == this.importance;
          })
          // .filter((item) => {
          //   return this.filteredCategories.includes(item.category);
          // })
          .filter((item) => {
            return item.price >= this.getMin && item.price <= this.getMax;
          })
      );
    },
    buttonSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        default:
          return false;
      }
    },
    inputSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return "max-width: 300px"
        default:
          return "max-width: 350px"
      }
    },
  },
  created() {
    this.loadItems(this.currentPage);
    this.loadCategories();
    this.loadFilteredCategories();
    this.loadPageCount();
  },
  methods: {
    async loadItems(data) {
      this.$store.dispatch('items/loadItems', data);
      this.items = this.$store.getters['items/getItems'];
    },
    loadCategories() {
      this.$store.dispatch('items/loadCategories');
      this.categories = this.$store.getters['items/getCategories'];
      // this.filteredCategories = this.$store.getters['items/getCategories'];
    },
    async loadFilteredCategories() {
      this.filteredCategories = [
        ...Array(this.$store.getters['items/getCategories'].length).keys(),
      ];
    },
    loadPageCount() {
      this.pageCount = Math.ceil(this.$store.getters['items/getCount'] / 12);
    },
    keyArray() {
      const indexes = range(0, this.categories.length - 1);
      return indexes;
    },
  },
  beforeRouteEnter(to, from, next) {
    notLoggedGuard(next);
  },
};
</script>

<style scoped>
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

/* Smartphones */
@media (max-width: 767px) {
  .itemCard {
    height: 1300px !important;
  }
  .mainRow {
    margin-top: 0px !important;
  }
}

/* Tablets */
@media (min-width: 768px) and (max-width: 991px) {
  .mainRow {
    justify-content: center;
  }
}

/* Desktop */
@media (min-width: 992px) {
  .filterCard {
    margin-left: 25px;
  }
}
</style>
