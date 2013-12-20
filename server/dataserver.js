var http = require('http');

var port = '8489';

http.createServer( function(req,res) {

   var query = require('url').parse(req.url).query;
   var requested_resource = require('querystring').parse(query).resource;

   var currentTime = new Date();

   if( requested_resource ) {
     console.log('Client called at '+currentTime+' requested ',requested_resource);
     }
   else {
     console.log('Client called at '+currentTime);
     }

   res.writeHead(200, {
     'Content-Type':'text/plain',
     'Access-Control-Allow-Origin':'*'
     });

   res.write('Here is your NY Data !\n');
   res.write('resource = '+requested_resource);
   res.end();

}).listen(port);

console.log('Serving on port ' + port);

