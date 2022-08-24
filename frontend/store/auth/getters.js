export default {
  loggedIn(state) {
    return state.access != null;
  },
  getError(state) {
    return state.isError;
  },
  getAccess(state) {
    return state.access;
  },
  getRefresh(state) {
    return state.refresh;
  },
};
