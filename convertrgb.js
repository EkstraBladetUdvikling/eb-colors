var fs = require("fs");
fs.readFile("./temp/eb-colors-vars-rgb.css", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/--eb-/g, "--rgb-");
  result2 = result.replace(/rgb\(/g, "");
  result3 = result2.replace(/\)/g, "");

  fs.writeFile("./dist/eb-colors-vars-rgb.css", result3, "utf8", function(err) {
    if (err) return console.log(err);
  });
});
