let faqData = null;
let tutorialData = null;
let activeCategory = "all";
let searchQuery = "";
let activePanel = "start";

const categoryMap = new Map();

async function init() {
  try {
    const [faqRes, tutRes] = await Promise.all([
      fetch("data/faq.json"),
      fetch("data/tutorials.json"),
    ]);
    if (!faqRes.ok || !tutRes.ok) throw new Error("Falha ao carregar dados");
    faqData = await faqRes.json();
    tutorialData = await tutRes.json();
    setupMeta();
    setupWelcome();
    setupTabs();
    setupQuickLinks();
    setupCategories();
    renderTutorialLists();
    renderFaqs();
    bindEvents();
  } catch (err) {
    document.querySelector(".main").innerHTML =
      '<p class="empty-state">Não foi possível carregar o site. Verifique sua internet e atualize a página.</p>';
    console.error(err);
  }
}

function setupMeta() {
  document.title = faqData.meta.title + " — Guia fácil";
  const disclaimer = document.getElementById("disclaimer");
  if (disclaimer && faqData.meta.disclaimer) {
    disclaimer.textContent = "Dicas para iniciantes · " + faqData.meta.disclaimer;
  }
  const versionInfo = document.getElementById("version-info");
  if (versionInfo && faqData.meta.gameVersion) {
    const reviewed = faqData.meta.lastReviewed
      ? ` · Atualizado em ${formatDate(faqData.meta.lastReviewed)}`
      : "";
    versionInfo.textContent = `Jogo ${faqData.meta.gameVersion}${reviewed}`;
  }
}

function setupWelcome() {
  const sh = tutorialData.startHere;
  document.getElementById("welcome-intro").textContent = sh.intro;
  const list = document.getElementById("welcome-steps");
  list.innerHTML = sh.steps
    .map(
      (s) => `
      <li>
        <span class="welcome-step-icon">${s.icon}</span>
        <div>
          <strong>${escapeHtml(s.title)}</strong>
          <p>${escapeHtml(s.text)}</p>
        </div>
      </li>`
    )
    .join("");
}

function setupTabs() {
  document.querySelectorAll(".main-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchPanel(tab.dataset.panel));
  });
  document.getElementById("tutorial-back")?.addEventListener("click", hideTutorialDetail);
}

function switchPanel(panelId) {
  activePanel = panelId;
  document.querySelectorAll(".main-tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.panel === panelId);
  });
  document.querySelectorAll(".panel").forEach((p) => {
    const isActive = p.id === `panel-${panelId}`;
    p.classList.toggle("hidden", !isActive);
    p.classList.toggle("active", isActive);
  });
  hideTutorialDetail();
  if (panelId === "faq") renderFaqs();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupQuickLinks() {
  document.querySelectorAll(".big-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.dataset.goto;
      switchPanel(panel);
      if (btn.dataset.search) {
        const search = document.getElementById("search");
        search.value = btn.dataset.search;
        searchQuery = btn.dataset.search.toLowerCase();
        activeCategory = "all";
        document.querySelectorAll(".category-btn").forEach((b) => {
          b.classList.toggle("active", b.dataset.category === "all");
        });
        renderFaqs();
      }
      if (btn.dataset.focus) {
        setTimeout(() => openTutorial(btn.dataset.focus), 300);
      }
    });
  });
}

function setupCategories() {
  faqData.categories.forEach((c) => categoryMap.set(c.id, c));
  const nav = document.getElementById("categories");
  nav.innerHTML = "";

  const allBtn = createCategoryButton("all", "📋 Tudo");
  allBtn.classList.add("active");
  nav.appendChild(allBtn);

  faqData.categories.forEach((cat) => {
    nav.appendChild(createCategoryButton(cat.id, `${cat.icon} ${cat.label}`));
  });
}

function createCategoryButton(id, label) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "category-btn";
  btn.dataset.category = id;
  btn.textContent = label;
  btn.addEventListener("click", () => {
    activeCategory = id;
    document.querySelectorAll(".category-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.category === id);
    });
    renderFaqs();
  });
  return btn;
}

