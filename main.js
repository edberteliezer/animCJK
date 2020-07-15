// ----------------------------------------------------------------
//  My application listens for generateSVG and runAnim 
//  They must be defined to function
//  The rules are as follows
// ----------------------------------------------------------------
//  1.  generateSVG must be immediately called on input submission
//      generateSVG must parse the parameter idElm and idContainer
//      how or whether this parameter is used does not matter
//      eg generateSVG('foo','bar') or generateSVG(null, null)
//  2.  runAnim must be called to set play state running
//      runAnim must not parse any parameter
// ----------------------------------------------------------------
//  Have fun - Full License in About Tab
//  Copyright 2016-2019 - Francois Mizessyn
//  Copyright 2020 - Edbert Eliezer
// ----------------------------------------------------------------


var numberObject; // Save Number of Object need to be processed
function generateSVG(idElm, idContainer) {
  var elm, idElm, value, array, idParent, idContainer, arLen;
  elm = document.getElementById(idElm);
  value = elm.value.trim().split(' ').join('').split('\u3000').join('');
  array = Array.from(value);
  idParent = idContainer;
  elm.value = value;
  arLen = array.length;
  numberObject = arLen; 
  // Count Number of Object need to be processed

  document.getElementById(idContainer).innerHTML = ''; // Delete SVGs

  const jaspecial = [20043, 21450, 27665, 29995, 30001, 30002, 30003, 21450, 30011, 31899, 37325, 37340]
  for (var i = 0; i < arLen; ++i) {
    var char, codepoint, src;
    char = array[i];
    codepoint = char.codePointAt(0);

    if (jaspecial.includes(codepoint)) {
      console.log('Detected special');
      src = `./svgsJaSpecial/${codepoint}.svg`;
      makeObject(src,idParent);
    } 
    else if (RegExp('[\u3041-\u3096\u30A0-\u30FF]').test(char)) {
      console.log('Detected hiragana');
      src = `./svgsKana/${codepoint}.svg`;
      makeObject(src,idParent);
    } 
    else if (RegExp('[\u3400-\u4DB5\u4E00-\u9FCB\uF900-\uFA6A]').test(char)) {
      console.log('Detected kanji');
      src = `./svgsJa/${codepoint}.svg`;
      makeObject(src,idParent);
    } 
    else { 
      generateSvgError(char);
    }
  }
}

function generateSvgError(char) {
  alert(`${char} is not in our Japanese Repository. Make sure to use Japanese Kanji. Chinese Kanji can look identical to Japanese Kanji, but they may have different Unicode serial number.`);
}

function makeObject(src,idParent) {
  var parent, object;
  parent = document.getElementById(idParent);
  object = document.createElement('object');//create object
  object.setAttribute("data", src);
  object.setAttribute("type", "image/svg+xml");
  object.setAttribute("class", "svg");
  object.setAttribute("onload", "convertSVG(this)");
  object.setAttribute("style", "opacity:0");
  parent.appendChild(object);
}

function convertSVG(elm) {
  var svgObject, numberSVG;
  svgObject = elm;
  svgObject.parentElement.replaceChild(
    svgObject.contentDocument.documentElement.cloneNode(true), 
    svgObject
  );

  numberSVG = document.querySelectorAll('svg.acjk').length; 
  // Count current number of SVG

  if (numberObject==numberSVG){ 
    // All Object is turned into SVG
    calcAnimDuration()
  }
}

function calcAnimDuration() {
  var path, pathCount;
  pathCount = 0;
  // Find all path without ID
  path = document.querySelectorAll("path:not([id])");

  for (var i = 0, pathlen = path.length; i < pathlen; ++i){
    path[i].style.animationPlayState = "paused";
    var duration = i;
    path[i].style.setProperty('--d', duration+'s');
    console.log(getComputedStyle(path[i]).getPropertyValue('--d'));
    pathCount++;
    if (pathCount === pathlen) {
      // All path duration calculated
      runAnim()
    }
    
  }
}

function runAnim() {
  var path, pathlen;  
  // Find all path without ID
  path = document.querySelectorAll("path:not([id])");
  pathlen = path.length;
  
  for (var i = 0; i < pathlen; ++i){
    path[i].style.animationPlayState = "running";
  }
}


document.addEventListener("DOMContentLoaded", function() {
  obj=document.getElementById("myBtn");
});
