var http = require('http');

var port = '8489';

http.createServer( function(req,res) {

   var query = require('url').parse(req.url).query;
   requested_measurement = require('querystring').parse(query).measurement;

   var currentTime = new Date();
   console.log('Client called at '+currentTime);

   res.writeHead(200, {'Content-Type':'text/plain'});

   res.write('Here is your NY Data !\n');
   res.end();

}).listen(port);

console.log('Serving on port ' + port);

