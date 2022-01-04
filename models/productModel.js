const products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const { Prdouct } = require('./tweetModel');
const Product = require('./tweetModel');

const findAll = () => {
  return new Promise((resolve, reject) => {
    const foods = Product.find({});
    resolve(foods);
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
}
const postProduct = newProduct => {
  return new Promise((resolve, reject) => {
    const lenght = products.length;
    const food = new Product(newProduct);
    food.save();
    const newLength = products.length;
    if (lenght + 1 == newLength) {
      resolve(food);
    };
  })
}

const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    let product = products.find(each => {
      if (each.id == id) {
        return each;
      }
    })

    for (let property in product) {
      if (property == Object.keys(obj)[0]) {
        product[property] = obj[property];
        resolve(product);
      }
    }
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    const output = products.filter(each => each.id != id);
    resolve(output)

  })
}

module.exports = { findAll, findById, postProduct, update, remove }