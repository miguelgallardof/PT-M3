const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});

app.get("/test", (req, res) => {
  res.json({
    message: "hola",
  });
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  res.send({
    result: a + b,
  });
});

app.post("/product", (req, res) => {
  const { a, b } = req.body;
  res.send({
    result: a * b,
  });
});

app.post("/sumArray", (req, res) => {
  const { array, num } = req.body;
  res.json({
    result: sumArray(array, num),
  });
});

function sumArray(array, num) {
  if (!Array.isArray(array) || typeof num !== "number")
    throw new TypeError("Los parametros no son correctos");
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === num) return true;
    }
  }
  return false;
}

app.post("/numString", (req, res) => {
  const { str } = req.body;
  if (typeof str !== "string") return res.sendStatus(400);
  if (!str.length) return res.sendStatus(400);

  res.json({
    result: str.length,
  });
});

app.post("/pluck", (req, res) => {
  const { array, prop } = req.body;
  if (!Array.isArray(array)) return res.sendStatus(400);
  if (!prop.length) return res.sendStatus(400);
  const result = array.reduce((result, item) => {
    result = item.hasOwnProperty(prop) ? [...result, item[prop]] : result;
    return result;
  }, []);
  res.json({ result });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
