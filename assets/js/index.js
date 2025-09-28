import { loop, spawnConfetti } from "./confetti.js";

const canvas = document.getElementById("flameCanvas");
const ctx = canvas.getContext("2d");

let isFlameOn = true;
let flameOpacity = 0;
let flameScale = 0.3;

function drawFlame(ctx, x, y, t, opacity, scaleExtra) {
  const flicker = Math.sin(t * 0.005) * 5 + (Math.random() - 0.5) * 4;
  const scale =
    (1 + Math.sin(t * 0.006) * 0.05 + (Math.random() - 0.5) * 0.04) *
    scaleExtra;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.globalAlpha = opacity;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-15, -20, -10, -60 + flicker, 0, -100 + flicker);
  ctx.bezierCurveTo(10, -60 + flicker, 15, -20, 0, 0);
  ctx.closePath();

  const gradient = ctx.createLinearGradient(0, -100, 0, 0);
  gradient.addColorStop(0, "#ffffb0");
  gradient.addColorStop(0.5, "#ffb400");
  gradient.addColorStop(1, "#ff4800");
  ctx.fillStyle = gradient;

  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgba(255,150,0,0.7)";

  ctx.fill();
  ctx.restore();
}

function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (isFlameOn) {
    if (flameOpacity < 1) flameOpacity += 0.02;
    if (flameScale < 1) flameScale += 0.02;
  } else {
    if (flameOpacity > 0) flameOpacity -= 0.3;
    if (flameScale < 3) flameScale += 0.3;
  }

  if (flameOpacity > 0) {
    drawFlame(
      ctx,
      canvas.width / 2,
      canvas.height / 2 + 50,
      time,
      flameOpacity,
      flameScale
    );
  }

  requestAnimationFrame(animate);
}

function toggleFlame() {
  if (isFlameOn) isFlameOn = !isFlameOn;
  const clickInfo = document.querySelector(".click-info");
  const banner = document.querySelector(".banner");
  banner.classList.add("active");
  clickInfo.style.display = "none";
  spawnConfetti(100);
}
if (document.body.style.display !== "none") {
  loop();
  setTimeout(() => {
    requestAnimationFrame(animate);
    setTimeout(() => {
      canvas.addEventListener("click", toggleFlame);
      canvas.addEventListener("touchstart", toggleFlame);

      const clickInfo = document.querySelector(".click-info");
      clickInfo.classList.add("active");
    }, 500);
  }, 3200);
}
