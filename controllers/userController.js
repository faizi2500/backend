const User = require('../models/userModel.js')
const bcrypt = require("bcryptjs")

async function createUser(req, res) {
  try {
    let body = '';
    console.log(req.body);
    req.on('data', (chunk) => {
      console.log('data',chunk)
      body += chunk.toString();
    });
    
    await req.on('end', async () => {
      const userBody = JSON.parse(body);
      let { name, email, password, dob } = userBody;
      const saltRounds = 10;

      const newUser = new User({
        name: name,
        email: email,
        password: password,
        dob: dob
      });

      await bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
          throw saltError
        } else {
          bcrypt.hash(password, salt, function(hashError, hash) {
            if (hashError) {
              throw hashError
            } else {
              console.log(hash)
              newUser.password = hash;
              newUser.save().then((result) => {
                console.log('created Successfully');
                res.writeHead(201, {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000',
                });
                res.end('User created', JSON.stringify(newUser));
              }).catch(err => {
                console.log(err);
              })
            }
          })
        }
      });

    })
  } catch(error) {
    console.log(error);
  }
}

module.exports = { createUser }