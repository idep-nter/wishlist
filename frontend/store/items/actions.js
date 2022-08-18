import axios from "axios";

export default {
  async addItem(context, data) {
      const itemData = {
          name: data.name,
          category: data.category,
          image: data.image,
          price: data.price,
          important: data.important,
          link: data.link,
          description: data.description
      };
      await axios({
          method: 'post',
          url: 'http://localhost:8000/api/items/',
          data: itemData
      });

      context.commit('addItem', itemData)
  },
  async editItem(context, data) {
      const itemData = {
          id: data.id,
          name: data.name,
          image: data.image,
          category: data.category,
          price: data.price,
          important: data.important,
          link: data.link,
          description: data.description
      };
      await axios({
          method: 'put',
          url: 'http://localhost:8000/api/items/' + itemData.id + '/',
          data: itemData
      });
  },
  async deleteItem(context, data) {
      await axios.delete('http://localhost:8000/api/items/' + data.id + '/');
  },
  async loadItems(context) {
    const response = await axios.get("http://localhost:8000/api/items/");

    const items = [];

    for (const key in response.data) {
      const item = {
        id: String(response.data[key].id),
        name: response.data[key].name,
        price: response.data[key].price,
        important: response.data[key].important,
        image: response.data[key].image,
        category: response.data[key].category,
        link: response.data[key].link,
        description: response.data[key].description,
      };
      items.push(item);
    }

    context.commit("setItems", items);
  },
  async loadCategories(context) {
    const response = await axios.get("http://localhost:8000/api/categories/");

    const categories = [];

    for (const key in response.data) {
      const category = {
        id: String(response.data[key].id),
        name: response.data[key].name,
      };
      categories.push(category);
    }

    context.commit("setCategories", categories);
  },
};
