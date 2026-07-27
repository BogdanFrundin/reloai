import confetti from "canvas-confetti";

export function fireConfetti() {
  const colors = ["#2155d4", "#5b8def", "#ffffff", "#f5c542"];
  const duration = 1800;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors,
      startVelocity: 45,
      scalar: 1.1,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors,
      startVelocity: 45,
      scalar: 1.1,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.4 },
    colors,
    startVelocity: 55,
    gravity: 0.9,
    scalar: 1.2,
  });
}
