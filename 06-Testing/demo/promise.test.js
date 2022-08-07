const promisifiedFunction = require("./promise");

// Forma 1: usando el método .then()
it("should resolve to Henry Promise", () => {
  return promisifiedFunction(true).then((data) => {
    expect(data).toBe("Henry Promise");
  });
});

// Forma 2: con los matchers resolves y rejects
it("should resolve to Henry Promise (other way)", () => {
  return expect(promisifiedFunction(true)).resolves.toBe("Henry Promise");
});

// Forma 3: usando async/await
it("should resolve to Henry Promise (async/await)", async () => {
  const data = await promisifiedFunction(true);
  expect(data).toBe("Henry Promise");
});

/* Promesas rechazada */

// Forma 1: usando .toMatch() / .toBe()
it("should reject to Rejected Promise", () => {
  expect.assertions(1);
  return promisifiedFunction(false).catch((e) => {
    expect(e).toMatch("Rejected Promise");
  });
});

it("should reject to Rejected Promise", () => {
  expect.assertions(1);
  return promisifiedFunction(false).catch((e) => {
    expect(e).toMatch("Rejected Promise");
  });
});

// Forma 2: usando rejects
it("should reject to Rejected Promise (other way)", () => {
  return expect(promisifiedFunction(false)).rejects.toMatch("Rejected Promise");
});

// Forma 3: usando async/await
it("should reject to Rejected Promise (async/await)", async () => {
  expect.assertions(1);
  try {
    await promisifiedFunction(false);
  } catch (error) {
    expect(error).toMatch("Rejected Promise");
  }
});
