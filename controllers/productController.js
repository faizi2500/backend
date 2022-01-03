const { findAll, findById, postProduct, update, remove } = require("../models/productModel");

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

async function addProduct (req, res) {
  try {
    let body = "";
     
    req.on('data', (chunk) => {
      body += chunk.toString();
    })
    
    req.on('end', async () => {
      const parsedObj = JSON.parse(body)
      const {name, description, price} = parsedObj 
      const newProduct = {
        name,
        description,
        price
      } 
      const addedProduct = await postProduct(newProduct);
      res.writeHead(201, {'Content-Type': 'application/json'}); // 201 - Created
      res.end(JSON.stringify(addedProduct));
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