function renderTutorialLists() {
  const comboList = document.getElementById("combo-list");
  const mapList = document.getElementById("map-list");
  const strategyList = document.getElementById("strategy-list");
  const modeList = document.getElementById("mode-list");

  const tierLabels = {
    beginner: "🟢 Beginner — comece aqui",
    intermediate: "🟡 Intermediate — depois do Hard nos fáceis",
    advanced: "🟠 Advanced — espaço apertado e gimmicks",
    expert: "🔴 Expert — só com experiência",
  };
  const tierOrder = ["beginner", "intermediate", "advanced", "expert"];
  const mapsByTier = {};
  tutorialData.maps.forEach((m) => {
    const tier = m.tier || "beginner";
    if (!mapsByTier[tier]) mapsByTier[tier] = [];
    mapsByTier[tier].push(m);
  });

  mapList.innerHTML = tierOrder
    .filter((tier) => mapsByTier[tier]?.length)
    .map((tier) => {
      const cards = mapsByTier[tier]
        .map(
          (m) => `
    <button type="button" class="tutorial-card tutorial-card-map tier-${tier}" data-id="${m.id}" data-type="map">
      <span class="tutorial-badge">${escapeHtml(m.badge)}</span>
      <h3>${escapeHtml(m.title)}</h3>
      <p class="tutorial-difficulty">${escapeHtml(m.difficulty)} · ${escapeHtml(m.mode)}</p>
      <p class="tutorial-summary">${escapeHtml(m.summary)}</p>
      <span class="tutorial-cta">Toque para ver passo a passo →</span>
    </button>`
        )
        .join("");
      return `<div class="tier-group"><h3 class="tier-heading">${tierLabels[tier]} <span class="tier-count">(${mapsByTier[tier].length})</span></h3>${cards}</div>`;
    })
    .join("");

  if (strategyList && tutorialData.strategies) {
    strategyList.innerHTML = tutorialData.strategies
      .map(
        (s) => `
    <button type="button" class="tutorial-card tutorial-card-strategy" data-id="${s.id}" data-type="strategy">
      <span class="tutorial-badge">${escapeHtml(s.badge)}</span>
      <h3>${escapeHtml(s.title)}</h3>
      <p class="tutorial-difficulty">${escapeHtml(s.difficulty)}</p>
      <p class="tutorial-summary">${escapeHtml(s.summary)}</p>
      <span class="tutorial-cta">Toque para ver passo a passo →</span>
    </button>`
      )
      .join("");
  }

  comboList.innerHTML = tutorialData.combos
    .map(
      (c) => `
    <button type="button" class="tutorial-card" data-id="${c.id}" data-type="combo">
      <span class="tutorial-badge">${escapeHtml(c.badge)}</span>
      <h3>${escapeHtml(c.title)}</h3>
      <p class="tutorial-difficulty">Build · ${escapeHtml(c.difficulty)}</p>
      <p class="tutorial-summary">${escapeHtml(c.why)}</p>
      <span class="tutorial-cta">Toque para ver passo a passo →</span>
    </button>`
    )
    .join("");

  if (modeList && tutorialData.modes) {
    modeList.innerHTML = tutorialData.modes
      .map(
        (m) => `
    <button type="button" class="tutorial-card tutorial-card-mode" data-id="${m.id}" data-type="mode">
      <span class="tutorial-badge">${escapeHtml(m.badge)}</span>
      <h3>${escapeHtml(m.title)}</h3>
      <p class="tutorial-difficulty">${escapeHtml(m.difficulty)}</p>
      <p class="tutorial-summary">${escapeHtml(m.summary)}</p>
      <span class="tutorial-cta">Toque para ver passo a passo →</span>
    </button>`
      )
      .join("");
  }

  document.querySelectorAll(".tutorial-card").forEach((card) => {
    card.addEventListener("click", () => openTutorial(card.dataset.id));
  });
}

function tutorialSectionIds() {
  return ["map-section", "strategy-section", "combo-section", "mode-section-wrap"];
}

function setTutorialSectionsHidden(hidden) {
  tutorialSectionIds().forEach((id) => {
    document.getElementById(id)?.classList.toggle("hidden", hidden);
  });
}

