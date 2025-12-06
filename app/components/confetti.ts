// app/components/confetti.ts
export function emojiConfetti(x: number, y: number) {
  const emojis = ["👏", "🌟", "💖", "✨", "🔥"];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.position = "fixed";
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.pointerEvents = "none";
    span.style.fontSize = `${Math.random() * 24 + 12}px`;
    span.style.opacity = "1";
    span.style.transition = "transform 1s ease-out, opacity 1s ease-out";

    document.body.appendChild(span);

    const dx = (Math.random() - 0.5) * 300;
    const dy = (Math.random() - 0.5) * 300;

    requestAnimationFrame(() => {
      span.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)`;
      span.style.opacity = "0";
    });

    setTimeout(() => span.remove(), 1000);
  }
}
