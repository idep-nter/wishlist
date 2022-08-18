// export default function ({ store, redirect, route, next }) {
//   console.log(route);
//   if (!store.getters["auth/isLogged"] && requireAuthentication(route))
//     redirect({ path: "/auth/login", query: { warn: true } });
//   else if (store.getters["auth/isLogged"] && !requireAuthentication(route))
//     redirect("/items");
//   else {
//     next();
//   }
// }

// function requireAuthentication(route) {
//   if (
//     route.path == "/items" ||
//     "/items/add" ||
//     "/items/_id" ||
//     "/items/edit/_id"
//   ) {
//     return true;
//   } else if (route.path == "/auth/login" || "/auth/register") {
//     return false;
//   }
// }
