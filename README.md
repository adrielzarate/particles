
# Prtcls

Small particles plugin in HTML5 canvas, based in the great library [particles.js](https://vincentgarreau.com/particles.js/)

## How to use

Just include the js  file in your HTML and call the *prtcls* function with the canvas width, height and context

```
<canvas id="canvas"></canvas>
<script src="prtcls.js"></script>
<script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    prtcls(W, H, ctx);
</script>
```

Alternatively, you can pass a fourth parameter as a configuration object.

```
const prtclsSettings = {
    particlesQuantity: 200,         // number of particles
    particleSize: 5,                // size of each particle in px
    particleShape: 'star',          // squad, circle, star or line
    particleMinSpeed: 0.2,          // minimum value for random speed
    particleMaxSpeed: 2,            // maximun value for random speed
    particleColor: '#000000',       // particles color
    lineColor: 'rgba(0, 0, 0, .1)', // lines color
    minLineDistance: 80             // minimum distance to show a line
};

prtcls(W, H, ctx, prtclsSettings);
```