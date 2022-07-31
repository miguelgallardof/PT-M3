var http = require("http");
var fs = require("fs");

var beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

http
  .createServer((req, res) => {
    if (req.url === "/api") {
      res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(beatles));
    }
    if (req.url.substring(0, 5) === "/api/" && req.url.length > 5) {
      let search = req.url.split("/").pop(); // = [api, john%20lennon]
      let searchName = beatles.find(
        (b) => search.toLowerCase() === encodeURI(b.name.toLowerCase())
      ); // = john lennon
      if (searchName) {
        res
          .writeHead(200, { "Content-Type": "application/json" })
          .end(JSON.stringify(searchName));
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
      }
    }
    // home page
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      let html = fs.readFileSync("./index.html");
      res.end(html);
    }
    let search = req.url.split("/").pop(); // = [api, john%20lennon]
    let searchName = beatles.find(
      (b) => search.toLowerCase() === encodeURI(b.name.toLowerCase())
    ); // = john lennon
    if (searchName) {
      res.writeHead(200, { "Content-Type": "text/html" });
      let html = fs.readFileSync("./beatle.html", "utf-8");
      html = html.replace(/{name}/g, searchName.name);
      html = html.replace("{birthdate}", searchName.birthdate);
      html = html.replace("{profilePic}", searchName.profilePic);
      res.end(html);
    } else {
      res
        .writeHead(404, { "Content-Type": "text/html" })
        .end("<h1>404 Not Found</h1>");
    }
  })
  .listen(8080, "127.0.0.1");
