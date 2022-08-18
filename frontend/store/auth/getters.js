import state from "./state";

export default {
  loggedIn(state) {
    return state.access != null;
  },
  getError(state) {
    return state.isError
  },
};
