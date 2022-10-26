const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')




const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('coinflip' in params){
      const headsOrTails = Math.ceil(Math.random() * 2) == 1 ? 'heads' : 'tails'
      if(params['coinflip']== headsOrTails){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          result: "Congratulations!",
          winner: headsOrTails
        }
        res.end(JSON.stringify(objToJson));
      }else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          result: "Better luck next time.",
          winner: headsOrTails
        }
        res.end(JSON.stringify(objToJson));
      }
    }
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else if (page == '/images/quater-head.jpg'){
      var img = fs.readFileSync('./images/quater-head.jpg');
      res.writeHead(200, {'Content-Type': 'image/jpg' });
      res.end(img, 'binary');
  }else if (page == '/images/quater-tails.jpg'){
    var img = fs.readFileSync('./images/quater-tails.jpg');
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});



server.listen(process.env.PORT || 8000);