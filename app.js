var router = require('./router')

//Problem : We need a simple way to look up a user's badge count and JS points
//Solution: Use Node to perform the profile lookup and serve our template via HTTP

//1. Create a web server

const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((request, response) => {
    router.home(request, response);
    router.user(request, response);})
.listen(port, hostname, function()  {
  console.log(`Server running at http://${hostname}:${port}/`);
});



