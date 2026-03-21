const slides = Array.from(document.querySelectorAll(".slide"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const railDots = Array.from(document.querySelectorAll(".rail-dot"));
const progressBar = document.getElementById("progressBar");
const metaIndex = document.getElementById("metaIndex");
const metaTitle = document.getElementById("metaTitle");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.22 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const slideObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const activeId = visible.target.id;
    const index = slides.findIndex((slide) => slide.id === activeId);

    slides.forEach((slide) => slide.classList.toggle("active", slide.id === activeId));
    railDots.forEach((dot) => dot.classList.toggle("active", dot.dataset.target === activeId));

    if (progressBar) {
      progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
    }
    if (metaIndex) {
      metaIndex.textContent = String(index + 1).padStart(2, "0");
    }
    if (metaTitle) {
      metaTitle.textContent = visible.target.dataset.title || activeId;
    }
  },
  { threshold: 0.55 }
);

slides.forEach((slide) => slideObserver.observe(slide));

railDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = document.getElementById(dot.dataset.target);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("keydown", (event) => {
  const currentIndex = slides.findIndex((slide) => slide.classList.contains("active"));
  if (currentIndex < 0) return;

  if (event.key === "ArrowDown" || event.key === "PageDown") {
    slides[Math.min(currentIndex + 1, slides.length - 1)]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (event.key === "ArrowUp" || event.key === "PageUp") {
    slides[Math.max(currentIndex - 1, 0)]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});
