<template>
  <div>
    <item-form mode="add" @save-data="saveData" @input-check="inputCheck" />
    <v-dialog v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="text-h6">
          Do you really want to leave? You have unsaved changes!
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#006400" text @click="closeDialog()"> Disagree </v-btn>
          <v-btn
            color="#006400"
            text
            @click="
              discardChanges();
            "
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ItemForm from "~/components/items/UserItemForm";
import {notLoggedGuard } from "~/helperFunctions";

export default {
  components: {
    ItemForm,
  },
  data() {
    return {
      dialog: false,
      to: null,
      hasData: false
    };
  },
  methods: {
    inputCheck(data) {
      this.hasData = data
    },
    saveData(data) {
      this.$store.dispatch("items/addItem", data);
      this.$router.replace("/");
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
    if (this.to || !this.hasData) {
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
