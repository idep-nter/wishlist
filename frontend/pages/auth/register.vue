<template>
  <user-auth-form mode="register" @save-auth="saveAuth" />
</template>

<script>
import UserAuthForm from '~/components/auth/UserAuthForm';
import { loggedGuard } from '~/helperFunctions';

export default {
  components: {
    UserAuthForm,
  },
  methods: {
    saveAuth(data) {
      this.$store.dispatch('auth/register', data);
    },
  },
  beforeRouteEnter(to, from, next) {
    loggedGuard(next);
  },
};
</script>
