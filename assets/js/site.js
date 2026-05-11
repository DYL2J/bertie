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

  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.textContent = "Back to top";
  backToTop.setAttribute("aria-label", "Back to top");
  document.body.append(backToTop);

  const setBackToTopState = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 520);
  };

  setBackToTopState();
  window.addEventListener("scroll", setBackToTopState, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  const article = document.querySelector(".article-shell > article");

  if (article) {
    const progress = document.createElement("div");
    const progressBar = document.createElement("span");
    progress.className = "reading-progress";
    progress.setAttribute("aria-hidden", "true");
    progress.append(progressBar);
    document.body.append(progress);

    const articleText = Array.from(article.querySelectorAll(".article-body"))
      .map((section) => section.textContent.trim())
      .join(" ");
    const words = articleText.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 225));
    const meta = article.querySelector(".article-meta");

    if (meta && words) {
      const readingTime = document.createElement("span");
      readingTime.className = "reading-time";
      readingTime.textContent = `${minutes} min read`;
      meta.append(readingTime);
    }

    const updateProgress = () => {
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      const start = article.offsetTop;
      const end = start + article.offsetHeight - window.innerHeight;
      const distance = Math.max(end - start, 1);
      const amount = Math.min(Math.max((window.scrollY - start) / distance, 0), 1);
      progress.style.top = `${Math.max(headerBottom, 0)}px`;
      progressBar.style.transform = `scaleX(${amount})`;
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
      { rootMargin: "0px 0px 12% 0px", threshold: 0.02 }
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
