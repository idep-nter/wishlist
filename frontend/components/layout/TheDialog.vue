<template>
  <v-card>
    <v-card-title class="text-h6">
      <slot name="text"></slot>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn color="#006400" text @click="$emit('disagree')">
          Disagree
        </v-btn>
        <v-btn color="#006400" text @click="$emit('agree')"> Agree </v-btn>
    </v-card-actions>
  </v-card>
</template>
