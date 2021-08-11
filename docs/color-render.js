/**
 * @ts-check
 */
var fnColors = document.getElementById('fnColors');
var docFrag = document.createDocumentFragment();

ebColors.forEach((color) => {
  var htmlString = `<div class="color-example">
                          <div class="bg--${color.className}">
                              <p>${color.className}</p>
                          </div>
                          <div class="color-code">
                              ${color.color}
                          </div>
                      </div>`;
  var newDiv = document.createElement('div');
  newDiv.innerHTML = htmlString;
  docFrag.appendChild(newDiv);
});
fnColors.appendChild(docFrag);
