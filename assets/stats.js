async function fetchStats() {
  try {
    console.log("Fetching stats...");
    const res = await fetch("./data/contributors.ndjson", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Network error");
    const text = await res.text();
    const lines = text
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);
    const contributors = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    console.log(`Loaded ${contributors.length} contributors`);
    console.log(contributors);

    // Calculate all statistics
    console.log("Calculating overview stats...");
    calculateOverviewStats(contributors);
    console.log("Calculating badge distribution...");
    calculateBadgeDistribution(contributors);
    console.log("Calculating growth over time...");
    calculateGrowthOverTime(contributors);
    console.log("Calculating name statistics...");
    calculateNameStatistics(contributors);
    console.log("Calculating fun facts...");
    calculateFunFacts(contributors);
    console.log("All statistics calculated!");
  } catch (err) {
    console.error("Error loading stats:", err);
    document.querySelectorAll(".loading").forEach((el) => {
      el.textContent =
        "Could not load statistics. Please refresh and try again.";
      el.classList.add("error");
    });
    console.error(
      "Stats loading failed. Check the error message above for details."
    );
  }
}

function calculateOverviewStats(contributors) {
  try {
    console.log("Calculating overview stats...");
    // Total contributors
    const totalEl = document.getElementById("totalContributors");
    if (totalEl) totalEl.textContent = contributors.length;

    // Newest contributor
    const sortedByNewest = [...contributors].sort((a, b) =>
      (b.addedAt || "").localeCompare(a.addedAt || "")
    );
    const newest = sortedByNewest[0];
    const newestEl = document.getElementById("newestContributor");
    if (newestEl) {
      newestEl.textContent = newest
        ? newest.name || newest.username || "Unknown"
        : "-";
    }

    // First contributor
    const sortedByOldest = [...contributors].sort((a, b) =>
      (a.addedAt || "").localeCompare(b.addedAt || "")
    );
    const first = sortedByOldest[0];
    const firstEl = document.getElementById("firstContributor");
    if (firstEl) {
      firstEl.textContent = first
        ? first.name || first.username || "Unknown"
        : "-";
    }

    // Average per month
    if (contributors.length > 0) {
      const dates = contributors
        .map((c) => new Date(c.addedAt))
        .filter((d) => !isNaN(d.getTime()))
        .sort((a, b) => a - b);

      if (dates.length > 0) {
        const firstDate = dates[0];
        const lastDate = dates[dates.length - 1];
        const monthsDiff =
          (lastDate.getFullYear() - firstDate.getFullYear()) * 12 +
          (lastDate.getMonth() - firstDate.getMonth()) +
          1;
        const avgPerMonth = Math.round(contributors.length / monthsDiff);
        const avgEl = document.getElementById("avgPerMonth");
        if (avgEl) avgEl.textContent = avgPerMonth;
      }
    }
  } catch (err) {
    console.error("Error calculating overview stats:", err);
  }
}

function calculateBadgeDistribution(contributors) {
  try {
    console.log("Calculating badge distribution...");
    const badgeContainer = document.getElementById("badgeDistribution");
    if (!badgeContainer) {
      console.error("Badge distribution container not found");
      return;
    }
    badgeContainer.innerHTML = "";

    // Count badges
    const badgeCounts = {};
    contributors.forEach((contributor) => {
      if (contributor.badges && Array.isArray(contributor.badges)) {
        contributor.badges.forEach((badge) => {
          const badgeType = typeof badge === "string" ? badge : badge.type;
          badgeCounts[badgeType] = (badgeCounts[badgeType] || 0) + 1;
        });
      }
    });

    // Get badge icons
    const badgeIcons = {
      first: { icon: "🥇", label: "First" },
      core: { icon: "⭐", label: "Core Team" },
      top: { icon: "🏆", label: "Top Contributor" },
      helper: { icon: "🤝", label: "Helper" },
      early: { icon: "🌱", label: "Early Adopter" },
      milestone: { icon: "🎯", label: "Milestone" },
    };

    // Create badge distribution elements
    const total = contributors.length;
    Object.entries(badgeCounts).forEach(([badge, count]) => {
      const percentage = Math.round((count / total) * 100);
      const badgeInfo = badgeIcons[badge] || { icon: "🏅", label: badge };

      const badgeEl = document.createElement("div");
      badgeEl.className = "badge-stat-item";
      badgeEl.innerHTML = `
      <div class="badge-info">
        <span class="badge-icon">${badgeInfo.icon}</span>
        <span class="badge-name">${badgeInfo.label}</span>
        <span class="badge-count">${count} (${percentage}%)</span>
      </div>
      <div class="badge-bar">
        <div class="badge-bar-fill" style="width: ${percentage}%"></div>
      </div>
    `;
      badgeContainer.appendChild(badgeEl);
    });

    if (Object.keys(badgeCounts).length === 0) {
      badgeContainer.innerHTML = "<p>No badges have been awarded yet.</p>";
    }
  } catch (err) {
    console.error("Error calculating badge distribution:", err);
    const badgeContainer = document.getElementById("badgeDistribution");
    if (badgeContainer) {
      badgeContainer.innerHTML =
        "<p>Could not load badge statistics. Please refresh and try again.</p>";
    }
  }
}

