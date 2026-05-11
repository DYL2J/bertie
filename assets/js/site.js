(() => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("js");

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const article = document.querySelector("article");

  if (article) {
    const progress = document.createElement("div");
    progress.className = "reading-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.append(progress);

    const updateProgress = () => {
      const start = article.offsetTop;
      const end = start + article.offsetHeight - window.innerHeight;
      const distance = Math.max(end - start, 1);
      const amount = Math.min(Math.max((window.scrollY - start) / distance, 0), 1);
      progress.style.transform = `scaleX(${amount})`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const revealItems = document.querySelectorAll(
    ".post-card, .article-hero, .article-body, .media-block, .image-pair, .about-grid, .article-footer, .site-footer"
  );

  if (revealItems.length && !reducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => {
      item.setAttribute("data-reveal", "");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".post-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
        card.classList.add("is-active");
      });

      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--mx");
        card.style.removeProperty("--my");
        card.classList.remove("is-active");
      });
    });
  }
})();
