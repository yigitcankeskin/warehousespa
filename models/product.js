const fs = require("fs");

class Product {
  constructor(productCode, productDesc, productPcs) {
    this.productCode = productCode;
    this.productDesc = productDesc;
    this.productPcs = productPcs;
  }
  static getProducts() {
    try {
      const productsData = fs.readFileSync(Product.file);
      return JSON.parse(productsData);
    } catch (err) {
      return [];
    }
  }
  static saveProducts(products) {
    fs.writeFileSync(Product.file, JSON.stringify(products));
  }
  static removeProduct(productCode, productPcs) {
    try {
      const products = Product.getProducts();
      const index = products.findIndex((p) => p.productCode === productCode);
      if (index === -1) {
        const error = new Error("Entered Product Out of Stock");
        error.code = "402";
        throw error;
      } else if (parseInt(products[index].productPcs) > parseInt(productPcs)) {
        products[index].productPcs =
          parseInt(products[index].productPcs) - parseInt(productPcs);
        Product.saveProducts(products);
      } else if (
        parseInt(products[index].productPcs) === parseInt(productPcs)
      ) {
        const updatedProducts = products.filter(
          (product) => product.productCode !== productCode
        );
        Product.saveProducts(updatedProducts);
      } else {
        const error = new Error("Entered Quantity Is More Than Stock Quantity");
        error.code = "402";
        throw error;
      }
    } catch (e) {
      throw e;
    }
  }
  static addProduct(productCode, productDesc, productPcs) {
    try {
      const products = Product.getProducts();
      const index = products.findIndex((p) => p.productCode === productCode);
      if (index === -1) {
        products.push({
          productCode: productCode,
          productDesc: productDesc,
          productPcs: parseInt(productPcs),
        });
      } else {
        products[index].productPcs =
          parseInt(products[index].productPcs) + parseInt(productPcs);
      }
      Product.saveProducts(products);
    } catch (e) {
      throw e;
    }
  }
}

Product.file = "pages/api/products.json";

module.exports = Product;
