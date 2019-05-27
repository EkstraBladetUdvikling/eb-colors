const fs = require("fs");

const file = fs.readFileSync("./temp/eb-colors-classes.json", "utf8");

const prefix = "var ebColorMap = ";

const fileContent = prefix + file;

fs.writeFileSync("./example/eb-colors-classes.js", fileContent);
