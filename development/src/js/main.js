import interactiveHeader from './interactiveHeader';
import animateSVGs from './animateSVGs'
import typingCarousel from './typingCarousel'

interactiveHeader();
animateSVGs();
typingCarousel();

// The following is used to adjust the width of the project type/count elements. It allows us to set
// a max width in css, and then, if the project type text is too long for this, it breaks it into multiple
// lines and then the element width shrinks down to fit tightly around this broken text. Using only css,
// you can achieve all that's desired above aside from the fact that the shrinking wouldn't happen, and
// any long text would have breaks, but whose containing element would be at the max width. This leaves
// a lot of space on either side, and it looked awkward. There is no css that can fix this, so here's the
// js that does it.
document.addEventListener("DOMContentLoaded", function(event) { 
  var list = document.querySelectorAll('.projects-by-type-menu span');
  for (var i=0; i<list.length; i++) {
    var w = list[i].getBoundingClientRect().width;
    var lpad = parseFloat($(list[i].parentNode.parentNode).css('padding-left'));
    var rpad = parseFloat($(list[i].parentNode.parentNode).css('padding-right'));
    // console.log(w, lpad, rpad);
    list[i].parentNode.parentNode.style.width = w + lpad + rpad + "px";
  }
  // Unhide the menu now that it looks how it should. Otherwise, we'd have noticeable
  // shifting around of li elements after the JS code runs.
  document.querySelectorAll('.projects-by-type-menu')[0].style.visibility = "visible";
});