function calculateGrowthOverTime(contributors) {
  try {
    console.log("Calculating growth over time...");
    const growthContainer = document.getElementById("growthChart");
    if (!growthContainer) {
      console.error("Growth chart container not found");
      return;
    }
    growthContainer.innerHTML = "";

    // Group by month
    const monthlyCounts = {};
    let cumulativeCount = 0;

    // Process all months in chronological order
    contributors.forEach((contributor) => {
      if (contributor.addedAt) {
        const date = new Date(contributor.addedAt);
        if (!isNaN(date.getTime())) {
          const monthKey = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;
          if (!monthlyCounts[monthKey]) {
            monthlyCounts[monthKey] = 0;
          }
          monthlyCounts[monthKey]++;
        }
      }
    });

    // Sort months chronologically
    const sortedMonths = Object.keys(monthlyCounts).sort();

    // Calculate cumulative values
    const cumulativeData = {};
    sortedMonths.forEach((month) => {
      cumulativeCount += monthlyCounts[month];
      cumulativeData[month] = cumulativeCount;
    });

    // Find max count for scaling
    const maxCount = Math.max(...Object.values(cumulativeData), 1);

    // Create chart
    const chartEl = document.createElement("div");
    chartEl.className = "bar-chart";

    sortedMonths.forEach((month, index) => {
      const count = cumulativeData[month];
      const newContributors = monthlyCounts[month];
      // Ensure minimum height for visibility and proper scaling
      const percentage = Math.max(8, (count / maxCount) * 100);

      const [year, monthNum] = month.split("-");
      const monthName = new Date(year, monthNum - 1).toLocaleDateString(
        "en-US",
        {
          month: "short",
          year: "numeric",
        }
      );

      const barEl = document.createElement("div");
      barEl.className = "bar-item";
      barEl.innerHTML = `
      <div class="bar-container">
        <div class="bar" style="height: ${percentage}%" title="Total: ${count} contributors (${newContributors} new in ${monthName})"></div>
      </div>
      <div class="bar-label">${monthName}</div>
      <div class="bar-value">${count}</div>
    `;

      // Add animation delay
      const bar = barEl.querySelector(".bar");
      if (bar) {
        bar.style.animationDelay = `${index * 0.05}s`;
      }

      chartEl.appendChild(barEl);
    });

    growthContainer.appendChild(chartEl);

    // Add scroll hint if there are many months
    if (sortedMonths.length > 8) {
      const scrollHint = document.createElement("div");
      scrollHint.className = "scroll-hint";
      scrollHint.textContent = "← Scroll to see more →";
      growthContainer.appendChild(scrollHint);

      // Hide scroll hint after user scrolls
      chartEl.addEventListener(
        "scroll",
        () => {
          scrollHint.style.opacity = "0";
          setTimeout(() => scrollHint.remove(), 300);
        },
        { once: true }
      );
    }

    if (sortedMonths.length === 0) {
      growthContainer.innerHTML = "<p>No growth data available.</p>";
    }
  } catch (err) {
    console.error("Error calculating growth over time:", err);
    const growthContainer = document.getElementById("growthChart");
    if (growthContainer) {
      growthContainer.innerHTML =
        "<p>Could not load growth statistics. Please refresh and try again.</p>";
    }
  }
}

