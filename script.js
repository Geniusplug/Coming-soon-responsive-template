const canvas = document.getElementById('luxury-particles');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Very slow, subtle movement
        this.directionX = (Math.random() * 0.4) - 0.2;
        this.directionY = (Math.random() * 0.4) - 0.2;
        // Small, varied sizes
        this.size = (Math.random() * 2) + 0.1;
        // Gold/Amber luxury colors with varying opacity
        const colors = ['rgba(253, 216, 53, ', 'rgba(255, 193, 7, ', 'rgba(255, 255, 255, '];
        const randomColorStr = colors[Math.floor(Math.random() * colors.length)];
        this.color = randomColorStr + (Math.random() * 0.4 + 0.1) + ')';
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Method to check particle position, move the particle, draw the particle
    update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        
        // Draw particle
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    // Adjust number of particles based on screen size for performance
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

// Resize event
window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
);

init();
animate();