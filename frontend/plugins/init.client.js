import axios from "axios";

export default function ({ store }) {
  if (process.server) {
    return
  }

  store.commit("auth/initializeStore");
  const access = store.state.access;
  if (access) {
    axios.defaults.headers.common["Authorization"] = "JWT " + access;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
}

// export default {
//   beforeCreate() {
//     if (process.server) {
//       return;
//     }

//     store.commit("auth/initializeStore");
//     const access = store.state.access;
//     if (access) {
//       axios.defaults.headers.common["Authorization"] = "JWT " + access;
//     } else {
//       axios.defaults.headers.common["Authorization"] = "";
//     }
//   },
//   mounted() {
//     setInterval(() => {
//       this.getAccess()
//     }, 5000)
//   },
//   methods: {
//     async getAccess(e) {
//       const accessData = {
//             refresh: this.$store.state.refresh
//       }
//       const response = await axios({
//         method: "post",
//         url: "http://localhost:8000/api/v1/jwt/refresh/",
//         data: accessData,
//       });

//       const access = response.data.access
//       console.log(access)

//       localStorage.setItem("access", access)
//       this.$store.commit("setAccess", access)
//     }
    
//   }
// };
