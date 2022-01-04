const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const requestListen = ((req, res) => {

  if (req.url == '/api/products' && req.method == 'GET') {
    getProducts(req, res)
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method == 'GET') { //link in resources => regex for url
    const arr = req.url.split('/');
    const id = arr[3];
    getProductById(req, res, id);
  } else if (req.url == '/api/products' && req.method == 'POST') {
    addProduct(req, res);
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method == 'PUT') {
    const arr = req.url.split('/');
    const id = arr[3];
    updateProduct(req, res, id)
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method == 'DELETE') {
    const id = req.url.split('/')[3];
    deleteProduct(req, res, id)
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Route not found'})); 
  }
});

module.exports = requestListen;