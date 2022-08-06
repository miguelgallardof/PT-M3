const express = require("express");
// const morgan = require("morgan");

// Creamos el servidor
const app = express();

// bodyParser === express.json()
// const jsonParser = express.json();

// Método que permite settear middleware para toda la aplicación
app.use(express.json());
// app.use(morgan("dev")); // Loguea cada request
app.use("/", function (req, res, next) {
  console.log("Entro a " + req.url);
  next(); // Le doy paso al siguiente middleware
});

const array = [];

// GET --> solicitamos data

// Endpoint / rutas
app.get("/", (req, res) => {
  // console.log(req.url);
  // Cualquier lógica
  res.sendStatus(404);
});

app.get("/users", (req, res) => {
  // console.log(req.url);
  // Voy a la db y busco todos los registros de usuarios
  // Organizo la data
  // Envio la data
  res.status(200).send("Ruta USERS");
});

/* app.get("/users/id", (req, res) => {
    console.log(req.url);
  // Voy a la db y busco un registro de usuario por ID
  // Organizo la data
  // Envio la data
  res.send("Ruta GET");
}); */

app.get("/product", (req, res) => {
  // console.log(req.url);
  var obj = {
    producto: "Remera",
    stock: 10,
  };
  res.json(obj);
});

// POST --> agregamos data

// body: --> {name: "Juan", age: 30}
// query: --> /home?id=1
// params: --> /home/:id

app.post("/users", (req, res, next) => {
  // Crear un nuevo usuario
  const user = req.body;
  console.log(user);
  res.send("ok, llego el usuario");
});

app.put("/api/:id/:algo", (req, res) => {
  // Actualizar un usuario
  const params = req.params; // id: 3, algo: 'hola'
  console.log(id);
  console.log(algo);
  res.sendStatus(200);
});

app.put("/api", (req, res) => {
  // Actualizar un usuario
  const { id } = req.query; // {id: 2}
  array.push(id);
  console.log(array);
  res.sendStatus(200);
});

app.listen(3000, console.log("Escuchando en el puerto 3000!"));
