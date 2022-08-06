"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("Executor is not a function");
  }
  this._state = "pending";
  this._value = undefined;
  this._handlerGroups = [];

  executor(this._internalResolve.bind(this), this._internalReject.bind(this));

  /* executor(
    (data) => {
      this._internalResolve(data);
    },
    (data) => {
      this._internalReject(data);
    }
  ); */
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (data) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = data;
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  const downstreamPromise = new $Promise(() => {});
  this._handlerGroups.push({
    successCb: typeof successCb === "function" ? successCb : false,
    errorCb: typeof errorCb === "function" ? errorCb : false,
    downstreamPromise,
  });

  /*   if (typeof successCb !== "function") successCb = false;
  if (typeof errorCb !== "function") errorCb = false;

  this._handlerGroups.push({
    successCb,
    errorCb,
    downstreamPromise,
  }); */

  /* if (this._state !== "pending") this._callHandlers();
  return downstreamPromise; // promesa B */

  this._callHandlers();
  return downstreamPromise;
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};

$Promise.prototype._callHandlers = function () {
  if (this._state !== "pending") {
    while (this._handlerGroups.length) {
      const handlers = this._handlerGroups.shift();
      if (this._state === "fulfilled") {
        if (handlers.successCb) {
          try {
            const result = handlers.successCb(this._value);
            if (result instanceof $Promise) {
              result.then(
                (data) => {
                  handlers.downstreamPromise._internalResolve(data);
                },
                (error) => {
                  handlers.downstreamPromise._internalReject(error);
                }
              );
            } else {
              handlers.downstreamPromise._internalResolve(result);
            }
          } catch (e) {
            handlers.downstreamPromise._internalReject(e);
          }
        } else handlers.downstreamPromise._internalResolve(this._value);
      } else {
        if (handlers.errorCb) {
          try {
            const result = handlers.errorCb(this._value);
            if (result instanceof $Promise) {
              result.then(
                (data) => {
                  handlers.downstreamPromise._internalResolve(data);
                },
                (error) => {
                  handlers.downstreamPromise._internalReject(error);
                }
              );
            } else {
              handlers.downstreamPromise._internalResolve(result);
            }
          } catch (e) {
            handlers.downstreamPromise._internalReject(e);
          }
        } else handlers.downstreamPromise._internalReject(this._value);
      }
    }
  }
};

$Promise.resolve = function (value) {
  if (value instanceof $Promise) {
    return value;
  }
  const promise = new $Promise(() => {});
  promise._internalResolve(value);
  return promise;
};

$Promise.all = function (array) {
  if (!Array.isArray(array)) throw new TypeError("Argument is not an array");
  const promise = new $Promise((resolve, reject) => {
    const promiseArray = array.map((promise) => $Promise.resolve(promise));
    const results = Array(array.length);
    let counter = array.length;
    promiseArray.forEach((promise, i) => {
      promise.then(
        (value) => {
          results[i] = value;
          counter--;
          if (counter === 0) resolve(results);
        },
        (error) => reject(error)
      );
    });
  });

  return promise;
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
