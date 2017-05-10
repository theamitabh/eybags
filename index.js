var express = require('express'),
    morgan = require('morgan'),  
    proxy = require('json-proxy');

var app = express();

app.use(morgan('dev'));
app.use(proxy.initialize({
  proxy: {
    'forward': {
      '/eyapi/(.*)': 'https://api.us.apiconnect.ibmcloud.com/etihad-ea-sandbox/sb/$1'
    }
  }
}));

app.use(express.static(__dirname));
var port = process.env.PORT || 80 ;
app.listen( port);
console.log('listening on port ' + port );
