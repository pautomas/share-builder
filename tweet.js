let handlePaste = function(e) {
  e.preventDefault();
  e.stopPropagation();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertHTML", false, text);
}

let updateHighlightColor = function() {
  let highlightColor = document.querySelector('#color-picker input').value;
  let highlights = document.querySelectorAll('.highlight');
  for (var i = 0; i < highlights.length; i++) {
    highlights[i].style = [ 'color : ' + highlightColor ]
      .join(',');
  }
}

let handleKeyUp = function(e) {
  var text = e.target.innerText;
  var newText = text.replace(/([@,#][a-z\d-_]+)/ig, '<span class="highlight">$1</span>');
  newText = newText.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  e.target.parentElement.firstElementChild.innerHTML = newText;
  updateHighlightColor();
}

let handleColorPickerChange = function(e) {
  document.querySelector('#color-picker')
    .style = [ 'background-color : ' + e.target.value ]
      .join(',');
  updateHighlightColor();
}

let handleFontSizeChange = function(e) {
  document.querySelector('#input-box')
    .style = [ 'font-size : ' + e.target.value + 'px' ]
      .join(',');
}

let handleAspectRatioFormClick = function(e) {
  let selectedRatio = document.querySelector('[name="ratio"]:checked').value;
  document.querySelector('#container').className = `tweet ${selectedRatio}`;
}

let tweet = {
  init : function() {
    let root = document.querySelector('#canvas')
    root.addEventListener('paste', handlePaste, false);
    root.addEventListener('input', handleKeyUp, false);
    document.querySelector('.main').focus()

    let colorPicker = document.querySelector('#color-picker');
    colorPicker.addEventListener('change', handleColorPickerChange);
    colorPicker.style = [ 'background-color : ' + colorPicker.querySelector('input').value ]

    let fontSize = document.querySelector('#font-size input');
    fontSize.addEventListener('change', handleFontSizeChange);

    let aspectRatioForm = document.querySelector('#aspect-ratio');
    aspectRatioForm.addEventListener('click', handleAspectRatioFormClick);
  }
}
