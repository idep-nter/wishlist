export default {
    addItem(state, payload) {
        state.items.push(payload);
    },
    setItems(state, payload) {
        state.items = payload
    },
    setCategories(state, payload) {
        state.categories = payload
    }
}