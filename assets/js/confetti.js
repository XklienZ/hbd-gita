const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let DPR = window.devicePixelRatio || 1;

function resize() {
  canvas.width = window.innerWidth * DPR;
  canvas.height = window.innerHeight * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener("resize", resize);
resize();

const colors = [
  "#f94144",
  "#f3722c",
  "#f9c74f",
  "#90be6d",
  "#577590",
  "#43aa8b",
  "#f9844a",
  "#277da1",
];

const gravity = 0.12;

class Confetto {
  constructor(fromLeft) {
    this.y = window.innerHeight * 0.75 + Math.random() * 50;
    this.x = fromLeft ? -10 : window.innerWidth + 10;

    const size = 6 + Math.random() * 4;
    this.w = size;
    this.h = size;

    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.vx = fromLeft ? 2 + Math.random() * 2 : -2 - Math.random() * 2;
    this.vy = -4 - Math.random() * 8;

    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.vy += gravity;

    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.spin;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}

let confetti = [];

export function spawnConfetti(amount = 50) {
  for (let i = 0; i < amount; i++) {
    confetti.push(new Confetto(true));
    confetti.push(new Confetto(false));
  }
}

export function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confetti.length - 1; i >= 0; i--) {
    const c = confetti[i];
    c.update();
    c.draw(ctx);

    if (
      c.x < -50 ||
      c.x > window.innerWidth + 50 ||
      c.y > window.innerHeight + 50
    ) {
      confetti.splice(i, 1);
    }
  }

  requestAnimationFrame(loop);
}
