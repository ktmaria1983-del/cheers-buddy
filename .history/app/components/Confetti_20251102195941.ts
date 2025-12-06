// app/components/confetti.ts
export function emojiConfetti(emoji = "👏", count = 12) {
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.textContent = emoji;
    span.style.position = "fixed";
    span.style.left = Math.random() * window.innerWidth + "px";
    span.style.top = "100vh";
    span.style.fontSize = "1.5rem";
    span.style.opacity = "0.9";
    span.style.pointerEvents = "none";
    span.style.zIndex = "9999";
    document.body.appendChild(span);

    const x = (Math.random() - 0.5) * 400;
    const y = 300 + Math.random() * 200;
    const rotate = (Math.random() - 0.5) * 720;

    span.animate(
      [
        { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x}px,-${y}px) rotate(${rotate}deg)`, opacity: 0 },
      ],
      {
        duration: 1500 + Math.random() * 800,
        easing: "ease-out",
        fill: "forwards",
      }
    ).onfinish = () => span.remove();
  }
}
