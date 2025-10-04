async function fetchContributors() {
  const elList = document.getElementById("contributors");
  const elCount = document.getElementById("count");
  const elLoading = document.getElementById("loading");
  const elError = document.getElementById("error");

  // Resolve repo URL automatically on GitHub Pages, or use a provided override
  function detectRepoUrl() {
    try {
      if (location.hostname.endsWith("github.io")) {
        const owner = location.hostname.split(".")[0];
        const parts = location.pathname.split("/").filter(Boolean);
        const repo = parts[0] || "firstleaf";
        return `https://github.com/${owner}/${repo}`;
      }
    } catch {}
    return (window.SICKSTICKS && window.SICKSTICKS.repoUrl) || "";
  }

  const resolvedRepoUrl = detectRepoUrl();
  const repoLink = document.getElementById("repoLink");
  if (repoLink && resolvedRepoUrl) {
    repoLink.href = resolvedRepoUrl;
  } else if (repoLink) {
    repoLink.remove();
  }

  try {
    const res = await fetch("./data/contributors.ndjson", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Network error");
    const text = await res.text();
    const lines = text
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);
    const people = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    people.sort(
      (a, b) =>
        (b.addedAt || "").localeCompare(a.addedAt || "") ||
        (a.name || "").localeCompare(b.name || "")
    );

    const contributorElements = [];

    elList.innerHTML = "";
    for (const p of people) {
      const a = document.createElement("a");
      const profileUrl =
        p.github || (p.username ? `https://github.com/${p.username}` : "#");
      a.href = profileUrl;
      a.target = "_blank";
      a.rel = "noopener";
      a.ariaLabel = `Open ${p.name || p.username || "contributor"} on GitHub`;

      const card = document.createElement("div");
      card.className = "card";
      card.role = "listitem";

      const top = document.createElement("div");
      top.className = "top";

      const img = document.createElement("img");
      img.src =
        p.avatar || `https://avatars.githubusercontent.com/${p.username || ""}`;
      img.alt = `${p.name || p.username || "Contributor"} avatar`;
      img.loading = "lazy";

      const info = document.createElement("div");
      const name = document.createElement("div");
      name.className = "name";
      name.textContent = p.name || "Anonymous";

      const username = document.createElement("div");
      username.className = "username";
      username.textContent = p.username ? `@${p.username}` : "";

      info.appendChild(name);
      info.appendChild(username);

      top.appendChild(img);
      top.appendChild(info);

      const meta = document.createElement("div");
      meta.className = "meta";
      if (p.message) meta.textContent = p.message;

      card.appendChild(top);
      if (p.message) card.appendChild(meta);

      a.appendChild(card);
      elList.appendChild(a);

      // Cache element and searchable data
      contributorElements.push({
        element: a,
        name: (p.name || "").toLowerCase(),
        username: (p.username || "").toLowerCase(),
      });
    }

    // Set up search functionality once, outside the loop
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();

        contributorElements.forEach(({ element, name, username }) => {
          if (name.includes(searchTerm) || username.includes(searchTerm)) {
            element.style.display = "";
          } else {
            element.style.display = "none";
          }
        });
      });
    }

    elCount.textContent = `${people.length} contributor${
      people.length === 1 ? "" : "s"
    }`;
    elLoading.remove();
  } catch (err) {
    console.error(err);
    elError.hidden = false;
    elLoading.remove();
  }
}

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  // Toggle theme on button click
  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

function initScrollToTop() {
  const scrollButton = document.getElementById('scrollToTop');
  if (!scrollButton) return;

  let isScrolling;

  function toggleScrollButton() {
    const scrollThreshold = 400;

    if (window.pageYOffset > scrollThreshold) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Throttled scroll handler
  window.addEventListener('scroll', () => {
    // Clear timeout if it exists
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(toggleScrollButton, 50);
  });

  scrollButton.addEventListener('click', scrollToTop);

  // Keyboard support
  scrollButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  // Initial check
  toggleScrollButton();
}

function boot() {
  fetchContributors();
  initThemeToggle();
  initScrollToTop();
}

boot();