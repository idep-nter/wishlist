<template>
  <div>
    <item-form mode="add" @save-data="saveData" @input-check="inputCheck" />
    <v-dialog v-model="dialog" max-width="320">
      <layout-the-dialog @disagree="closeDialog" @agree="discardChanges"
        >>
        <template v-slot:text>
          Do you really want to leave? You have unsaved changes!
        </template>
      </layout-the-dialog>
    </v-dialog>
  </div>
</template>

<script>
import ItemForm from '~/components/items/UserItemForm';
import { notLoggedGuard } from '~/helperFunctions';

export default {
  components: {
    ItemForm,
  },
  data() {
    return {
      dialog: false,
      to: null,
      hasData: false,
      added: false,
    };
  },
  methods: {
    inputCheck(data) {
      this.hasData = data;
    },
    saveData(data) {
      this.$store.dispatch('items/addItem', data);
      this.added = true;
    },
    discardChanges() {
      this.dialog = false;
      this.$router.push(this.to);
    },
    closeDialog() {
      this.dialog = false;
      this.to = null;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.to || !this.hasData || this.added) {
      next();
    } else {
      this.dialog = true;
      this.to = to;
      console.log(this.to);
    }
  },
  beforeRouteEnter(to, undefined, next) {
    notLoggedGuard(next);
  },
};
</script>
