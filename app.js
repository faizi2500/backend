const http = require('http');
const { getProducts, getProductById } = require('./controllers/productController')

const host = 'localhost'

const requestListen = ((req, res) => {

    if (req.url == '/api/products' && req.method == 'GET') {
      getProducts(req, res)
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method == 'GET') { //link in resources => regex for url
      const arr = req.url.split('/');
      const id = arr[3];
      getProductById(req, res, id);
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Route not found'})); 

    }
});

const server = http.createServer(requestListen)

const PORT = process.env.PORT || 5000;

server.listen(PORT, host, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));