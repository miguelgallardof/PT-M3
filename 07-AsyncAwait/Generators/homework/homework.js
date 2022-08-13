function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let counter = 1;

  while (max ? counter <= max : true) {
    // while (counter <= max || !max) {
    if (counter % 3 === 0 && counter % 5 === 0) {
      yield "Fizz Buzz";
    } else if (counter % 3 === 0) {
      yield "Fizz";
    } else if (counter % 5 === 0) {
      yield "Buzz";
    } else {
      yield counter;
    }
    counter++;
  }
}

module.exports = fizzBuzzGenerator;
