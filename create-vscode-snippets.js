var fs = require('fs');

function createSnippetFile(filename, scope) {
  fs.readFile('./temp/' + filename + '.json', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    const colorMap = JSON.parse(data);
    const colorList = [];

    colorMap.value.forEach((root) => {
      if (root.selectors[0] === ':root') {
        // CSS Variables
        for (const name in root.declarations) {
          if (root.declarations.hasOwnProperty(name)) {
            // For each color:
            const def = root.declarations[name];
            colorList.push({
              name,
              def,
            });
          }
        }
      } else {
        // CSS Classes
        colorList.push({
          name: root.selectors[0].replace('.', ''),
          def: JSON.stringify(root.declarations).replace(/"/g, "'"),
        });
      }
    });

    // Create snippet output:
    const snippetCode = {};

    colorList.forEach((color) => {
      snippetCode[`color-${color.name}`] = {
        prefix: color.name,
        body: color.name,
        description: color.def,
      };
      if (scope) {
        snippetCode[`color-${color.name}`].scope = scope;
      }
    });

    fs.writeFile(
      './snippets/' + filename + '.code-snippets',
      JSON.stringify(snippetCode, null, 2),
      'utf8',
      function (err) {
        if (err) return console.log(err);
      }
    );
  });
}

createSnippetFile('eb-colors-css-vars', 'css');
createSnippetFile('eb-colors-vars-rgb', 'css');
createSnippetFile('eb-colors-classes');
