<template>
  <div>
    <user-item-form
      mode="edit"
      :id="this.id"
      @save-data="saveData"
    ></user-item-form>
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="text-h6">
          Do you really want to leave? You have unsaved changes!
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#006400" text @click="closeDialog()"> Disagree </v-btn>
          <v-btn color="#006400" text @click="discardChanges()"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserItemForm from "@/components/items/UserItemForm.vue";
import { notLoggedGuard } from "~/helperFunctions";

export default {
  components: {
    UserItemForm,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("items/editItem", data);
      this.$router.replace("/items/" + this.id);
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
    if (this.to) {
      next();
    } else {
      this.dialog = true;
      this.to = to;
    }
  },
  beforeRouteEnter(to, undefined, next) {
    notLoggedGuard(next);
  },
};
</script>
