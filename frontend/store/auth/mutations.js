export default {
  initializeStore(state, payload) {
    if (localStorage.getItem('access')) {
      state.access = localStorage.getItem('access');
      state.refresh = localStorage.getItem('refresh');
    } else {
      state.access = null;
      state.refresh = null;
    }
  },
  setAccess(state, payload) {
    state.access = payload;
  },
  setRefresh(state, payload) {
    state.refresh = payload;
  },
  setError(state, payload) {
    state.isError = payload;
  },
  destroyToken(state) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    state.access = null;
    state.refresh = null;
  },
};
