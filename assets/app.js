async function fetchContributors() {
  const elList = document.getElementById("contributors");
  const elCount = document.getElementById("count");
  const elLoading = document.getElementById("loading");
  const elError = document.getElementById("error");
  const sortSelect = document.getElementById("sortSelect");

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

    function sortContributors(contributors, sortType) {
      const sorted = [...contributors];
      switch (sortType) {
        case "newest":
          sorted.sort(
            (a, b) =>
              (b.addedAt || "").localeCompare(a.addedAt || "") ||
              (a.name || "").localeCompare(b.name || "")
          );
          break;
        case "oldest":
          sorted.sort(
            (a, b) =>
              (a.addedAt || "").localeCompare(b.addedAt || "") ||
              (a.name || "").localeCompare(b.name || "")
          );
          break;
        case "name-asc":
          sorted.sort((a, b) =>
            (a.name || a.username || "").localeCompare(
              b.name || b.username || ""
            )
          );
          break;
        case "name-desc":
          sorted.sort((a, b) =>
            (b.name || b.username || "").localeCompare(
              a.name || b.username || ""
            )
          );
          break;
        default:
          sorted.sort(
            (a, b) =>
              (b.addedAt || "").localeCompare(a.addedAt || "") ||
              (a.name || "").localeCompare(b.name || "")
          );
      }
      return sorted;
    }

    function renderContributors(contributors) {
      elList.innerHTML = "";
      const contributorElements = [];

      // Find the newest contributor once (based on addedAt)
      const newestContributor = contributors.reduce((latest, curr) => {
        if (!latest) return curr;
        if ((curr.addedAt || "") > (latest.addedAt || "")) {
          return curr;
        }
        return latest;
      }, null);

      for (let i = 0; i < contributors.length; i++) {
        const p = contributors[i];
        const a = document.createElement("a");
        const profileUrl =
          p.github || (p.username ? `https://github.com/${p.username}` : "#");
        a.href = profileUrl;
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute(
          "aria-label",
          `Open ${p.name || p.username || "contributor"} on GitHub`
        );

        // Create card container
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";

        // Create card element
        const card = document.createElement("div");
        card.className = "card";
        card.role = "listitem";

        // Create card front and back
        const cardFront = document.createElement("div");
        cardFront.className = "card-face card-front";

        const cardBack = document.createElement("div");
        cardBack.className = "card-face card-back";

        // Flip icon for front
        const flipIconFront = document.createElement("button");
        flipIconFront.className = "flip-icon";
        flipIconFront.setAttribute("aria-label", "Flip card");
        flipIconFront.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h6m0 0l-3-3m3 3l-3 3m13-3h6m0 0l-3-3m3 3l-3 3M9 19V5a2 2 0 012-2h2a2 2 0 012 2v14"/></svg>';

        // Flip icon for back
        const flipIconBack = document.createElement("button");
        flipIconBack.className = "flip-icon";
        flipIconBack.setAttribute("aria-label", "Flip card back");
        flipIconBack.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h6m0 0l-3-3m3 3l-3 3m13-3h6m0 0l-3-3m3 3l-3 3M9 19V5a2 2 0 012-2h2a2 2 0 012 2v14"/></svg>';

        cardFront.appendChild(flipIconFront);
        cardBack.appendChild(flipIconBack);

        // Add click event for flipping
        flipIconFront.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          card.classList.toggle("flipped");
        });

        flipIconBack.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          card.classList.toggle("flipped");
        });

        // Add faces to card
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        // Add click event to card for flipping
        card.addEventListener("click", (e) => {
          // Don't flip if clicking on appreciation buttons
          if (
            !e.target.closest(".appreciation-btn") &&
            !e.target.closest(".flip-icon")
          ) {
            card.classList.toggle("flipped");
          }
        });

        // Create appreciation bar
        const appreciationBar = document.createElement("div");
        appreciationBar.className = "appreciation-bar";

        // Add appreciation buttons
        const appreciationTypes = [
          { type: "clap", emoji: "👏" },
          { type: "heart", emoji: "❤️" },
          { type: "party", emoji: "🎉" },
          { type: "thanks", emoji: "🙏" },
          { type: "star", emoji: "⭐" },
        ];

        appreciationTypes.forEach((appType) => {
          const btn = document.createElement("button");
          btn.className = "appreciation-btn";
          btn.setAttribute("data-type", appType.type);
          btn.setAttribute("data-username", p.username || "");
          btn.setAttribute("aria-label", `Send ${appType.type} appreciation`);
          btn.title = "Send appreciation";

          const emoji = document.createElement("span");
          emoji.className = "emoji";
          emoji.textContent = appType.emoji;

          const count = document.createElement("span");
          count.className = "count";
          count.textContent = "0";

          btn.appendChild(emoji);
          btn.appendChild(count);
          appreciationBar.appendChild(btn);
        });

        // Add total appreciation count
        const totalAppreciation = document.createElement("div");
        totalAppreciation.className = "total-appreciation";
        totalAppreciation.textContent = "Total: 0 appreciations";
        appreciationBar.appendChild(totalAppreciation);

        if (newestContributor && p.username === newestContributor.username) {
          const badge = document.createElement("span");
          badge.className = "new-badge";
          badge.textContent = "NEW";
          cardFront.appendChild(badge);
        }

        const top = document.createElement("div");
        top.className = "top";

        const img = document.createElement("img");
        img.src =
          p.avatar ||
          `https://avatars.githubusercontent.com/${p.username || ""}`;
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

        // Add badges if they exist
        if (p.badges && Array.isArray(p.badges)) {
          const badgesContainer = document.createElement("div");
          badgesContainer.className = "badges";

          p.badges.forEach((badge) => {
            let badgeInfo;
            let badgeClass;

            if (typeof badge === "string") {
              // Predefined badge
              badgeInfo = badgeIcons[badge];
              badgeClass = `badge-${badge}`;
            } else if (badge && badge.type === "custom") {
              // Custom badge
              badgeInfo = {
                icon: "", // No icon for custom badges, or define a default
                label: badge.text || "Custom",
                color: badge.color || "#ffffff",
              };
              badgeClass = "badge-custom";
            }

            if (badgeInfo) {
              const badgeEl = document.createElement("span");
              badgeEl.className = `badge ${badgeClass}`;
              badgeEl.textContent = `${
                badgeInfo.icon ? badgeInfo.icon + " " : ""
              }${badgeInfo.label}`;
              badgeEl.title = badgeInfo.label;
              if (badgeInfo.color && badgeClass === "badge-custom") {
                badgeEl.style.background = badgeInfo.color;
              }
              badgesContainer.appendChild(badgeEl);
            }
          });

          if (badgesContainer.children.length > 0) {
            cardFront.appendChild(badgesContainer);
          }
        }

        const meta = document.createElement("div");
        meta.className = "meta";
        if (p.message) meta.textContent = p.message;

        cardFront.appendChild(top);
        if (p.message) cardFront.appendChild(meta);
        cardFront.appendChild(appreciationBar);

        // Create card back content
        const contributorDetails = document.createElement("div");
        contributorDetails.className = "contributor-details";

        // Join date
        const joinDateRow = document.createElement("div");
        joinDateRow.className = "detail-row";

        const joinDateLabel = document.createElement("div");
        joinDateLabel.className = "detail-label";
        joinDateLabel.textContent = "Joined on";

        const joinDateValue = document.createElement("div");
        joinDateValue.className = "detail-value join-date";

        if (p.addedAt) {
          const date = new Date(p.addedAt);
          const options = { year: "numeric", month: "long", day: "numeric" };
          joinDateValue.textContent = date.toLocaleDateString("en-US", options);
        } else {
          joinDateValue.textContent = "Unknown";
        }

        joinDateRow.appendChild(joinDateLabel);
        joinDateRow.appendChild(joinDateValue);
        contributorDetails.appendChild(joinDateRow);

        // Full message
        if (p.message) {
          const messageRow = document.createElement("div");
          messageRow.className = "detail-row";

          const messageLabel = document.createElement("div");
          messageLabel.className = "detail-label";
          messageLabel.textContent = "Message";

          const messageValue = document.createElement("div");
          messageValue.className = "detail-value full-message";
          messageValue.textContent = p.message;

          messageRow.appendChild(messageLabel);
          messageRow.appendChild(messageValue);
          contributorDetails.appendChild(messageRow);
        }

        // Badges
        if (p.badges && Array.isArray(p.badges)) {
          const badgesRow = document.createElement("div");
          badgesRow.className = "detail-row";

          const badgesLabel = document.createElement("div");
          badgesLabel.className = "detail-label";
          badgesLabel.textContent = "Badges";

          const badgesList = document.createElement("div");
          badgesList.className = "badges-list";

          p.badges.forEach((badge) => {
            let badgeInfo;
            let badgeClass;

            if (typeof badge === "string") {
              // Predefined badge
              badgeInfo = badgeIcons[badge];
              badgeClass = `badge-${badge}`;
            } else if (badge && badge.type === "custom") {
              // Custom badge
              badgeInfo = {
                icon: "", // No icon for custom badges, or define a default
                label: badge.text || "Custom",
                color: badge.color || "#ffffff",
              };
              badgeClass = "badge-custom";
            }

            if (badgeInfo) {
              const badgeEl = document.createElement("span");
              badgeEl.className = `badge ${badgeClass}`;
              badgeEl.textContent = `${
                badgeInfo.icon ? badgeInfo.icon + " " : ""
              }${badgeInfo.label}`;
              badgeEl.title = badgeInfo.label;
              if (badgeInfo.color && badgeClass === "badge-custom") {
                badgeEl.style.background = badgeInfo.color;
              }
              badgesList.appendChild(badgeEl);
            }
          });

          badgesRow.appendChild(badgesLabel);
          badgesRow.appendChild(badgesList);
          contributorDetails.appendChild(badgesRow);
        }

        // GitHub link
        const githubLink = document.createElement("a");
        githubLink.className = "github-link";
        githubLink.href = profileUrl;
        githubLink.target = "_blank";
        githubLink.rel = "noopener";
        githubLink.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        `;

        contributorDetails.appendChild(githubLink);
        cardBack.appendChild(contributorDetails);

        // Append card to container, then container to link, then add to DOM
        cardContainer.appendChild(card);
        a.appendChild(cardContainer);
        elList.appendChild(a);

        // Initialize appreciation data for this contributor
        initAppreciationForContributor(p.username || "", appreciationBar);

        // Add animation class and index after insertion so animations reliably run
        (function (el, idx) {
          requestAnimationFrame(() => {
            el.style.setProperty("--card-index", String(idx));
            el.classList.add("contributor-link");
          });
        })(a, i);

        contributorElements.push({
          element: a,
          name: (p.name || "").toLowerCase(),
          username: (p.username || "").toLowerCase(),
          badges: p.badges || [],
        });
      }

      return contributorElements;
    }

    let sortedPeople = sortContributors(people, "newest");
    let contributorElements = renderContributors(sortedPeople);

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        applyFiltersAndSearch(searchTerm);
      });
    }

    // Badge filter functionality
    const badgeFilters = document.getElementById("badgeFilters");
    const filterCount = document.getElementById("filterCount");
    let activeFilter = "all";

    if (badgeFilters) {
      badgeFilters.addEventListener("click", (e) => {
        if (e.target.classList.contains("badge-filter")) {
          // Remove active class from all filters
          document.querySelectorAll(".badge-filter").forEach((filter) => {
            filter.classList.remove("active");
          });

          // If clicking the active filter, deactivate it
          if (activeFilter === e.target.dataset.badge) {
            activeFilter = "all";
            document
              .querySelector('.badge-filter[data-badge="all"]')
              .classList.add("active");
          } else {
            // Add active class to clicked filter
            e.target.classList.add("active");
            activeFilter = e.target.dataset.badge;
          }

          // Apply filters
          const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
          applyFiltersAndSearch(searchTerm);
        }
      });
    }

    // Function to apply both search and badge filters
    function applyFiltersAndSearch(searchTerm) {
      let visibleCount = 0;

      contributorElements.forEach(({ element, name, username, badges }) => {
        let matchesSearch =
          !searchTerm ||
          name.includes(searchTerm) ||
          username.includes(searchTerm);
        let matchesBadge =
          activeFilter === "all" || (badges && badges.includes(activeFilter));

        if (matchesSearch && matchesBadge) {
          element.style.display = "";
          visibleCount++;
        } else {
          element.style.display = "none";
        }
      });

      // Update count
      if (filterCount) {
        if (activeFilter === "all") {
          filterCount.textContent = searchTerm
            ? `${visibleCount} of ${people.length} contributors match search`
            : `Showing all ${people.length} contributors`;
        } else {
          const badgeLabel = document.querySelector(
            `.badge-filter[data-badge="${activeFilter}"]`
          ).textContent;
          filterCount.textContent = searchTerm
            ? `${visibleCount} contributors with "${badgeLabel}" badge match search`
            : `${visibleCount} contributors with "${badgeLabel}" badge`;
        }
      }

      // Update main count
      elCount.textContent = `${visibleCount} contributor${
        visibleCount === 1 ? "" : "s"
      }${visibleCount < people.length ? " (filtered)" : ""}`;
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        const sortType = e.target.value;
        sortedPeople = sortContributors(people, sortType);
        contributorElements = renderContributors(sortedPeople);

        // Reapply search and badge filters
        const searchInput = document.getElementById("searchInput");
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        applyFiltersAndSearch(searchTerm);
      });
    }

    // Set up stats
    const latestPerson = sortedPeople[0];
    const totalCountEl = document.getElementById("totalCount");
    const latestContributorEl = document.getElementById("latestContributor");

    if (totalCountEl) totalCountEl.textContent = people.length;
    if (latestContributorEl && latestPerson) {
      latestContributorEl.textContent =
        latestPerson.name || latestPerson.username || "Unknown";
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

// Removed duplicate scroll-to-top functionality. Use initScrollToTop() instead.
function initScrollToTop() {
  const scrollButton = document.getElementById("scrollToTop");
  if (!scrollButton) return;

  // Create a sentinel element at the top
  const sentinel = document.createElement("div");
  sentinel.style.position = "absolute";
  sentinel.style.top = "200px";
  sentinel.style.height = "1px";
  document.body.insertBefore(sentinel, document.body.firstChild);

  // Observe when we scroll past the sentinel
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        scrollButton.classList.remove("visible");
      } else {
        scrollButton.classList.add("visible");
      }
    },
    { threshold: 0 }
  );

  observer.observe(sentinel);

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const html = document.documentElement;

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  // Toggle theme on button click
  themeToggle?.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }
}

function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgress");
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  }

  window.addEventListener("scroll", updateProgress);
  updateProgress(); // initialize on load
}

// Appreciation system functions
function loadAppreciation() {
  try {
    const data = localStorage.getItem("appreciation");
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("Error loading appreciation data:", e);
    return {};
  }
}

function saveAppreciation(data) {
  try {
    localStorage.setItem("appreciation", JSON.stringify(data));
  } catch (e) {
    console.error("Error saving appreciation data:", e);
  }
}

function initAppreciationForContributor(username, appreciationBar) {
  const data = loadAppreciation();
  const userAppreciation = data[username] || { sent: [], counts: {} };
  const totalEl = appreciationBar.querySelector(".total-appreciation");

  // Update each button with current count and state
  const buttons = appreciationBar.querySelectorAll(".appreciation-btn");
  let totalCount = 0;

  buttons.forEach((btn) => {
    const type = btn.dataset.type;
    const countEl = btn.querySelector(".count");
    const count = userAppreciation.counts[type] || 0;
    countEl.textContent = count;
    totalCount += count;

    // Mark as sent if user already sent this appreciation
    if (userAppreciation.sent && userAppreciation.sent.includes(type)) {
      btn.classList.add("sent");
    }

    // Add click event listener
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default button behavior
      e.stopPropagation(); // Prevent event from bubbling up to the parent link
      handleAppreciationClick(username, type, btn);
    });
  });

  // Update total count
  totalEl.textContent = `Total: ${totalCount} appreciation${
    totalCount === 1 ? "" : "s"
  }`;
}

function handleAppreciationClick(username, type, btn) {
  // Check if already sent
  const data = loadAppreciation();
  let userAppreciation = data[username] || { sent: [], counts: {} };

  if (!userAppreciation.sent) userAppreciation.sent = [];
  if (!userAppreciation.counts) userAppreciation.counts = {};

  if (userAppreciation.sent.includes(type)) {
    // Already sent, can't send again
    return;
  }

  // Send appreciation
  userAppreciation.sent.push(type);
  userAppreciation.counts[type] = (userAppreciation.counts[type] || 0) + 1;
  data[username] = userAppreciation;

  saveAppreciation(data);

  // Update UI
  const countEl = btn.querySelector(".count");
  countEl.textContent = userAppreciation.counts[type];
  btn.classList.add("sent", "animating");

  // Update total count
  const appreciationBar = btn.closest(".appreciation-bar");
  const totalEl = appreciationBar.querySelector(".total-appreciation");
  const buttons = appreciationBar.querySelectorAll(".appreciation-btn");
  let totalCount = 0;

  buttons.forEach((b) => {
    const t = b.dataset.type;
    totalCount += userAppreciation.counts[t] || 0;
  });

  totalEl.textContent = `Total: ${totalCount} appreciation${
    totalCount === 1 ? "" : "s"
  }`;

  // Remove animation class after animation ends
  setTimeout(() => btn.classList.remove("animating"), 400);
}

function boot() {
  fetchContributors();
  initThemeToggle();
  initScrollToTop();
  initScrollProgress();
}

boot();

const badgeIcons = {
  first: { icon: "🥇", label: "First", color: "#ffd700" },
  core: { icon: "⭐", label: "Core Team", color: "#667eea" },
  top: { icon: "🏆", label: "Top Contributor", color: "#f5576c" },
  helper: { icon: "🤝", label: "Helper", color: "#00f2fe" },
  early: { icon: "🌱", label: "Early Adopter", color: "#43e97b" },
  milestone: { icon: "🎯", label: "Milestone", color: "#fa709a" },
};
