<template>
  <v-container>
    <v-container class="mt-15 d-flex justify-center">
      <v-sheet color="#006400" height="203" width="70">
        <div class="d-flex justify-center">
          <h1><span class="mr-1">Create</span> your Wishlist!</h1>
        </div>
      </v-sheet>
    </v-container>
    <v-container class="mt-10">
      <div class="d-flex justify-center mt-16 ">
        <NuxtLink to="/auth/register" v-if="!isLogged">
          <v-btn dark large class="btn">Sign up</v-btn>
        </NuxtLink>
      </div>
    </v-container>
  </v-container>
</template>

<script>
  export default{
    computed: {
      isLogged() {
        return this.$store.getters['auth/loggedIn']
      }
    },
    
  }
</script>

<style scoped>
h1 {
  font-size: 40px;
}

.custom {
  flex-direction: column;
  justify-content: center;  
  align-items: center;    

}

span {
  padding-right: 1px;
}

.btn {
  display:inline-block;
  color: #ffffff;
}
</style>
