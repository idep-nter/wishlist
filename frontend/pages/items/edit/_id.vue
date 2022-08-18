<template>
    <user-item-form mode="edit" :id="this.id" @save-data="saveData"></user-item-form>
</template>


<script>
import UserItemForm from '@/components/items/UserItemForm.vue';

export default {
  components: {
    UserItemForm,
  },
  data() {
      return {
          id: this.$route.params.id,
      }
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('items/editItem', data);
      this.$router.replace('/items/' + this.id);
    }
  }
};
</script>