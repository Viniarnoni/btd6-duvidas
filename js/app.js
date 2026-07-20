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

function renderTowerChips(towerIds) {
  if (!towerIds?.length || !tutorialData.towerGuide) return "";
  const guide = new Map(tutorialData.towerGuide.map((t) => [t.id, t]));
  const chips = towerIds
    .map((id) => {
      const t = guide.get(id);
      if (!t) return "";
      return `<span class="tower-chip" style="--chip:${t.color}" title="${escapeHtml(t.tip)}">
        <span class="tower-chip-icon">${t.icon}</span>
        <span class="tower-chip-name">${escapeHtml(t.name)}</span>
      </span>`;
    })
    .join("");
  if (!chips) return "";
  return `<div class="tower-chips"><p class="tower-chips-label">Torres deste guia:</p><div class="tower-chips-row">${chips}</div></div>`;
}

function renderTowerGuide() {
  const el = document.getElementById("tower-guide");
  if (!el || !tutorialData.towerGuide) return;
  el.innerHTML = tutorialData.towerGuide
    .map(
      (t) => `
    <article class="tower-guide-card" style="--chip:${t.color}">
      <span class="tower-guide-icon">${t.icon}</span>
      <div>
        <h3>${escapeHtml(t.name)}</h3>
        <p>${escapeHtml(t.tip)}</p>
      </div>
    </article>`
    )
    .join("");
}

function renderRoundChecklist() {
  const el = document.getElementById("round-checklist");
  if (!el || !tutorialData.roundChecklist) return;
  el.innerHTML = tutorialData.roundChecklist
    .map(
      (item) => `
    <li>
      <span class="check-icon">${item.icon}</span>
      <div>
        <strong>Round ${escapeHtml(item.round)}</strong>
        <p>${escapeHtml(item.label)}</p>
      </div>
    </li>`
    )
    .join("");
}

function renderDiagram(type) {
  if (!type) return "";
  const diagrams = {
    curve: {
      title: "Posição em curva",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 100 Q60 100 80 50 T150 20" fill="none" stroke="#8d6e63" stroke-width="14" stroke-linecap="round"/>
        <circle cx="95" cy="55" r="12" fill="#c62828"/>
        <text x="95" y="59" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">N</text>
        <circle cx="112" cy="48" r="10" fill="#7cb342"/>
        <text x="112" y="52" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">A</text>
        <text x="20" y="20" fill="#2d2a26" font-size="11" font-weight="bold">Curva = mais tempo de tiro</text>
      </svg>`,
    },
    water: {
      title: "Mapa com água",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="40" width="180" height="50" rx="8" fill="#81d4fa"/>
        <path d="M20 65 H180" fill="none" stroke="#5d4037" stroke-width="10"/>
        <circle cx="50" cy="30" r="11" fill="#37474f"/>
        <text x="50" y="34" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">N</text>
        <circle cx="70" cy="30" r="10" fill="#7cb342"/>
        <text x="70" y="34" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">A</text>
        <circle cx="120" cy="65" r="11" fill="#0288d1"/>
        <text x="120" y="69" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">S</text>
        <text x="20" y="18" fill="#2d2a26" font-size="11" font-weight="bold">Terra: Ninja+Alch · Água: Sub</text>
      </svg>`,
    },
    end: {
      title: "Spike no fim do caminho",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M15 60 H155" fill="none" stroke="#8d6e63" stroke-width="14" stroke-linecap="round"/>
        <polygon points="155,45 185,60 155,75" fill="#6a1b9a"/>
        <text x="162" y="64" fill="#fff" font-size="10" font-weight="bold">SP</text>
        <circle cx="70" cy="40" r="10" fill="#37474f"/>
        <text x="70" y="44" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">N</text>
        <text x="20" y="20" fill="#2d2a26" font-size="11" font-weight="bold">Spike sempre no FINAL</text>
      </svg>`,
    },
    multipath: {
      title: "Vários caminhos",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 30 H160" fill="none" stroke="#bdbdbd" stroke-width="10"/>
        <path d="M20 60 H160" fill="none" stroke="#8d6e63" stroke-width="12"/>
        <path d="M20 90 H160" fill="none" stroke="#bdbdbd" stroke-width="10"/>
        <circle cx="90" cy="60" r="12" fill="#c62828"/>
        <text x="90" y="64" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">1º</text>
        <text x="20" y="18" fill="#2d2a26" font-size="11" font-weight="bold">Fortifique 1 caminho primeiro</text>
      </svg>`,
    },
    loop: {
      title: "Loop / miolo",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="100" cy="65" r="38" fill="none" stroke="#8d6e63" stroke-width="12"/>
        <circle cx="100" cy="65" r="14" fill="#c62828"/>
        <text x="100" y="69" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">N+A</text>
        <text x="20" y="20" fill="#2d2a26" font-size="11" font-weight="bold">Torres DENTRO do loop</text>
      </svg>`,
    },
    obstacle: {
      title: "Obstáculo / visão",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M15 80 H185" fill="none" stroke="#8d6e63" stroke-width="12"/>
        <rect x="85" y="35" width="30" height="40" rx="4" fill="#5d4037"/>
        <text x="100" y="58" text-anchor="middle" fill="#fff" font-size="9">▓</text>
        <circle cx="55" cy="55" r="11" fill="#37474f"/>
        <text x="55" y="59" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">N</text>
        <circle cx="145" cy="30" r="10" fill="#546e7a"/>
        <text x="145" y="34" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">SN</text>
        <text x="20" y="18" fill="#2d2a26" font-size="11" font-weight="bold">Ninja ao lado · Sniper por cima</text>
      </svg>`,
    },
    straight: {
      title: "Caminho reto",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M15 70 H185" fill="none" stroke="#8d6e63" stroke-width="14"/>
        <circle cx="50" cy="48" r="9" fill="#f7941d"/>
        <circle cx="100" cy="48" r="11" fill="#37474f"/>
        <circle cx="150" cy="48" r="9" fill="#7cb342"/>
        <text x="20" y="20" fill="#2d2a26" font-size="11" font-weight="bold">Cubra início · meio · fim</text>
      </svg>`,
    },
    center: {
      title: "Cruzamento / centro",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M100 15 V105 M30 60 H170" fill="none" stroke="#8d6e63" stroke-width="12"/>
        <circle cx="100" cy="60" r="16" fill="#c62828"/>
        <text x="100" y="64" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">HERÓI</text>
        <text x="20" y="18" fill="#2d2a26" font-size="11" font-weight="bold">Centro atinge vários trechos</text>
      </svg>`,
    },
    fast: {
      title: "Aceleração (chute/mola)",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M15 70 H90" fill="none" stroke="#8d6e63" stroke-width="12"/>
        <path d="M110 70 H185" fill="none" stroke="#ef6c00" stroke-width="12"/>
        <polygon points="90,55 115,70 90,85" fill="#ef6c00"/>
        <circle cx="50" cy="48" r="12" fill="#c62828"/>
        <text x="50" y="52" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">AQUI</text>
        <text x="20" y="20" fill="#2d2a26" font-size="11" font-weight="bold">Torres ANTES da aceleração</text>
      </svg>`,
    },
    special: {
      title: "Mapa especial / gimmick",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="100" cy="65" r="40" fill="none" stroke="#f7941d" stroke-width="4" stroke-dasharray="8 6"/>
        <text x="100" y="60" text-anchor="middle" fill="#2d2a26" font-size="12" font-weight="bold">Observe 1–2</text>
        <text x="100" y="76" text-anchor="middle" fill="#2d2a26" font-size="12" font-weight="bold">rounds primeiro</text>
        <text x="20" y="20" fill="#2d2a26" font-size="11" font-weight="bold">Geared / High Finance / etc.</text>
      </svg>`,
    },
  };
  const d = diagrams[type];
  if (!d) return "";
  return `<figure class="position-diagram">
    <figcaption>${escapeHtml(d.title)}</figcaption>
    ${d.svg}
    <p class="diagram-legend">N = Ninja · A = Alch · S = Sub · SP = Spike · SN = Sniper</p>
  </figure>`;
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
  renderTowerGuide();
  renderRoundChecklist();
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
    const tierClass = item.tier || "beginner";
    html += `
      <div class="map-visual map-visual-${escapeHtml(tierClass)}" aria-hidden="true">
        <span class="map-visual-letter">${escapeHtml((item.title || "?").charAt(0))}</span>
        <span class="map-visual-label">${escapeHtml(tierNames[item.tier] || "")}</span>
      </div>`;
    if (item.visualHint) {
      html += `<p class="visual-hint">${escapeHtml(item.visualHint)}</p>`;
    }
    if (item.wikiUrl) {
      html += `<p class="wiki-links">📷 <a href="${escapeHtml(item.wikiUrl)}" target="_blank" rel="noopener">Ver foto do mapa na Wiki</a>
        <span class="wiki-note">(abre em nova aba — imagens oficiais do jogo)</span></p>`;
    }
    html += renderDiagram(item.diagram);
    html += `
      <p class="detail-meta"><strong>Categoria:</strong> ${escapeHtml(tierNames[item.tier] || item.tier || "—")}</p>
      <p class="detail-meta"><strong>Dificuldade:</strong> ${escapeHtml(item.difficulty)}</p>
      <p class="detail-meta"><strong>Modo sugerido:</strong> ${escapeHtml(item.mode)}</p>
      <p class="detail-summary">${escapeHtml(item.summary)}</p>`;
    const linkedCombo = tutorialData.combos.find((c) => c.id === item.useCombo);
    if (linkedCombo) {
      html += `<p class="detail-combo-link">💡 Combo principal: <button type="button" class="inline-link" data-open-combo="${linkedCombo.id}">${escapeHtml(linkedCombo.title)}</button></p>`;
      html += renderTowerChips(linkedCombo.towers);
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
    html += renderDiagram(item.diagram);
    const linkedCombo = tutorialData.combos.find((c) => c.id === item.useCombo);
    if (linkedCombo) {
      html += `<p class="detail-combo-link">💡 Build sugerido: <button type="button" class="inline-link" data-open-combo="${linkedCombo.id}">${escapeHtml(linkedCombo.title)}</button></p>`;
      html += renderTowerChips(linkedCombo.towers);
    }
    if (item.mapRef) {
      html += `<p class="detail-combo-link">🗺️ Mapa: <button type="button" class="inline-link" data-open-combo="${escapeHtml(item.mapRef)}">Abrir tutorial do mapa</button></p>`;
    }
  } else {
    html += `
      <p class="detail-meta"><strong>Dificuldade:</strong> ${escapeHtml(item.difficulty)}</p>
      <p class="detail-meta"><strong>Herói:</strong> ${escapeHtml(item.hero)}</p>
      <p class="detail-meta"><strong>Funciona em:</strong> ${escapeHtml(item.worksOn)}</p>
      <p class="detail-summary">${escapeHtml(item.why || item.summary || "")}</p>`;
    html += renderTowerChips(item.towers);
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