function calculateNameStatistics(contributors) {
  try {
    console.log("Calculating name statistics...");
    const nameContainer = document.getElementById("nameStatistics");
    if (!nameContainer) {
      console.error("Name statistics container not found");
      return;
    }
    nameContainer.innerHTML = "";

    // Extract first names
    const firstNames = {};
    contributors.forEach((contributor) => {
      if (contributor.name) {
        const firstName = contributor.name.split(" ")[0];
        firstNames[firstName] = (firstNames[firstName] || 0) + 1;
      }
    });

    // Find most common name
    const sortedNames = Object.entries(firstNames).sort((a, b) => b[1] - a[1]);
    const mostCommon = sortedNames[0];

    // Find longest and shortest names
    const nameLengths = contributors
      .filter((c) => c.name)
      .map((c) => ({ name: c.name, length: c.name.length }))
      .sort((a, b) => b.length - a.length);

    const longestName = nameLengths[0];
    const shortestName = nameLengths[nameLengths.length - 1];

    // Create name statistics elements
    const statsEl = document.createElement("div");
    statsEl.className = "name-stats";

    if (mostCommon) {
      const mostCommonEl = document.createElement("div");
      mostCommonEl.className = "name-stat-item";
      mostCommonEl.innerHTML = `
      <div class="name-stat-label">Most common name</div>
      <div class="name-stat-value">${mostCommon[0]} (${mostCommon[1]} contributors)</div>
    `;
      statsEl.appendChild(mostCommonEl);
    }

    if (longestName) {
      const longestEl = document.createElement("div");
      longestEl.className = "name-stat-item";
      longestEl.innerHTML = `
      <div class="name-stat-label">Longest name</div>
      <div class="name-stat-value">${longestName.name} (${longestName.length} characters)</div>
    `;
      statsEl.appendChild(longestEl);
    }

    if (shortestName) {
      const shortestEl = document.createElement("div");
      shortestEl.className = "name-stat-item";
      shortestEl.innerHTML = `
      <div class="name-stat-label">Shortest name</div>
      <div class="name-stat-value">${shortestName.name} (${shortestName.length} characters)</div>
    `;
      statsEl.appendChild(shortestEl);
    }

    nameContainer.appendChild(statsEl);

    if (sortedNames.length === 0) {
      nameContainer.innerHTML = "<p>No name data available.</p>";
    }
  } catch (err) {
    console.error("Error calculating name statistics:", err);
    const nameContainer = document.getElementById("nameStatistics");
    if (nameContainer) {
      nameContainer.innerHTML =
        "<p>Could not load name statistics. Please refresh and try again.</p>";
    }
  }
}

