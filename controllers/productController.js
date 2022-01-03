const { findAll, findById } = require("../models/productModel");

async function getProducts(req, res) {

  try {
    const list = await findAll() 
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(list)); 
  } catch(error) {
    console.log(error)
  }
}

async function getProductById (req, res, id) {
  try {
    const product = await findById(id);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(product)); 
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProducts, getProductById }