function openTutorial(id) {
  const combo = tutorialData.combos.find((c) => c.id === id);
  const map = tutorialData.maps.find((m) => m.id === id);
  const strategy = tutorialData.strategies?.find((s) => s.id === id);
  const mode = tutorialData.modes?.find((m) => m.id === id);
  const item = combo || map || strategy || mode;
  if (!item) return;

  const detail = document.getElementById("tutorial-detail");
  const content = document.getElementById("tutorial-detail-content");
  const isMap = !!map;
  const isMode = !!mode;
  const isStrategy = !!strategy;

  let html = `<h2>${escapeHtml(item.title)}</h2>`;

  if (item.metaStatus) {
    html += `<p class="meta-status">${escapeHtml(item.metaStatus)}</p>`;
  }

  if (isMap) {
    const tierNames = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      expert: "Expert",
    };
    html += `
      <p class="detail-meta"><strong>Categoria:</strong> ${escapeHtml(tierNames[item.tier] || item.tier || "—")}</p>
      <p class="detail-meta"><strong>Dificuldade:</strong> ${escapeHtml(item.difficulty)}</p>
      <p class="detail-meta"><strong>Modo sugerido:</strong> ${escapeHtml(item.mode)}</p>
      <p class="detail-summary">${escapeHtml(item.summary)}</p>`;
    const linkedCombo = tutorialData.combos.find((c) => c.id === item.useCombo);
    if (linkedCombo) {
      html += `<p class="detail-combo-link">💡 Combo principal: <button type="button" class="inline-link" data-open-combo="${linkedCombo.id}">${escapeHtml(linkedCombo.title)}</button></p>`;
    }
    if (item.altCombo) {
      const alt = tutorialData.combos.find((c) => c.id === item.altCombo);
      if (alt) {
        html += `<p class="detail-combo-link">↔️ Alternativa: <button type="button" class="inline-link" data-open-combo="${alt.id}">${escapeHtml(alt.title)}</button></p>`;
      }
    }
  } else if (isStrategy || isMode) {
    html += `
      <p class="detail-meta"><strong>Nível:</strong> ${escapeHtml(item.difficulty)}</p>
      <p class="detail-summary">${escapeHtml(item.summary)}</p>`;
    const linkedCombo = tutorialData.combos.find((c) => c.id === item.useCombo);
    if (linkedCombo) {
      html += `<p class="detail-combo-link">💡 Build sugerido: <button type="button" class="inline-link" data-open-combo="${linkedCombo.id}">${escapeHtml(linkedCombo.title)}</button></p>`;
    }
  } else {
    html += `
      <p class="detail-meta"><strong>Dificuldade:</strong> ${escapeHtml(item.difficulty)}</p>
      <p class="detail-meta"><strong>Herói:</strong> ${escapeHtml(item.hero)}</p>
      <p class="detail-meta"><strong>Funciona em:</strong> ${escapeHtml(item.worksOn)}</p>
      <p class="detail-summary">${escapeHtml(item.why)}</p>`;
  }

  html += `<h3 class="steps-title">Passo a passo</h3><ol class="step-list">`;
  item.steps.forEach((step) => {
    html += `
      <li class="step-item">
        <span class="step-when">${escapeHtml(step.when)}</span>
        <span class="step-do">${escapeHtml(step.do)}</span>
      </li>`;
  });
  html += `</ol>`;

  if (item.tip) {
    html += `<div class="tutorial-tip">💡 <strong>Dica:</strong> ${escapeHtml(item.tip)}</div>`;
  }
  if (isMap && item.nextMap) {
    html += `<div class="tutorial-tip">➡️ <strong>Depois:</strong> tente o mapa ${escapeHtml(item.nextMap)}</div>`;
  }

  content.innerHTML = html;
  detail.classList.remove("hidden");
  setTutorialSectionsHidden(true);
  document.querySelector("#panel-tutorials .panel-hint")?.classList.add("hidden");

  content.querySelectorAll("[data-open-combo]").forEach((btn) => {
    btn.addEventListener("click", () => openTutorial(btn.dataset.openCombo));
  });

  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideTutorialDetail() {
  const detail = document.getElementById("tutorial-detail");
  if (!detail) return;
  detail.classList.add("hidden");
  setTutorialSectionsHidden(false);
  document.querySelector("#panel-tutorials .panel-hint")?.classList.remove("hidden");
}

function bindEvents() {
  const search = document.getElementById("search");
  let debounce;
  search.addEventListener("input", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderFaqs();
    }, 150);
  });
}

function getFilteredFaqs() {
  return faqData.faqs.filter((faq) => {
    const matchCategory =
      activeCategory === "all" || faq.category === activeCategory;
    if (!searchQuery) return matchCategory;
    const haystack = [
      faq.question,
      faq.answer,
      ...(faq.tags || []),
      categoryMap.get(faq.category)?.label || "",
    ]
      .join(" ")
      .toLowerCase();
    return matchCategory && haystack.includes(searchQuery);
  });
}

function renderFaqs() {
  const list = document.getElementById("faq-list");
  const empty = document.getElementById("empty-state");
  const countEl = document.getElementById("result-count");
  const filtered = getFilteredFaqs();

  if (activePanel !== "faq" && !searchQuery && activeCategory === "all") {
    countEl.textContent = `${faqData.faqs.length} perguntas disponíveis na aba Perguntas`;
    return;
  }

  countEl.textContent =
    filtered.length === faqData.faqs.length
      ? `Mostrando todas as ${filtered.length} perguntas`
      : `Encontramos ${filtered.length} de ${faqData.faqs.length} perguntas`;

  list.innerHTML = "";

  if (filtered.length === 0) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  filtered.forEach((faq) => {
    const cat = categoryMap.get(faq.category);
    const card = document.createElement("article");
    card.className = "faq-card";
    card.dataset.id = faq.id;

    card.innerHTML = `
      <button type="button" class="faq-question" aria-expanded="false">
        <span>${escapeHtml(faq.question)}</span>
        <span class="faq-chevron" aria-hidden="true"><span class="chevron-icon">▼</span> Toque para ver</span>
      </button>
      <div class="faq-meta">
        <span class="faq-category-badge">${cat ? cat.icon + " " + escapeHtml(cat.label) : ""}</span>
      </div>
      <div class="faq-answer">
        <div class="faq-answer-inner">${escapeHtml(faq.answer)}</div>
      </div>
    `;

    const btn = card.querySelector(".faq-question");
    btn.addEventListener("click", () => toggleCard(card, btn));
    list.appendChild(card);
  });
}

function toggleCard(card, btn) {
  const isOpen = card.classList.contains("open");
  document.querySelectorAll(".faq-card.open").forEach((c) => {
    c.classList.remove("open");
    c.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
  });
  if (!isOpen) {
    card.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

init();
