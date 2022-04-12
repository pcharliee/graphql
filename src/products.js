class Product {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  }

  addProduct = (data) => {
    this.products.push(data);
    return data;
  }

  getById = (data) => {
    var product = this.products.find((product) => {
      return product.id == data.id;
    });

    if (!product)
      return { status: 'error', message: `No product for ID: ${data.id}` };

    return product
  };

  deleteProduct = (data) => {
    var product = this.products.filter((product) => {
      return product.id != data.id;
    });
    return this.products;
  };
};

const products = new Product();

export default products;
