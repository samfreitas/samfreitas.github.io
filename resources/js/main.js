
// Header canvas behaviour
// Modification of https://codepen.io/gotoandplaynowtoo/pen/dJYyWq
(function() {
        'use strict';

        var maxStrength = 150;
        var count = 150; // Particle count.
        var followerResponsiveness = 0.1;
        var particleResponsiveness = 0.1;
        var lineWidth = 3;
        var adjacencyDistance = 100;
        var backgroundColor = '#2E4589';
        var lineColor = '202, 62, 51';
        // var backgroundColor = '#000000';
        // var lineColor = '255, 255, 255';

        var c = document.getElementsByClassName('headerCanvas')[0];
        var ctx = c.getContext('2d');
        var parent = c.parentNode; // We will set the event handlers on the parent of the canvas, so that any elements that are siblings
        // to this canvas, that happen to lie on top of the canvas, will still set off events when hovered over. That way buttons on top
        // of the canvas still make nodes dance around when cursor hovers to click it.

        // ...then set the internal size to match
        var w = c.width  = c.offsetWidth;
        var h = c.height = c.offsetHeight;
        // var w = c.width;
        // var h = c.height;

        // var w = c.width = window.innerWidth;
        // var h = c.height = window.innerHeight;
        var cx = w / 2;
        var cy = h / 2;
        var mx = w / 2;
        var my = h / 2;
        var currentStrength = 0;

        var follower = {
            x: cx,
            y: cy,
            // r: 20 // Radius of the trailing force ball, but it only effects the size of the ball when drawn, not force radius.
        };

        // What's this?
        ctx.fillStyle = 'white';

        function Particle(x, y) {
            this.x = x;
            this.y = y;
            this.ox = x; // Initial positions
            this.oy = y;
            this.an = Math.random() * Math.PI * 2; // Initial flashing start point (so not synchronized).
            this.san = Math.random() * 0.01; // Rate of flashing, for the ones that do.
            this.alpha = Math.random(); // Opacity of particles.
            this.oalpha = this.alpha; // Initial opacity.
            this.r = 1 + Math.random() * 4; //* 4; // Radius of particle.
        }

        Particle.prototype = {
            constructor: Particle,
            // ff is the follower object.
            update: function(ff) {
                var dx = this.x - ff.x;
                var dy = this.y - ff.y;
                // Distance and angle derived with follower at origin, and particle at end of direction vector.
                var d = Math.sqrt(dx * dx + dy * dy);
                var a = Math.atan2(dy, dx);
                var f = currentStrength / Math.sqrt(d);
                // var f = 10 * maxStrength / d;
                this.x += (this.ox - this.x) * particleResponsiveness;
                this.y += (this.oy - this.y) * particleResponsiveness;
                this.x += Math.cos(a) * f;
                this.y += Math.sin(a) * f;
                this.alpha = this.oalpha * Math.abs(Math.cos(this.an));
                this.an += this.san;
            },
            //The following just draws the particles. Doesn't connect or force them.
            render: function(ctx) {
                ctx.fillStyle = 'rgba(' + lineColor + ', ' + this.alpha + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        parent.addEventListener('mouseover', function(e) {
            // Have the force ball reappear and put its position at the hovering mouse.
            currentStrength = maxStrength;
            follower.x = e.clientX;
            follower.y = e.clientY;
        });
        parent.addEventListener('mouseout', function(e) {
            // Effectively remove the force ball, since mouse isn't present.
            currentStrength = 0;
        });
        // I think this sets mx/y to be distance to mouse from canvas edges.
        parent.addEventListener('mousemove', function(e) {
            var rect = c.getBoundingClientRect();
            mx = e.clientX - rect.left;
            my = e.clientY - rect.top;
        });

        var particles = [];
        var particle;
        for(var i = 0; i < count; i++) {
            particle = new Particle(Math.random() * w, Math.random() * h);
            particles.push(particle);
        }

        // Recursive animation loop. Should it really be running, even when mouse is nowhere near? Maybe optimize behaviour later.
        requestAnimationFrame(function loop() {
            requestAnimationFrame(loop);

            ctx.clearRect(0, 0, w, h);
            // Set canvas background color
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, c.width, c.height);
          
            follower.x += (mx - follower.x) * followerResponsiveness;
            follower.y += (my - follower.y) * followerResponsiveness;

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
                        ctx.strokeStyle = 'rgba(' + lineColor + ',' + p1.alpha + ')';
                        ctx.lineWidth = lineWidth;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw trailing force ball. For debugging. Be sure to toggle on follower.r before drawing.
            // ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            // ctx.fillStyle = 'red';
            // ctx.lineWidth = 4;
            // ctx.beginPath();
            // ctx.arc(follower.x, follower.y, follower.r, 0, Math.PI * 2);
            // ctx.stroke();
            // ctx.fill();
        });

    })();