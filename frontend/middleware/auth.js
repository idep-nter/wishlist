import axios from "axios";

export default function ({ store }) {
  store.commit("auth/initializeStore");
  const access = store.state.access;
  if (access) {
    axios.defaults.headers.common["Authorization"] = "JWT " + access;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
}
