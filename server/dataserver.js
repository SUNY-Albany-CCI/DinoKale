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

    var options = {
      host: 'health.data.ny.gov',
      path: '/resource/'+requested_resource+'.json?'
    };

    nyStateDataCallback = function(response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {

        // Send the data to the web browser client
        res.writeHead(200, {
           'Content-Type':'text/plain',
           'Access-Control-Allow-Origin':'*' // Allow CORS (Cross Origin Resource Sharing)
           });

        res.write(str);
        res.end();

        });

      };

   http.request(options, nyStateDataCallback).end();


}).listen(port);

console.log('Serving on port ' + port);

