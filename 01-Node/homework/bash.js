// pwd --> print working directory --> imprime el directorio actual
// date --> print current date --> imprime la fecha actual
// ls --> print directory contents --> imprime los archivos del directorio
// echo --> print text --> imprime el texto que se le pase
// cat --> print file contents --> imprime el contenido del archivo
// head --> print first n lines of file --> imprime las n primeras lineas del archivo
// tail --> print last n lines of file --> imprime las n ultimas lineas del archivo
// curl --> client url --> mostrar el contenido de una página

const commands = require("./commands/index.js");

// Refactoreando
function done(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

process.stdout.write("prompt > ");

process.stdin.on("data", function (data) {
  // echo hola mundo
  var arg = data.toString().trim().split(" "); // [hola, mundo]
  var cmd = arg.shift(); // saca el primer elemento del array (echo)

  if (!commands.hasOwnProperty(cmd)) {
    process.stdout.write("Comando no válido");
  } else {
    commands[cmd](arg, done); // commands.echo([hola mundo])
  }
  // process.stdout.write("\nprompt > ");
});
