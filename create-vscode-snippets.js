var fs = require("fs");

createSnippetFile('eb-colors-css-vars');
createSnippetFile('eb-colors-vars-rgb');
createSnippetFile('eb-colors-classes', 'html,jsp,java');

function createSnippetFile (filename, scope = 'css,scss,sass') {
    fs.readFile("./temp/" + filename + ".json", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        const colorMap = JSON.parse(data)
        const colorList = []
      
        colorMap.value.forEach(root => {
            if (root.selectors[0] === ':root') {
                // CSS Variables
                for (const name in root.declarations) {
                    if (root.declarations.hasOwnProperty(name)) {
                        // For each color:
                        const def = root.declarations[name];
                        colorList.push({
                            name,
                            def
                        });
                    }
                } 
            } else {
                // CSS Classes
                colorList.push({
                    name: root.selectors[0].replace('.', ''),
                    def: JSON.stringify(root.declarations).replace(/"/g, "'")
                })
            }
        });
      
        // Create snippet output:
        let snippetCode = '{';
        colorList.forEach(color => {
            snippetCode += `
            "color-${color.name}": {
              "scope": "${scope}",
              "prefix": "${color.name}",
              "body": "${color.name}",
              "description": "${color.def}"
           },
          `
        })
        snippetCode += '}';
      
        fs.writeFile("./snippets/" + filename + ".code-snippets", snippetCode, "utf8", function(err) {
          if (err) return console.log(err);
        });
      });
}
