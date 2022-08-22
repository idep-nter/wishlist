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
      description: data.description,
    };
    await axios({
      method: "post",
      url: "http://localhost:8000/api/items/",
      data: itemData,
    });

    context.commit("addItem", itemData);
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
      description: data.description,
    };
    await axios({
      method: "put",
      url: "http://localhost:8000/api/items/" + itemData.id + "/",
      data: itemData,
    });
  },
  async deleteItem(context, data) {
    await axios.delete("http://localhost:8000/api/items/" + data.id + "/");
  },
  async loadItems(context, data) {
    const response = await axios.get(
      `http://localhost:8000/api/items/?page=${data}`
    );

    context.commit("setCount", response.data.count);

    const items = [];

    for (const key in response.data.results) {
      const item = {
        id: String(response.data.results[key].id),
        name: response.data.results[key].name,
        price: response.data.results[key].price,
        important: response.data.results[key].important,
        image: response.data.results[key].image,
        category: response.data.results[key].category,
        link: response.data.results[key].link,
        description: response.data.results[key].description,
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
