<template>
    <item-form mode="add" @save-data="saveData" />
</template>


<script>
import ItemForm from '~/components/items/UserItemForm'

export default {
  components: {
    ItemForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('items/addItem', data);
      this.$router.replace('/');
    }
  }
};
</script>