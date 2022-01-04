const { findAll, findById, postProduct, update, remove } = require("../models/productModel");
const Product = require('../models/tweetModel')

async function getProducts(req, res) {

  try {
    // const list = await findAll() 
    const list = Product.find().then((result => {
      console.log('Created Successfully', result)
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result)); 
    })).catch(err=> {
      console.log(err);
    })
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

async function addProduct (req, res) {
  try {
    let body = "";
     
    req.on('data', (chunk) => {
      body += chunk.toString();
    })
    
    req.on('end', async () => {
      const parsedObj = JSON.parse(body)
      const { name, description, price } = parsedObj 
      const product = new Product({
        name: name,
        description: description,
        price: price
      });
      product.save().then((result) => {
        console.log('created Successfully');
        res.writeHead(201, {'Content-Type': 'application/json'}); // 201 - Created
        res.end('Prdocut added to the datbase' , JSON.stringify(product));
      }).catch(err => {
        console.log(err);
      })
    })
  } catch (error) {
    console.log(error)
  }
}

async function updateProduct(req, res, id) {
  try { 
    let prop = '';
    req.on('data', (chunk) => {
      prop += chunk.toString();
    })

    req.on('end', async () => {
      const parsedProp = JSON.parse(prop);
      const updated = await update(id, parsedProp);
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(updated))
    })
  } catch(error) {
    console.log(error);
  } 

}

async function deleteProduct(req, res, id) {
  try {
    const deleted = await remove(id)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(deleted))
  } catch(error) {
    console.log(error);
  }
}

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct }