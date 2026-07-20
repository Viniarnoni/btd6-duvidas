const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "tutorials.json");
const t = JSON.parse(fs.readFileSync(file, "utf8"));

function step(when, d) {
  return { when, do: d };
}

function wikiSlug(title) {
  return title
    .replace(/'/g, "%27")
    .replace(/ /g, "_")
    .replace(/#/g, "");
}

// Guia visual de torres (emoji = sem copyright)
t.towerGuide = [
  {
    id: "dart",
    name: "Dart Monkey",
    icon: "🎯",
    color: "#f7941d",
    tip: "Torre barata do começo. Melhore para 0-2-0 (três dardos).",
  },
  {
    id: "boomerang",
    name: "Boomerang",
    icon: "🪃",
    color: "#c62828",
    tip: "Bom no early. Upgrade 2-0-0 aquece o bumerangue.",
  },
  {
    id: "ninja",
    name: "Ninja Monkey",
    icon: "🥷",
    color: "#37474f",
    tip: "Vê camo sozinho. Torre #1 para iniciantes. Meta até Expert.",
  },
  {
    id: "alchemist",
    name: "Alchemist",
    icon: "🧪",
    color: "#7cb342",
    tip: "Derrete chumbo e deixa outras torres mais fortes. Coloque AO LADO do Ninja.",
  },
  {
    id: "sniper",
    name: "Sniper",
    icon: "🔫",
    color: "#546e7a",
    tip: "Atira de longe, ignora alguns obstáculos. Precisa de ajuda para camo.",
  },
  {
    id: "sub",
    name: "Monkey Sub",
    icon: "🚤",
    color: "#0288d1",
    tip: "Só na água (quadrado azul). 0-0-2 vê camo. Use em mapas aquáticos.",
  },
  {
    id: "village",
    name: "Monkey Village",
    icon: "🏠",
    color: "#8d6e63",
    tip: "0-3-2 (MIB) dá camo/chumbo/fortified para torres perto. Mid/late game.",
  },
  {
    id: "spike",
    name: "Spike Factory",
    icon: "📌",
    color: "#6a1b9a",
    tip: "No FINAL do caminho. 0-2-5 segura balões que escaparam (CHIMPS late).",
  },
  {
    id: "glue",
    name: "Glue Gunner",
    icon: "🧴",
    color: "#f9a825",
    tip: "Deixa balões lentos. Útil vs DDT no late game.",
  },
  {
    id: "wizard",
    name: "Wizard",
    icon: "🔮",
    color: "#5e35b1",
    tip: "Fogo derrete chumbo (2-0-0). Alternativa ao Alch no early.",
  },
];

// Ícones por combo
const comboTowers = {
  "combo-facil-ninja-alch": ["dart", "ninja", "alchemist"],
  "combo-dart-boomerang": ["dart", "boomerang", "ninja", "alchemist"],
  "combo-sauda-facil": ["ninja", "alchemist"],
  "combo-meta-avancado": ["ninja", "alchemist", "village", "spike", "glue"],
  "combo-obyn-ninja-alch": ["dart", "ninja", "alchemist", "spike"],
  "combo-sub-alch-agua": ["sub", "alchemist", "sniper"],
  "combo-sniper-alch": ["sniper", "ninja", "alchemist"],
};

t.combos.forEach((c) => {
  c.towers = comboTowers[c.id] || ["ninja", "alchemist"];
});

// Wiki + preview visual por mapa
t.maps.forEach((m) => {
  const slug = wikiSlug(m.title);
  m.wikiUrl = `https://www.bloonswiki.com/${slug}`;
  m.wikiAlt = `https://bloons.fandom.com/wiki/${slug}`;
  if (!m.visualHint) {
    if (m.tier === "beginner") {
      m.visualHint =
        "Mapa fácil: caminho longo ou espaço amplo. Procure curvas verdes no jogo.";
    } else if (m.tier === "intermediate") {
      m.visualHint =
        "Mapa médio: pode ter 2+ caminhos ou água. Observe 1 round antes de gastar tudo.";
    } else if (m.tier === "advanced") {
      m.visualHint =
        "Mapa difícil: pouco espaço ou gimmick. Poucas torres fortes.";
    } else {
      m.visualHint =
        "Mapa Expert: leia o tutorial inteiro antes de jogar. Não é para o primeiro dia.";
    }
  }
});

// Tutoriais CHIMPS por mapa Beginner
const chimpsMaps = [
  {
    id: "chimps-monkey-meadow",
    title: "CHIMPS: Monkey Meadow",
    badge: "Primeiro CHIMPS",
    difficulty: "Desafiador",
    summary:
      "Melhor primeiro CHIMPS do jogo. Caminho longo e simples. Use Obyn + Ninja + Alch.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "monkey-meadows",
    steps: [
      step("Antes", "Vença Hard neste mapa. Herói: Obyn (ou Sauda)."),
      step("Regras", "1 vida. Sem vender. Sem powers. Sem Monkey Knowledge."),
      step("Round 1", "Obyn na primeira curva boa."),
      step("Round 1–6", "Dart 0-2-0 ou Wizard 2-0-0."),
      step("Round 12", "Ninja — obrigatório antes do 24."),
      step("Round 20", "Alch ao lado do Ninja."),
      step("Round 30–50", "Ninja 2-0-0 + Alch 3-0-0. Não compre torres à toa."),
      step("Round 46", "MOAB: Wall of Trees do Obyn se precisar."),
      step("Round 60+", "Ninja 0-4-0 + Alch 4-2-0 se sobrar dinheiro."),
      step("Round 90+", "Spike 0-2-5 no FIM do caminho (anti-DDT)."),
      step("Vitória", "Medalha preta! Depois tente Tree Stump CHIMPS."),
    ],
    tip: "Morreu no 24? Faltou Ninja. No 28? Faltou Alch. No 46? Faltou upgrade/ability.",
    metaStatus: "✅ v55.2 — Meadow CHIMPS budget Obyn+Ninja+Alch ainda padrão.",
  },
  {
    id: "chimps-tree-stump",
    title: "CHIMPS: Tree Stump",
    badge: "Favorito da comunidade",
    difficulty: "Desafiador",
    summary:
      "Segundo CHIMPS ideal. Toco no centro — Sauda ou Obyn no anel interno.",
    useCombo: "combo-sauda-facil",
    mapRef: "tree-stump",
    steps: [
      step("Antes", "Vença Hard + Meadow CHIMPS ajuda."),
      step("Herói", "Sauda no anel perto do toco, OU Obyn."),
      step("Round 1–10", "Sauda carrega early — use a habilidade sempre."),
      step("Round 12–20", "Ninja + Alch no anel interno."),
      step("Round 40–60", "Melhore Ninja/Alch. Centro = máximo valor."),
      step("Round 90+", "Spike no fim do caminho circular."),
      step("Vitória", "Medalha preta no Tree Stump — muito respeitada."),
    ],
    tip: "Não coloque torres no toco (exceto Tack avançado). Anel ao redor.",
    metaStatus: "✅ v55.2 — Tree Stump continua CHIMPS Beginner #1 da comunidade.",
  },
  {
    id: "chimps-town-center",
    title: "CHIMPS: Town Center",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary:
      "Mapa do tutorial oficial. CHIMPS tranquilo depois de Meadow.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "town-center",
    steps: [
      step("Antes", "Hard neste mapa + Meadow CHIMPS."),
      step("Round 1", "Obyn ou Quincy na praça / curva."),
      step("Round 1–10", "Dart 0-2-0 + Boomerang se quiser."),
      step("Round 12–20", "Ninja + Alch."),
      step("Mid", "Upgrades > torres novas."),
      step("Round 90+", "Spike no final da rua."),
    ],
    metaStatus: "✅ v55.2 — Town Center CHIMPS beginner-friendly.",
  },
  {
    id: "chimps-cubism",
    title: "CHIMPS: Cubism",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary:
      "Caminho em cubo. 4 curvas — 2 torres fortes nas melhores curvas.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "cub",
    steps: [
      step("Round 1", "Obyn numa das 4 curvas (a mais longa)."),
      step("Round 12–20", "Ninja + Alch nessa curva / curva oposta."),
      step("Erro", "Uma torre fraca em cada lado do cubo — concentra poder."),
      step("Round 90+", "Spike perto da saída do cubo."),
    ],
    metaStatus: "✅ v55.2 — Cubism CHIMPS com Ninja+Alch válido.",
  },
  {
    id: "chimps-logs",
    title: "CHIMPS: Logs",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary:
      "Caminho reto e longo. Espalhe Ninja/Alch ao longo; Spike no fim.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "logs",
    steps: [
      step("Round 1", "Obyn no início ou 1º terço."),
      step("Round 12–20", "Ninja no meio + Alch colado."),
      step("Posição", "Caminho reto = cobertura contínua início→meio→fim."),
      step("Round 90+", "Spike no ÚLTIMO pedaço de madeira (saída)."),
    ],
    metaStatus: "✅ v55.2 — Logs CHIMPS clássico; caminho longo perdoa erros mid.",
  },
  {
    id: "chimps-in-the-loop",
    title: "CHIMPS: In the Loop",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary:
      "Loop = torres no MIOLA atacam 2 vezes. Muito eficiente em CHIMPS.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "in-the-loop",
    steps: [
      step("Round 1", "Obyn na entrada do loop."),
      step("Round 12–20", "Ninja + Alch DENTRO do círculo."),
      step("Erro", "Torres fora do loop — perde a vantagem."),
      step("Round 90+", "Spike no fim, depois do loop."),
    ],
    metaStatus: "✅ v55.2 — In the Loop CHIMPS favorece miolo do loop.",
  },
];

if (!t.modes) t.modes = [];
const modeIds = new Set(t.modes.map((m) => m.id));
for (const m of chimpsMaps) {
  if (!modeIds.has(m.id)) t.modes.push(m);
}

// Estratégia visual
const sid = new Set(t.strategies.map((s) => s.id));
if (!sid.has("estrategia-reconhecer-torres")) {
  t.strategies.unshift({
    id: "estrategia-reconhecer-torres",
    title: "Como reconhecer as torres no jogo",
    badge: "Visual para iniciantes",
    difficulty: "Essencial",
    summary:
      "No menu de compra, as torres têm ícones. Memorize estas 6 primeiro — resolvem 90% dos mapas fáceis.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("🎯 Dart", "Macaco com dardo. Primeira torre da lista Primary. $200."),
      step("🥷 Ninja", "Macaco de preto. Magic. Vê camuflagem. $400."),
      step("🧪 Alchemist", "Poção verde/roxa. Magic. Coloque COLADO no Ninja."),
      step("🔫 Sniper", "Rifle. Military. Atira longe. Não vê camo sozinho."),
      step("🚤 Sub", "Submarino. Só água azul. Military."),
      step("📌 Spike", "Fábrica de espinhos. Support. SEMPRE no fim do caminho."),
      step(
        "No site",
        "Abra um combo — aparecem os ícones das torres usadas. Nos mapas, toque em Ver foto na Wiki."
      ),
    ],
    tip: "Não precisa decorar as 20+ torres. Estas 6 + herói bastam para Beginner Hard.",
    metaStatus: "✅ v55.2 — torres do core inalteradas.",
  });
}

fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("Maps:", t.maps.length);
console.log("Modes:", t.modes.length);
console.log("Tower guide:", t.towerGuide.length);
console.log("Strategies:", t.strategies.length);
