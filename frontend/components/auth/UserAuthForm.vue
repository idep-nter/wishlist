<template>
  <v-container>
    <v-alert
      dense
      outlined
      type="error"
      v-if="errorMessage"
      class="justify-center mx-auto mt-15 logAlert"
      max-width="500"
    >
      {{ errorMessage }}
    </v-alert>
    <v-card class="justify-center mx-auto mt-12 formCard" max-width="500">
      <v-form ref="form" v-model="valid" lazy-validation class="pa-sm-4">
        <v-text-field
          v-model="username"
          :rules="usrModeRules"
          :counter="showCounter"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          v-if="this.mode === 'register'"
        ></v-text-field>

        <v-text-field
          autocomplete="current-password"
          :value="password"
          label="Password"
          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
          :rules="pswModeRules"
          @input="(_) => (password = _)"
        ></v-text-field>

        <v-text-field
          v-if="this.mode === 'register'"
          autocomplete="current-password"
          :value="password2"
          label="Confirm password"
          :append-icon="value2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (value2 = !value2)"
          :type="value2 ? 'password' : 'text'"
          :rules="password2Rule"
          @input="(_) => (password2 = _)"
        ></v-text-field>

        <v-container v-if="mode === 'login'">
          <v-container class="mt-8 justify-center d-flex">
            <v-btn
              :small="buttonSize"
              :disabled="!valid"
              class="mr-4"
              @click="submitForm"
            >
              Log in
            </v-btn>
            <NuxtLink to="register">
              <v-btn :small="buttonSize" class="mr-4">Sign up instead</v-btn>
            </NuxtLink>
          </v-container>
          <v-container class="mt-8 justify-center d-flex">
            <a href="/">Forgot password?</a>
          </v-container>
        </v-container>
        <v-container class="mt-8 justify-center d-flex" v-else>
          <v-btn :disabled="!valid" class="mr-4" @click="submitForm">
            Sign in
          </v-btn>
          <NuxtLink to="login">
            <v-btn class="mr-4">Log in instead</v-btn>
          </NuxtLink>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  emits: ['save-data'],
  props: ['mode'],
  data() {
    return {
      valid: true,
      value: true,
      value2: true,
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required!',
        (v) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
            v
          ) ||
          'Password must contain a minimum of eight characters, at least one upper case English letter, one lower case English letter, one number and one special character!',
      ],
      password2: '',
      password2Rule: [
        (v) => !!v || 'Password is required!',
        (v) => v === this.password || 'Passwords must be the same!',
      ],
      username: '',
      usernameRules: [
        (v) => !!v || 'Username is required!',
        (v) =>
          (v && v.length <= 20) || 'Username must be less than 20 characters!',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required!',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid!',
      ],
      formData: {},
      errorMessage: '',
    };
  },
  watch: {
    $route() {
      if (this.$route.query.warn) {
        this.errorMessage = 'Please log in first!';
      } else {
        this.errorMessage = '';
      }
    },
  },
  created() {
    if (this.$route.query.warn) {
      this.errorMessage = 'Please log in first!';
    } else {
      this.errorMessage = '';
    }
  },
  computed: {
    showError: {
      get() {
        return this.$store.getters['auth/getError'];
      },
      set(err) {
        return err;
      },
    },
    pswModeRules() {
      return this.mode === 'register' ? this.passwordRules : [];
    },
    usrModeRules() {
      return this.mode === 'register' ? this.usernameRules : [];
    },
    showCounter() {
      return this.mode === 'register' ? 20 : null;
    },
    buttonSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    submitForm() {
      if (this.mode === 'login') {
        this.formData = {
          username: this.username,
          password: this.password,
        };

        this.$emit('save-auth', this.formData);

        if (this.showError) {
          this.errorMessage = 'Failed to authenticate! Check your login data.';
          return;
        }
      } else {
        this.validate();

        if (!this.valid) {
          return;
        }

        this.formData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };

        this.$emit('save-auth', this.formData);

        if (this.showError) {
          this.errorMessage = 'Something went wrong! Please try again later.';
          return;
        }
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #006400;
}

/* Smartphones */
@media (max-width: 767px) {
  .formCard {
    margin-top: 0px !important;
  }

  .logAlert {
    margin-top: 10px !important;
  }
}
</style>
