var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor
http
  .createServer((req, res) => {
    // crear ruta que revise el nombre del archivo
    fs.readFile(`./images/${req.url}.jpg`, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  })
  .listen(8080, "127.0.0.1");
