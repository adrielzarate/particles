function particles(canvasW, canvasH, ctx, customSettings) {

    let settings = {
        particlesQuantity: 200,
        particleSize: 5, // px
        particleShape: 'squad', // squad, circle, star, nothing
        particleMinSpeed: 0.2,
        particleMaxSpeed: 2,
        particleColor: '#000000',
        lineColor: 'rgba(0, 0, 0, .1)',
        minLineDistance: 50
    };

    if(customSettings) {
        settings = {
            particlesQuantity: customSettings.particlesQuantity || settings.particlesQuantity,
            particleSize: customSettings.particleSize || settings.particleSize,
            particleShape: customSettings.particleShape || settings.particleShape,
            particleMinSpeed: customSettings.particleMinSpeed || settings.particleMinSpeed,
            particleMaxSpeed: customSettings.particleMaxSpeed || settings.particleMaxSpeed,
            particleColor: customSettings.particleColor || settings.particleColor,
            lineColor: customSettings.lineColor || settings.lineColor,
            minLineDistance: customSettings.minLineDistance || settings.minLineDistance,
        };
    }

    const particles = [];

    function getRandomNumberFromRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomBoolean() {
        return Math.random() >= 0.5;
    }

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.right = getRandomBoolean();
        this.bottom = getRandomBoolean();
        this.speed = getRandomNumberFromRange(settings.particleMinSpeed, settings.particleMaxSpeed);
        this.updatePostion = function() {

            if( this.x < W && this.right) {
                this.x += this.speed;
            }

            if( this.x > W && this.right) {
                this.right = false;
                this.x -= this.speed;
            }

            if( this.x > 0 && !this.right) {
                this.x -= this.speed;
            }

            if( this.x < 0 && !this.right) {
                this.right = true;
                this.x += this.speed;
            }

            if( this.y < H && this.bottom) {
                this.y += this.speed;
            }

            if( this.y > H && this.bottom) {
                this.bottom = false;
                this.y -= this.speed;
            }

            if( this.y > 0 && !this.bottom) {
                this.y -= this.speed;
            }

            if( this.y < 0 && !this.bottom) {
                this.bottom = true;
                this.y += this.speed;
            }
        };
    }

    function createParticles() {
        for(let i = 0; i < settings.particlesQuantity; i++) {
            particles.push(new Particle(getRandomNumberFromRange(0, canvasW), getRandomNumberFromRange(0, canvasH)));
        }
    }

    function updateParticlePosition() {
        for(let i = 0; i < particles.length; i++) {
            particles[i].updatePostion();
            drawParticle(particles[i].x, particles[i].y);
        }
    }

    function drawStar(cx, cy, wh) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / 5;

        ctx.beginPath();
        ctx.moveTo(cx, cy - wh);
        for (let i = 0; i < 5; i++) {
            x = cx + Math.cos(rot) * wh;
            y = cy + Math.sin(rot) * wh;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * (wh/2);
            y = cy + Math.sin(rot) * (wh/2);
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - wh);
        ctx.closePath();
        ctx.fill();

    }

    function drawParticle(x, y) {
        ctx.beginPath();
        ctx.fillStyle = settings.particleColor;
        switch (settings.particleShape) {
        case 'circle':
            ctx.arc(x, y, settings.particleSize/2, 0, 2 * Math.PI);
            ctx.fill();
            break;
        case 'star':
            drawStar(x, y, settings.particleSize);
            break;
        case 'squad':
            ctx.fillRect(x - settings.particleSize/2, y - settings.particleSize/2, settings.particleSize, settings.particleSize);
            break;
        default:
            // nothing
            break;
        }
    }

    function drawProximityLines() {
        for(let i = 0; i < particles.length; i++) {
            for(let j = 0; j < particles.length; j++) {
                const xDiff = Math.abs(particles[i].x - particles[j].x);
                const yDiff = Math.abs(particles[i].y - particles[j].y);
                if( xDiff < settings.minLineDistance && yDiff < settings.minLineDistance ) {
                    ctx.strokeStyle = settings.lineColor;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvasW, canvasH);
        updateParticlePosition();
        drawProximityLines();
        requestAnimationFrame(draw);
    }

    createParticles();
    draw();
}