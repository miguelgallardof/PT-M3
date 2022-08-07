var { expect } = require('chai');
var sumArray = require('./hooks.js');

describe('SumArray', function() {
  let array = [];

  //Se invoca un sóla vez ANTES de todos los unit test
  before(function() {
    console.log('before');
  });

  //Se invoca ANTES de cada unit test
  beforeEach(function() {
    console.log('beforeEach');
    array.push(1, 2, 3)
    console.log(array)
  });
  
  //Se invoca un sóla vez DESPUÉS de todos los unit test
  after(function() {
    console.log('after');
    array = [];
    console.log(array)
  });

  //Se invoca DESPUES de cada unit test
  afterEach(function() {
    console.log('afterEach');
  });



  it('should be a function', function() {
    expect(sumArray).to.be.a('function');
  });
  it('should throw an error if first argument is not an array', function() {
    expect(() => sumArray('sadasd')).to.throw(TypeError, /array/);
  });
  it('should throw an error if second argument is not an number', function() {
    expect(() => sumArray([], 'string')).to.throw(TypeError, /number/);
  });
  it('return true when invoked with [1,2,3] and 5', function() {
    expect(sumArray([1,2,3], 5)).to.be.true;
  });
  it('return false when invoked with [1,2,3] and 7', function() {
    expect(sumArray([1,2,3], 7)).to.be.false;
  });

});
