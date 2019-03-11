var fs = require("fs");
fs.readFile("./temp/eb-colors-vars-rgb.css", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/--color-/g, "--rgb-color-");
  result2 = result.replace(/--fgcolor-/g, "--rgb-fgcolor-");
  result3 = result2.replace(/rgb\(/g, "");
  result4 = result3.replace(/\)/g, "");

  fs.writeFile("./dist/eb-colors-vars-rgb.css", result4, "utf8", function(err) {
    if (err) return console.log(err);
  });
});
