import axios from "axios";

export default {
  async register(context, data) {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    const url = "http://localhost:8000/api/v1/users/";

    axios
      .post(url, userData)
      .then((response) => {
        if (response.statusText === "OK") {
          context.commit("setError", false);
          this.$router.replace("login");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        context.commit("setError", true);
      });
  },

  async login(context, data) {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("access");

    const userData = {
      username: data.username,
      password: data.password,
    };

    const url = "http://localhost:8000/api/v1/jwt/create/";

    axios
      .post(url, userData)
      .then((response) => {
        if (response.statusText === "OK") {
          context.commit("setError", false);
          const access = response.data.access;
          const refresh = response.data.refresh;

          context.commit("setAccess", access);
          context.commit("setRefresh", refresh);

          axios.defaults.headers.common["Authorization"] = "JWT " + access;

          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);

          this.$router.replace("/items");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        context.commit("setError", true);
      });
  },

  async logout(context) {
    if (context.getters.loggedIn) {
      await context.commit("destroyToken");
    }
  },
};