function calculateFunFacts(contributors) {
  try {
    console.log("Calculating fun facts...");
    const factsContainer = document.getElementById("funFacts");
    if (!factsContainer) {
      console.error("Fun facts container not found");
      return;
    }
    factsContainer.innerHTML = "";

    const facts = [];

    // First contributor fact
    const sortedByOldest = [...contributors].sort((a, b) =>
      (a.addedAt || "").localeCompare(b.addedAt || "")
    );
    const first = sortedByOldest[0];
    if (first) {
      const date = new Date(first.addedAt);
      if (!isNaN(date.getTime())) {
        facts.push(
          `The first contributor was ${
            first.name || first.username || "Unknown"
          }, who joined on ${date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`
        );
      }
    }

    // Busiest month fact
    const monthlyCounts = {};
    contributors.forEach((contributor) => {
      if (contributor.addedAt) {
        const date = new Date(contributor.addedAt);
        if (!isNaN(date.getTime())) {
          const monthKey = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;
          monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + 1;
        }
      }
    });

    const sortedMonths = Object.entries(monthlyCounts).sort(
      (a, b) => b[1] - a[1]
    );
    if (sortedMonths.length > 0) {
      const [month, count] = sortedMonths[0];
      const [year, monthNum] = month.split("-");
      const monthName = new Date(year, monthNum - 1).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      );
      facts.push(
        `${monthName} was our busiest month with ${count} new contributors`
      );
    }

    // Most common name fact
    const firstNames = {};
    contributors.forEach((contributor) => {
      if (contributor.name) {
        const firstName = contributor.name.split(" ")[0];
        firstNames[firstName] = (firstNames[firstName] || 0) + 1;
      }
    });

    const sortedNames = Object.entries(firstNames).sort((a, b) => b[1] - a[1]);
    if (sortedNames.length > 0) {
      const [name, count] = sortedNames[0];
      facts.push(
        `The most common first name is "${name}" (appears ${count} time${
          count > 1 ? "s" : ""
        })`
      );
    }

    // Badge percentage fact
    const contributorsWithBadges = contributors.filter(
      (c) => c.badges && Array.isArray(c.badges) && c.badges.length > 0
    ).length;

    if (contributors.length > 0) {
      const badgePercentage = Math.round(
        (contributorsWithBadges / contributors.length) * 100
      );
      facts.push(`${badgePercentage}% of contributors have at least one badge`);
    }

    // Longest message fact
    const messages = contributors
      .filter((c) => c.message)
      .map((c) => ({
        name: c.name || c.username,
        message: c.message,
        length: c.message.length,
      }))
      .sort((a, b) => b.length - a.length);

    if (messages.length > 0) {
      const longest = messages[0];
      facts.push(
        `The longest message is ${longest.length} characters long by ${longest.name}`
      );
    }

    // Average per week fact
    if (contributors.length > 0) {
      const dates = contributors
        .map((c) => new Date(c.addedAt))
        .filter((d) => !isNaN(d.getTime()))
        .sort((a, b) => a - b);

      if (dates.length > 0) {
        const firstDate = dates[0];
        const lastDate = dates[dates.length - 1];
        const weeksDiff = Math.max(
          1,
          Math.ceil((lastDate - firstDate) / (7 * 24 * 60 * 60 * 1000))
        );
        const avgPerWeek = Math.round(contributors.length / weeksDiff);
        facts.push(
          `Average of ${avgPerWeek} contributor${
            avgPerWeek === 1 ? "" : "s"
          } per week`
        );
      }
    }

    // Create fun facts list
    const factsListEl = document.createElement("ul");
    factsListEl.className = "fun-facts-list";

    facts.forEach((fact) => {
      const factEl = document.createElement("li");
      factEl.textContent = fact;
      factsListEl.appendChild(factEl);
    });

    factsContainer.appendChild(factsListEl);

    if (facts.length === 0) {
      factsContainer.innerHTML = "<p>No fun facts available yet.</p>";
    }
  } catch (err) {
    console.error("Error calculating fun facts:", err);
    const factsContainer = document.getElementById("funFacts");
    if (factsContainer) {
      factsContainer.innerHTML =
        "<p>Could not load fun facts. Please refresh and try again.</p>";
    }
  }
}

function initThemeToggle() {
  const colorThemeSelect = document.getElementById("colorThemeSelect");
  const html = document.documentElement;

  if (!colorThemeSelect) {
    console.warn("Color theme selector not found!");
    return;
  }

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem("colorTheme") || "dark";
  html.setAttribute("data-theme", currentTheme);
  colorThemeSelect.value = currentTheme;
  console.log(`Initial color theme set to: ${currentTheme}`);

  // Change theme on dropdown selection
  colorThemeSelect.addEventListener("change", (e) => {
    const newTheme = e.target.value;
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("colorTheme", newTheme);
    console.log(`Color theme switched to: ${newTheme}`);

    // Add a brief animation class for smooth transition
    html.classList.add("theme-transitioning");
    setTimeout(() => {
      html.classList.remove("theme-transitioning");
    }, 300);
  });
}

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

function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgress");
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    // Prevent division by zero
    if (docHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }
    const scrollPercent = Math.min(
      100,
      Math.max(0, (scrollTop / docHeight) * 100)
    );
    progressBar.style.width = `${scrollPercent}%`;
  }

  window.addEventListener("scroll", updateProgress);
  updateProgress(); // initialize on load
}

function boot() {
  console.log("Initializing stats page...");
  fetchStats();
  initThemeToggle();
  initScrollToTop();
  initScrollProgress();
  console.log("Stats page initialized!");
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
