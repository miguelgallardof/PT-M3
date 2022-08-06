// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.

// Simula nuestra db
let posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

// 1) POST /posts

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }

  let post = { id: id, author: author, title: title, contents: contents };
  id++;
  posts.push(post);
  res.json(post);
});

// 2) POST /posts/author/:author

server.post("/posts/author/:author", (req, res) => {
  const { author } = req.params;
  const { title, contents } = req.body;
  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }

  let post = { id: id, author: author, title: title, contents: contents };
  id++;
  posts.push(post);
  res.json(post);
});

// 3) GET /posts

server.get("/posts", (req, res) => {
  const term = req.query.term;
  if (term) {
    const result = posts.filter(
      (p) => p.title.includes(term) || p.contents.includes(term)
    );
    return res.json(result);
  }
  res.json(posts);
});

// 4) GET /posts/:author

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  const result = posts.filter((p) => p.author === author);

  if (result.length > 0) {
    return res.json(result);
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post del autor indicado",
    });
  }
});

// 5) GET /posts/:author/:title

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  const result = posts.filter((p) => p.author === author && p.title === title);

  if (result.length > 0) {
    return res.json(result);
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
});

// 6) PUT /posts

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }

  const post = posts.find((p) => p.id === id); // busca el post con el id indicado

  if (!post)
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se encontró un post con ese ID" });

  post.title = title;
  post.contents = contents;
  res.json(post);
});

// 7) DELETE /posts

server.delete("/posts", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para eliminar el Post",
    });
  }

  const post = posts.find((p) => p.id === id);
  if (!post)
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se encontró un post con ese ID" });

  posts = posts.filter((p) => p.id !== id); // elimina el post con el id indicado
  res.json({ success: true });
});

// 8) DELETE /posts/author/

server.delete("/author", (req, res) => {
  const { author } = req.body;
  if (!author) {
    return res.status(STATUS_USER_ERROR).json({
      error: "Mensaje de error",
    });
  }

  const results = posts.filter((p) => p.author === author);
  if (results.length === 0) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe el autor indicado",
    });
  }
  posts = posts.filter((p) => p.author === !author);
  res.json(results);
});

module.exports = { posts, server };
