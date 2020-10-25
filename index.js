const fs = require('fs')
const https = require('https')
const app = require('./app')

const port = process.env.PORT;

var privateKey = fs.readFileSync('./ssl/key.pem');
var certificate = fs.readFileSync('./ssl/cert.pem');

var credentials = {
    key: privateKey,
    cert: certificate
};

https.createServer(credentials, app).listen(port, () => {
    console.log('Server is up on port ' + port);
})
