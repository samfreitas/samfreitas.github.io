'use strict';

/******/(function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
            /******/return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
            /******/i: moduleId,
            /******/l: false,
            /******/exports: {}
            /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
            /******/Object.defineProperty(exports, name, {
                /******/configurable: false,
                /******/enumerable: true,
                /******/get: getter
                /******/ });
            /******/
        }
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
            return module['default'];
        } :
        /******/function getModuleExports() {
            return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 0);
    /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

    module.exports = __webpack_require__(1);

    /***/
},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__interactiveHeader__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__animateSVGs__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__typingCarousel__ = __webpack_require__(4);

    Object(__WEBPACK_IMPORTED_MODULE_0__interactiveHeader__["a" /* default */])();
    Object(__WEBPACK_IMPORTED_MODULE_1__animateSVGs__["a" /* default */])();
    Object(__WEBPACK_IMPORTED_MODULE_2__typingCarousel__["a" /* default */])();

    // The following is used to adjust the width of the project type/count elements. It allows us to set
    // a max width in css, and then, if the project type text is too long for this, it breaks it into multiple
    // lines and then the element width shrinks down to fit tightly around this broken text. Using only css,
    // you can achieve all that's desired above aside from the fact that the shrinking wouldn't happen, and
    // any long text would have breaks, but whose containing element would be at the max width. This leaves
    // a lot of space on either side, and it looked awkward. There is no css that can fix this, so here's the
    // js that does it.
    document.addEventListener("DOMContentLoaded", function (event) {
        var list = document.querySelectorAll('.projects-by-type-menu span');
        for (var i = 0; i < list.length; i++) {
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

    /***/
},
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = interactiveHeader;
    // Header canvas behaviour
    // Modification of https://codepen.io/gotoandplaynowtoo/pen/dJYyWq
    function interactiveHeader() {
        'use strict';

        var forceStrength = 2;
        var particleRepelStrength = 8;
        // var count = 190; // Particle count.
        var partitionCount = 100; // The number of sections the discrete probability distribution is broken up into.
        var partitionDeadZoneCount = 55; // The number of sections the discrete probability distribution set to zero.
        var partitionShrinkRate = 0.5; // Used only for exponential probability distribution.
        var followerResponsiveness = 0.5;
        var particleResponsiveness = 0.005; // Spring constant between particles and their starting position. Speeds up returns upon blow up.
        var particleResponsiveness = 0.01;
        var connectionResponsiveness = 0.5; // Enforces rigid grids, so less flexibility and ergo less holes filled.
        var connectionDistance = 88; // The distance that adjacent nodes want to be at. Best to keep less than adjDist so particles "snap" into place.
        var unforceResponsiveness = 0.005;
        var unforceDelay = 1; // Units of seconds.
        var particleMinRadius = 4;
        var particleMaxRadius = 7;
        var lineWidth = 5;
        var adjacencyDistance = 100;
        var strokeOpacityFactor = 0.01; // What proportion of adjacency distance is used to transition opacity.
        var backgroundColor = '#FFFFFF';
        // var backgroundColor = 'rgba(0, 0, 0, 1)';
        // var graphColor =  '#000000';
        var graphColor = '#5D7634';

        // var forceStrength = 2;
        // var particleRepelStrength = 5;
        // var count = 150; // Particle count.
        // var partitionCount = 100; // The number of sections the discrete probability distribution is broken up into.
        // var partitionDeadZoneCount = 60; // The number of sections the discrete probability distribution set to zero.
        // var partitionShrinkRate = 0.5; // Used only for exponential probability distribution.
        // var followerResponsiveness = 0.5;
        // var particleResponsiveness = 0.005; // Spring constant between particles and their starting position. Speeds up returns upon blow up.
        // var particleResponsiveness = 0.01;
        // var connectionResponsiveness = 0.5; // Enforces rigid grids, so less flexibility and ergo less holes filled.
        // var connectionDistance = 88; // The distance that adjacent nodes want to be at. Best to keep less than adjDist so particles "snap" into place.
        // var unforceResponsiveness = 0.005;
        // var particleMinRadius = 4;
        // var particleMaxRadius = 7;
        // var lineWidth = 5;
        // var adjacencyDistance = 100;

        var c = document.getElementsByClassName('headerCanvas')[0];
        var ctx = c.getContext('2d');
        // We will set the event handlers on the parent of the canvas, so that any elements that are siblings
        // to this canvas, that happen to lie on top of the canvas, will still set off events when hovered over. That way buttons on top
        // of the canvas still make nodes dance around when cursor hovers to click it.
        // var parent = c.parentNode;
        var parent = document.getElementsByClassName('canvasSensor')[0];

        // ...then set the internal size to match
        var w = c.width = c.clientWidth;
        var h = c.height = c.clientHeight;

        // I thought 190 was a good amount for full screen on my computer, so I scale that to the actual dimensions of the screen.
        var count = Math.round(190 * w * h / (1920 * 1080)); // Particle count.

        var mx = 0; // Initial mouse position.
        var my = 0;

        var follower = {
            x: 0,
            y: 0,
            strength: 0
        };

        function Particle(x, y) {
            this.x = x;
            this.y = y;
            this.ox = x; // Initial positions
            this.oy = y;
            this.r = particleMinRadius + Math.random() * (particleMaxRadius - particleMinRadius); // Radius of particle.
            this.neighbors = new Set();
        }

        Particle.prototype = {
            constructor: Particle,
            // ff is the follower object. Stands for force field.
            update: function update(ff) {
                // First force. Motivates particle to return to original position. Note this is like Hooke's law, using spring constant.
                this.x += (this.ox - this.x) * particleResponsiveness;
                this.y += (this.oy - this.y) * particleResponsiveness;
                // this.x += Math.sign(this.ox - this.x) * Math.pow(Math.abs(this.ox - this.x), 1/2) * particleResponsiveness;
                // this.y += Math.sign(this.oy - this.y) * Math.pow(Math.abs(this.oy - this.y), 1/2) * particleResponsiveness;

                // Second force. Math below considers follower at origin, and particle at end of direction vector.
                var dx = this.x - ff.x;
                var dy = this.y - ff.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                var a = Math.atan2(dy, dx);
                // var f = ff.strength * this.r * this.r * Math.sqrt(this.r) / Math.sqrt(d);
                var f = ff.strength * this.r * this.r / Math.sqrt(d);
                this.x += Math.cos(a) * f;
                this.y += Math.sin(a) * f;

                // Third force. Spring interactions between a particle and its neighbors.
                function interparticleForce(neighborIndex, value2, set) {
                    var neighbor = particles[neighborIndex];
                    var dx = neighbor.x - this.x;
                    var dy = neighbor.y - this.y;
                    var d = Math.sqrt(dx * dx + dy * dy);
                    var a = Math.atan2(dy, dx);
                    var f = (d - connectionDistance) * connectionResponsiveness;
                    this.x += Math.cos(a) * f / 2;
                    this.y += Math.sin(a) * f / 2;
                    neighbor.x -= Math.cos(a) * f / 2;
                    neighbor.y -= Math.sin(a) * f / 2;
                }
                this.neighbors.forEach(interparticleForce.bind(this));
            },
            //The following just draws the particles. Doesn't connect or force them.
            render: function render(ctx) {
                ctx.fillStyle = graphColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        var timeoutID;
        var reduceForce;
        function mouseResting() {
            reduceForce = true;
        }
        // Maybe each mouse session in the canvas should spawn a new follower. When mouse leaves, that follower should fade to zero. Will this cause memory leak?
        parent.addEventListener('mouseover', function (e) {
            // Put the position of force ball at the hovering mouse.
            follower.x = e.clientX;
            follower.y = e.clientY;
        });
        parent.addEventListener('mouseout', function (e) {
            // Effectively remove the force ball, since mouse isn't present. Should fade to zero, since direct cut is very noticeable.
            // follower.strength = 0;
        });
        // Sets mx/y to be distance to mouse from canvas edges.
        parent.addEventListener('mousemove', function (e) {
            // Have the force ball reappear and put its position at the moving mouse.
            window.clearTimeout(timeoutID);
            reduceForce = false;
            follower.strength = forceStrength;
            var rect = c.getBoundingClientRect();
            mx = e.clientX - rect.left;
            my = e.clientY - rect.top;
            timeoutID = window.setTimeout(mouseResting, unforceDelay * 1000);
        });

        var activePartitions = partitionCount - partitionDeadZoneCount;
        var uniformWeights = Array.apply(null, { length: partitionCount }).map(function (value, index) {
            if (index < activePartitions) {
                return 1 / activePartitions;
            } else {
                return 0;
            }
        });
        var linWeights = Array.apply(null, { length: partitionCount }).map(function (value, index) {
            return Math.max(0, 2 * (activePartitions - index) / (activePartitions * (activePartitions + 1)));
        });
        var expWeights = Array.apply(null, { length: partitionCount }).map(function (value, index) {
            if (index < activePartitions) {
                return Math.pow(partitionShrinkRate, index) * (1 - partitionShrinkRate) / (1 - Math.pow(partitionShrinkRate, activePartitions));
            } else {
                return 0;
            }
        });
        function getRandom(weights, partitionCount, partitionDeadZoneCount) {
            // Values to return
            var results = Array.apply(null, { length: partitionCount }).map(function (value, index) {
                return index / partitionCount;
            });
            var sample = Math.random();
            var cumulative = 0;
            for (var i = 0; i < results.length; ++i) {
                cumulative += weights[i];
                if (sample <= cumulative) {
                    return results[i] + Math.random() / partitionCount;
                }
            }
            return results[results.length] + Math.random() / partitionCount;
        };

        var particles = [];
        var particle;
        for (var i = 0; i < count; i++) {
            // particle = new Particle(Math.random() * w, Math.random() * h);
            particle = new Particle(Math.random() * w, getRandom(uniformWeights, partitionCount, partitionDeadZoneCount) * h);
            // particle = new Particle(Math.random() * w, getRandom(linWeights, partitionCount, partitionDeadZoneCount) * h);
            // particle = new Particle(Math.random() * w, getRandom(expWeights, partitionCount, partitionDeadZoneCount) * h);
            particles.push(particle);
        }

        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var p1 = particles[i];
                var p2 = particles[j];
                var dx = p1.x - p2.x;
                var dy = p1.y - p2.y;
                var d = Math.sqrt(dx * dx + dy * dy);

                var a = Math.atan2(dy, dx);
                var f = particleRepelStrength / Math.sqrt(d);
                p1.x += Math.cos(a) * f;
                p1.y += Math.sin(a) * f;
                p2.x -= Math.cos(a) * f;
                p2.y -= Math.sin(a) * f;
                p1.ox += Math.cos(a) * f;
                p1.oy += Math.sin(a) * f;
                p2.ox -= Math.cos(a) * f;
                p2.oy -= Math.sin(a) * f;
            }
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        var graphRGB = hexToRgb(graphColor);

        // Recursive animation loop. Should it really be running, even when mouse is nowhere near? Maybe optimize behaviour later.
        requestAnimationFrame(function loop() {

            // Reset javascript canvas width and height to be that of html canvas element (yes they are different, the js ones are a
            // scaling thing independent of the dom element's properties). Doing so ensures that graph drawn in canvas doesn't get
            // scaled/warped when user resizes browser.
            w = c.width = c.clientWidth;
            h = c.height = c.clientHeight;

            ctx.clearRect(0, 0, w, h);
            // Set canvas background color
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, c.width, c.height);

            follower.x += (mx - follower.x) * followerResponsiveness;
            follower.y += (my - follower.y) * followerResponsiveness;
            if (reduceForce) {
                follower.strength -= follower.strength * unforceResponsiveness;
            }

            for (var i = 0, len = particles.length; i < len; i++) {
                var particle = particles[i];
                particle.update(follower);
                particle.render(ctx); // Why do we pass in ctx when it's a global?
            }

            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var p1 = particles[i];
                    var p2 = particles[j];
                    var dx = p1.x - p2.x;
                    var dy = p1.y - p2.y;
                    var d = Math.sqrt(dx * dx + dy * dy);

                    if (d < adjacencyDistance) {
                        p1.neighbors.add(j);

                        // ctx.strokeStyle = graphColor;
                        var opacity = 1 / (strokeOpacityFactor * adjacencyDistance) * (adjacencyDistance - d);
                        ctx.strokeStyle = 'rgba(' + graphRGB.r + ',' + graphRGB.g + ',' + graphRGB.b + ',' + opacity + ')';
                        ctx.lineWidth = lineWidth;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    } else {
                        p1.neighbors.delete(j);
                    }
                }
            }

            requestAnimationFrame(loop);
        });
    }

    /***/
},
/* 3 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = animateSVGs;
    // Modification of https://codepen.io/simoncodrington/pen/Mwgqqd

    function animateSVGs() {
        'use strict';

        /* Interactivity to determine when an animated element in in view. In view elements trigger our animation*/

        $(document).ready(function () {

            // fetches the document for the given embedding_element
            function getSubDocument(embedding_element) {
                if (embedding_element.contentDocument) {
                    return embedding_element.contentDocument;
                } else {
                    var subdoc = null;
                    try {
                        subdoc = embedding_element.getSVGDocument();
                    } catch (e) {}
                    return subdoc;
                }
            }

            var svgObjects = document.querySelectorAll(".illustration");
            // console.log(svgObjects);

            $.each(svgObjects, function () {
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

                return function () {
                    // get current window information
                    var web_window = $(window);
                    var window_height = web_window.height();
                    var window_top_position = web_window.scrollTop();
                    var window_bottom_position = window_top_position + window_height;
                    // see if its in view
                    // get the element's information
                    var element = svgObject;
                    var element_height = $(element).outerHeight();
                    var element_top_position = $(element).offset().top;
                    var element_bottom_position = element_top_position + element_height;
                    // console.log(element_height, element_top_position, element_bottom_position);
                    // check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
                    if (element_bottom_position >= window_top_position && element_top_position <= window_bottom_position) {
                        // element.addClass('in-view');
                        svgElement.classList.add('in-view');
                    } else {
                        // element.removeClass('in-view');
                        svgElement.classList.remove('in-view');
                    }
                };
            }
        });
    }

    /***/
},
/* 4 */
/***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = typingCarousel;
    function typingCarousel() {
        'use strict';

        var TxtRotate = function TxtRotate(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 5000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtRotate.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span id="typingCarousel">' + this.txt + '</span>';

            var that = this;
            var delta = 300 - Math.random() * 150;

            if (this.isDeleting) {
                delta /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period + Math.random() * 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function () {
                that.tick();
            }, delta);
        };

        window.onload = function () {
            var elements = document.getElementsByClassName('txt-rotate');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-rotate');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtRotate(elements[i], JSON.parse(toRotate), period);
                }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            var cssDoc = "\
    #typingCarousel {\
     border-right: 0.08em solid #000;\
     animation: blink-caret .6s step-end infinite alternate; }\
    @keyframes blink-caret { 50% { border-color: transparent; } }";
            css.innerHTML = cssDoc;
            document.body.appendChild(css);
        };
    }

    /***/
}]
/******/);