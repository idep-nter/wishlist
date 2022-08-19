export default {
  getItemById: (state) => (payload) => {
    return state.items.find((item) => item.id == payload);
  },
  getItems(state) {
    return state.items;
  },
  getCategories(state) {
    return state.categories;
  },
  hasItems(state) {
    return state.items && state.items.length > 0;
  },
  getCount(state) {
    return state.count
  }
};
