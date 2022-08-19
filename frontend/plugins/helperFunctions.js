import axios from "axios";

export const getAccess = (store) => {
  if (process.server) {
    return;
  }
  store.commit("auth/initializeStore");
  const access = store.getters["auth/getAccess"];
  if (access) {
    axios.defaults.headers.common["Authorization"] = "JWT " + access;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
};

export const refreshAccess = async (store) => {
  const accessData = {
    refresh: store.getters["auth/getRefresh"],
  };
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8000/api/v1/jwt/refresh/",
      data: accessData,
    });

    const access = response.data.access;
    localStorage.setItem("access", access);
    store.commit("auth/setAccess", access);
  } catch (err) {
    console.log(err);
  }
};
