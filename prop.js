var orig_generateSVG = window.generateSVG;
window.generateSVG = function(idElm, idContainer){
    orig_generateSVG(idElm, idContainer);
    clearLoop();

    
}

var orig_runAnim = window.runAnim;
window.runAnim = function(){
    orig_runAnim();
    replay();
}

function replay()
{
  var path, pathlen, totalDur;
  // Find all path without ID
  path = document.querySelectorAll("path:not([id])");
  pathlen = path.length;
  totalDur = (pathlen*1000)+1000;

  for (var i = 0; i < pathlen; ++i){
    path[i].style.animationPlayState = "paused";
    restart(path[i]);
    path[i].style.animationPlayState = "running";

  }
  loop(totalDur); //defined below
  console.log(`loop started for ${totalDur}`);
}
function restart(elm){
  
  elm.style.animation = 'none';
  setTimeout(function(){
    elm.style.animation = '';
  },10) //next tick prevent browser efficiency
}

var svgLoop;

function loop(dur) {
  svgLoop = window.setTimeout(replay, dur);
}

function clearLoop() {
  window.clearTimeout(svgLoop);
  console.log('loop cleared');
}
