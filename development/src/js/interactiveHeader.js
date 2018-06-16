// Header canvas behaviour
// Modification of https://codepen.io/gotoandplaynowtoo/pen/dJYyWq
export default function interactiveHeader() {
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
    var graphColor =  '#5D7634';

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
        update: function(ff) {
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
        render: function(ctx) {
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
    parent.addEventListener('mouseover', function(e) {
        // Put the position of force ball at the hovering mouse.
        follower.x = e.clientX;
        follower.y = e.clientY;
    });
    parent.addEventListener('mouseout', function(e) {
        // Effectively remove the force ball, since mouse isn't present. Should fade to zero, since direct cut is very noticeable.
        // follower.strength = 0;
    });
    // Sets mx/y to be distance to mouse from canvas edges.
    parent.addEventListener('mousemove', function(e) {
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
    var uniformWeights = Array.apply(null, {length: partitionCount}).map(
        function(value, index){ 
            if (index < activePartitions) {
                return 1 / activePartitions; 
            } else {
                return 0;
            }
        }
    );
    var linWeights = Array.apply(null, {length: partitionCount}).map(
        function(value, index){ 
            return Math.max( 0, 2 * (activePartitions - index) / (activePartitions * (activePartitions + 1))); 
        }
    );
    var expWeights = Array.apply(null, {length: partitionCount}).map(
        function(value, index){ 
            if (index < activePartitions) {
                return Math.pow(partitionShrinkRate, index) * (1 - partitionShrinkRate) / ( 1 - Math.pow(partitionShrinkRate, activePartitions) ); 
            } else {
                return 0;
            }
        }
    );
    function getRandom (weights, partitionCount, partitionDeadZoneCount) {
        // Values to return
        var results = Array.apply(null, {length: partitionCount}).map(
            function(value, index){ return index / partitionCount; });
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
    for(var i = 0; i < count; i++) {
        // particle = new Particle(Math.random() * w, Math.random() * h);
        particle = new Particle(Math.random() * w, getRandom(uniformWeights, partitionCount, partitionDeadZoneCount) * h);
        // particle = new Particle(Math.random() * w, getRandom(linWeights, partitionCount, partitionDeadZoneCount) * h);
        // particle = new Particle(Math.random() * w, getRandom(expWeights, partitionCount, partitionDeadZoneCount) * h);
        particles.push(particle);
    }

    for(var i = 0; i < particles.length; i++) {
        for(var j = i + 1; j < particles.length; j++) {
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

        for(var i = 0, len = particles.length; i < len; i++) {
            var particle = particles[i];
            particle.update(follower);
            particle.render(ctx); // Why do we pass in ctx when it's a global?
        }

        for(var i = 0; i < particles.length; i++) {
            for(var j = i + 1; j < particles.length; j++) {
                var p1 = particles[i];
                var p2 = particles[j];
                var dx = p1.x - p2.x;
                var dy = p1.y - p2.y;
                var d = Math.sqrt(dx * dx + dy * dy);

                if(d < adjacencyDistance) {
                    p1.neighbors.add(j);

                    // ctx.strokeStyle = graphColor;
                    var opacity = (1 / (strokeOpacityFactor * adjacencyDistance)) * (adjacencyDistance - d);
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
