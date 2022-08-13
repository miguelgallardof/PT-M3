const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe("POST /producto", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 200", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5], num: 1 })
        .expect(200));
    it("responds with and object with message `test`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it("responds with and object with message `test`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 2 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it("responds with and object with message `test`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 4 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });
  0;

  describe("POST /numString", () => {
    it("responds with 200", () =>
      agent.post("/numString").send({ str: "hola" }).expect(200));
    it("responds with 4", () =>
      agent
        .post("/numString")
        .send({ str: "hola" })
        .expect(200)
        .then((res) => {
          expect(res.body.result).toEqual(4);
        }));
    it("responds with 400 if string is a number", () =>
      agent.post("/numString").send({ str: 5 }).expect(400));
    it("responds with 400 if string is empty", () =>
      agent.post("/numString").send({ str: "" }).expect(400));
  });

  describe("POST /pluck", () => {
    it("responds with 200", () =>
      agent
        .post("/pluck")
        .send({
          array: [{ name: "Juan" }, { surname: "Perez" }, { name: "Miguel" }],
          prop: "name",
        })
        .expect(200));
    it("responds with functionality of pluck", () =>
      agent
        .post("/pluck")
        .send({
          array: [{ name: "Juan" }, { surname: "Perez" }, { name: "Miguel" }],
          prop: "name",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.result).toEqual(["Juan", "Miguel"]);
        }));
    it("responds with 400 if is not a array", () =>
      agent.post("/pluck").send({ array: true, prop: "name" }).expect(400));
    it("responds with 400 if string is empty", () =>
      agent
        .post("/pluck")
        .send({
          array: [{ name: "Juan" }, { surname: "Perez" }, { name: "Miguel" }],
          prop: "",
        })
        .expect(400));
  });

  /* describe("POST /pluck", () => {
    const array = [
      { alumno: "Juan", edad: 30, carrera: "fullstack" },
      { alumno: "Nico", edad: 20, carrera: "data" },
      { alumno: "Leo", edad: 50, carrera: "fullstack" },
    ];
    it("responds with 400 if...", () => {
      agent.post("/pluck").send({ array: 101, prop: "edad" }).expect(400);
    });
    it("responds with 400 if...", () => {
      agent.post("/pluck").send({ array: array, prop: "" }).expect(400);
    });
    it("responds with 200 if...", () => {
      agent.post("/pluck").send({ array: array, prop: "edad" }).expect(200);
    });
    it("responds with 200 if...", () => {
      return agent
        .post("/pluck")
        .send({ array: array, prop: "edad" })
        .then((res) => {
          expect(res.body.result).toEqual([30, 20, 50]);
        });
    });
  }); */
});
