var fs = require("fs");
const axios = require("axios");

module.exports = {
  pwd: function (arg, done) {
    //process.stdout.write(process.cwd());
    done(process.cwd());
  },
  date: function (arg, done) {
    //process.stdout.write(Date());
    done(Date());
  },
  ls: function (arg, done) {
    fs.readdir(".", "utf-8", function (err, files) {
      if (err) throw err;
      let lines = "";
      process.stdout.write("\n");
      files.forEach((file) => {
        // process.stdout.write(file + "\n");
        lines += file + "\n";
      });
      //process.stdout.write("\nprompt > ");
      done(lines);
    });
  },
  echo: function (arg, done) {
    // process.stdout.write(arg.join(" ")); // 'hola mundo'
    done(arg.join(" "));
  },
  cat: function (arg, done) {
    fs.readFile(arg[0], "utf-8", function (err, file) {
      if (err) throw err;
      // process.stdout.write(file);
      // process.stdout.write("\nprompt > ");
      done(file);
    });
  },
  head: function (arg, done) {
    fs.readFile(arg[0], "utf-8", function (err, file) {
      if (err) throw err;
      const lines = file.split("\n").slice(0, 3);
      // process.stdout.write(lines.join("\n"));
      // process.stdout.write("\nprompt > ");
      done(lines.join("\n"));
    });
  },
  tail: function (arg, done) {
    fs.readFile(arg[0], "utf-8", function (err, file) {
      if (err) throw err;
      const lines = file.split("\n").slice(-3);
      // process.stdout.write(lines.join("\n"));
      // process.stdout.write("\nprompt > ");
      done(lines.join("\n"));
    });
  },
  curl: function (arg, done) {
    // [url]
    axios(arg[0])
      .then((data) => {
        process.stdout.write(data.data.toString());
        process.stdout.write("\nprompt > ");
      })
      .catch((err) => console.log(err));
  },
};
