<template>
  <v-card class="justify-center mx-auto mt-12 formCard" max-width="500">
    <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        :counter="15"
        label="Title"
        required
      ></v-text-field>

      <v-select
        v-model="category"
        label="Category"
        item-text="name"
        :items="categories"
      ></v-select>

      <v-text-field
        v-model="price"
        :rules="priceRules"
        label="Price"
        required
      ></v-text-field>

      <v-text-field
        v-model="image"
        :rules="imageRules"
        label="Image"
      ></v-text-field>

      <v-text-field
        v-model="link"
        :rules="linkRules"
        label="Link"
        required
      ></v-text-field>

      <v-textarea
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        :counter="200"
      ></v-textarea>

      <v-checkbox v-model="important" label="Important"></v-checkbox>
      <v-container class="mt-8 justify-center d-flex buttons">
        <v-btn
          :small="buttonSize"
          :disabled="!valid"
          class="mr-4"
          @click="submitForm"
        >
          Submit
        </v-btn>

        <v-btn :small="buttonSize" @click="reset"> Reset Form </v-btn>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  emits: ['save-data', 'input-check'],
  props: ['mode', 'id'],
  data() {
    return {
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      category: '',
      categories: [],
      price: '',
      priceRules: [
        (v) => !!v || 'Price is required',
        (v) => /\b(?<!\.)\d+(?!\.)\b/.test(v) || 'Price must be a number',
      ],
      important: false,
      image: '',
      imageRules: [
        (v) =>
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(
            v
          ) || 'Must be a valid url',
      ],
      link: '',
      linkRules: [
        (v) => !!v || 'Link is required',
        (v) =>
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(
            v
          ) || 'Must be a valid url',
      ],
      description: '',
      descriptionRules: [
        (v) =>
          (v && v.length <= 200) || 'Name must be less than 200 characters',
      ],
      hasData: false,
    };
  },
  watch: {
    name(value) {
      if (this.name) {
        this.$emit('input-check', true);
      } else {
        this.$emit('input-check', false);
      }
    },
    category(value) {
      if (this.category) {
        this.$emit('input-check', true);
      } else {
        this.$emit('input-check', false);
      }
    },
    image(value) {
      if (this.image) {
        this.$emit('input-check', true);
      } else {
        this.$emit('input-check', false);
      }
    },
    price(value) {
      if (this.price) {
        this.$emit('input-check', true);
      } else {
        this.$emit('input-check', false);
      }
    },
    link(value) {
      if (this.link) {
        this.$emit('input-check', true);
      } else {
        this.$emit('input-check', false);
      }
    },
    description(value) {
      if (this.description) {
        this.$emit('input-check', true);
      } else {
        this.$emit('input-check', false);
      }
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    submitForm() {
      console.log(this.valid);
      this.validate();
      console.log(this.valid);
      if (!this.valid) {
        return;
      }
      const category = this.categories.find(
        (cat) => cat.name === this.category
      );
      const formData = {
        id: this.id,
        name: this.name,
        category: category.id,
        image: this.image,
        price: this.price,
        important: this.important,
        link: this.link,
        description: this.description,
      };
      this.$emit('save-data', formData);
    },
    loadItemData() {
      const item = this.$store.getters['items/getItemById'](this.id);
      const category = this.categories.find((cat) => cat.id == item.category);

      this.name = item.name;
      this.price = item.price;
      this.category = category.name;
      this.image = item.image;
      this.important = item.important;
      this.link = item.link;
      this.description = item.description;
    },
    async loadCategories() {
      this.$store.dispatch('items/loadCategories');
      this.categories = this.$store.getters['items/getCategories'];
    },
  },
  computed: {
    buttonSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        default:
          return false;
      }
    },
  },
  created() {
    this.loadCategories();

    if (this.mode === 'edit') {
      this.loadItemData();
    }
  },
};
</script>

<style scoped>
/* Smartphones */
@media (max-width: 767px) {
  .formCard {
    margin-top: 0px !important;
  }
  .buttons {
    padding-bottom: 50px !important;
  }
}
</style>
