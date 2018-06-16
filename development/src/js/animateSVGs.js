// Modification of https://codepen.io/simoncodrington/pen/Mwgqqd

export default function animateSVGs() {
  'use strict';

  /* Interactivity to determine when an animated element in in view. In view elements trigger our animation*/
  $(document).ready(function() {

    // fetches the document for the given embedding_element
    function getSubDocument(embedding_element) {
      if (embedding_element.contentDocument) {
        return embedding_element.contentDocument;
      }
      else {
        var subdoc = null;
        try {
          subdoc = embedding_element.getSVGDocument();
        } catch(e) {}
        return subdoc;
      }
    }

    var svgObjects = document.querySelectorAll(".illustration");
    // console.log(svgObjects);

    $.each(svgObjects, function() {
      var svgObject = $(this);
      // console.log(svgObject);
      $(svgObject).on('load', function prepareSVG() {
        var svg = getSubDocument(svgObject[0]).getElementsByClassName('animation-element');
        svg = svg[0];
        // console.log($(svg));

        // on or scroll, detect elements in view
        $(window).on('scroll resize', checkIfInView(svgObject, svg));
        // invoke our function on initial load
        checkIfInView(svgObject, svg)();
      });
    });

    // check to see if any animation containers are currently in view
    function checkIfInView(svgObject, svgElement) {

      return function() {
        // get current window information
        var web_window = $(window);
        var window_height = web_window.height();
        var window_top_position = web_window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        // see if its in view
        // get the element's information
        var element = svgObject;
        var element_height = $(element).outerHeight();
        var element_top_position = $(element).offset().top;
        var element_bottom_position = (element_top_position + element_height);
        // console.log(element_height, element_top_position, element_bottom_position);
        // check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
        if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
          // element.addClass('in-view');
          svgElement.classList.add('in-view');
        } else {
          // element.removeClass('in-view');
          svgElement.classList.remove('in-view');
        }
      }
    }

  });
}
