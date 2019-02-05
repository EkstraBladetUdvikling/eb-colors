/**
 * @ts-check
 */
var fnColors = document.getElementById('fnColors');
var docFrag = document.createDocumentFragment();
for (var i = 0; i < ebColorMap.value.length; i++) {
  var curColor = ebColorMap.value[i];
  if (curColor.selectors[0].indexOf('bg--') !== -1) {
    var colorBgClass = curColor.selectors[0].split('.')[1];
    var colorName = colorBgClass.split('--')[1];
    var rules = curColor.declarations;
    var ruleHTML = ''

    for (var key in rules) {
      if (key === 'background') {
        ruleHTML += rules[key];
      }
    }

    var htmlString = `<div class="color-example">
                          <div class="${colorBgClass}">
                              <p>${colorName}</p>
                          </div>
                          <div class="color-code">
                              ${ruleHTML}
                          </div>
                      </div>`
    var newDiv = document.createElement('div');
    newDiv.innerHTML = htmlString;
    docFrag.appendChild(newDiv)
  }
  fnColors.appendChild(docFrag);
}
