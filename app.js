const http = require('http');
const mongoose = require('mongoose');
const requestListen = require('./routes/route')

const uri = 'mongodb+srv://faizan:faizan123@cluster0.8pu5p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected')
  server.listen(PORT, host, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
})
.catch(err => console.log(err))

const host = 'localhost'

const server = http.createServer(requestListen)

const PORT = process.env.PORT || 5000;

// server.listen(PORT, host, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));