const products = require('../data/products.json');

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  })
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const val = products.find(product => {
      if (product.id == id) {
        return product;
      }
    });
    if (val) {
      resolve(val);
    }
  });
  // const promise = new Promise((resolve, reject) => {
  //   resolve(productById());
  // })
}

module.exports = { findAll, findById }