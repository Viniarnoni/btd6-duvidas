const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "tutorials.json");
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const TIER = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
const existing = new Set(t.maps.map((m) => m.id));

function step(when, d) {
  return { when, do: d };
}

const missing = [
  {
    id: "three-mines-round",
    title: "Three Mines 'Round",
    badge: "Beginner",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
    summary:
      "Três minas ao redor do caminho. Espaço bom, layout Beginner. Ninja+Alch padrão.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Quincy perto do caminho principal."),
      step("Round 2–4", "Dart 0-2-0 na melhor curva."),
      step("Round 12–20", "Ninja + Alch (camo 24, chumbo 28)."),
      step("Posição", "Use o espaço entre as minas — não espalhe torres sem motivo."),
      step("Round 40", "MOAB Easy — habilidade do herói + Ninja melhorado."),
    ],
    nextMap: "Spa Pits ou Tinkerton",
    metaStatus: "✅ v55.2 — Beginner oficial. Core Ninja+Alch válido.",
  },
  {
    id: "spa-pits",
    title: "Spa Pits",
    badge: "Beginner · água",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
    summary:
      "Spas / piscinas. Contato leve com água. Terra ainda carrega Ninja+Alch; Sub opcional.",
    useCombo: "combo-facil-ninja-alch",
    altCombo: "combo-sub-alch-agua",
    steps: [
      step("Round 1", "Quincy ou Obyn na terra."),
      step("Round 12–20", "Ninja + Alch na terra."),
      step("Opcional", "Sub 0-0-2 na piscina para praticar camo aquático."),
      step("Dica", "No Easy, terra sozinha costuma bastar."),
    ],
    nextMap: "Tinkerton ou Resort",
    metaStatus: "✅ v55.2 — Beginner com água leve. Sauda ok se houver curvas na terra.",
  },
  {
    id: "tinkerton",
    title: "Tinkerton",
    badge: "Beginner",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
    summary:
      "Vilarejo / oficina leve. Espaço amplo para aprender posição. Ideal antes de Intermediate.",
    useCombo: "combo-dart-boomerang",
    altCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1–8", "Herói + Dart 0-2-0 + Boomerang 2-0-0."),
      step("Round 12", "Ninja antes do round 24."),
      step("Round 20", "Alch antes do round 28."),
      step("Aprendizado", "Compare curva vs reto — veja onde o Ninja rende mais."),
    ],
    nextMap: "Quiet Street (Intermediate) ou Balance",
    metaStatus: "✅ v55.2 — Beginner oficial. Transição natural para Intermediate.",
  },
  {
    id: "blons",
    title: "Blons",
    badge: "Expert · secreto",
    tier: "expert",
    difficulty: "Extremo",
    mode: "Só veteranos (mapa especial)",
    summary:
      "Mapa secreto/especial. Caminho CURTÍSSIMO. Um dos mais difíceis do jogo. Ignore se for iniciante.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Antes", "Black border em vários Experts. Não é tutorial de aprendizado."),
      step("Layout", "Caminho extremamente curto — DPS e micro máximos."),
      step("Build", "Meta completo: herói S-tier + Ninja/Alch/MIB/Spike + anti-DDT."),
      step("Aviso", "Se você usa este site para aprender: pule Blons. Volte daqui a meses."),
    ],
    nextMap: "Você terminou a lista de mapas do site",
    metaStatus: "✅ v55.2 — Blons continua Expert especial/extremo. Core meta ainda se aplica.",
  },
];

for (const m of missing) {
  if (!existing.has(m.id)) t.maps.push(m);
}

// Nome oficial
const meadow = t.maps.find((m) => m.id === "monkey-meadows");
if (meadow) meadow.title = "Monkey Meadow";

// Enriquecer mapas Beginner/Intermediate com poucos passos
t.maps.forEach((m) => {
  if (!m.metaStatus) {
    if (m.tier === "beginner") {
      m.metaStatus =
        "✅ v55.2 — Beginner. Ninja+Alch / Dart early ainda recomendados.";
    } else if (m.tier === "intermediate") {
      m.metaStatus =
        "✅ v55.2 — Intermediate. Core Ninja+Alch; multi-path e água conforme o mapa.";
    } else if (m.tier === "advanced") {
      m.metaStatus =
        "✅ v55.2 — Advanced. Ninja 0-4-0 + Alch 4-2-0 + MIB mais cedo. Água: Sub.";
    } else if (m.tier === "expert") {
      m.metaStatus =
        "✅ v55.2 — Expert. Kit completo: GM + Perma Brew + MIB + Perma-Spike + anti-DDT.";
    }
  }
  if (m.steps && m.steps.length < 5 && m.tier === "beginner") {
    const hasMoab = m.steps.some((s) => /40|MOAB/i.test(s.when + s.do));
    if (!hasMoab) {
      m.steps.push(
        step(
          "Round 40/46",
          "MOAB: use habilidade do herói. Em Hard o MOAB vem no 46."
        )
      );
    }
    const hasTip = m.steps.some((s) => /Dica|Regra|Erro/i.test(s.when));
    if (!hasTip) {
      m.steps.push(
        step(
          "Regra",
          "Poucas torres bem melhoradas > muitas torres fracas."
        )
      );
    }
  }
});

const newStrats = [
  {
    id: "estrategia-lista-completa-mapas",
    title: "Lista completa: todos os mapas do site",
    badge: "Roteiro total",
    difficulty: "Essencial",
    summary:
      "Ordem sugerida cobrindo Beginner → Expert. Use como checklist de medalhas.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step(
        "Beginner (26)",
        "Meadow → Town Center → Middle of the Road → End of the Road → Logs → Tree Stump → In the Loop → Cubism → Four Circles → Hedge → Park Path → Carved → Alpine Run → Scrapyard → Cabin → Three Mines → Spa Pits → Tinkerton → Resort → Skates → Lotus Island → Candy Falls → Winter Park → Frozen Over → Skull Tweak → One Two Tree."
      ),
      step(
        "Intermediate (25+)",
        "Quiet Street → Balance → Bazaar → Spring Spring → Downstream → Firing Range → Cracked → Moon Landing → Haunted → Streambed → Chutes → Rake → Karts → Spice Islands → Water Park → Polyphemus → Covered Garden → Quarry → Bloonarius Prime → Encrypted → Adora's Temple → Lost Crevasse → Luminous Cove → Sulfur Springs → Ancient Portal."
      ),
      step(
        "Advanced (22)",
        "High Finance → Cornfield → X Factor → Another Brick → Peninsula → Off the Coast → Cargo → Pat's Pond → Geared → Spillway → Mesa → Underground → Midnight Mansion → Erosion → Dark Path → Sunken Columns → Last Resort → Castle Revenge → Enchanted Glade → Party Parade → Sunset Gulch → Mushroom Grotto."
      ),
      step(
        "Expert (14)",
        "Infernal → Dark Castle → Workshop → Flooded Valley → Muddy Puddles → Quad → Bloody Puddles → Ravine → Sanctuary → Dark Dungeons → Glacial Trail → Tricky Tracks → #Ouch → Blons (por último)."
      ),
      step(
        "Regra de ouro",
        "Vença Hard na categoria atual antes de subir. Não pule para Expert."
      ),
    ],
    tip: "Na aba Tutoriais os mapas já aparecem nessa ordem de dificuldade.",
    metaStatus: "✅ v55.2 — cobertura alinhada à lista oficial (+ extras Dockside/Snake Path).",
  },
  {
    id: "estrategia-medalha-por-mapa",
    title: "Easy → Hard → Impoppable → CHIMPS",
    badge: "Progressão por mapa",
    difficulty: "Essencial",
    summary:
      "Em CADA mapa, suba as dificuldades. Não faça CHIMPS no primeiro try.",
    useCombo: "combo-obyn-ninja-alch",
    steps: [
      step("1. Easy", "Aprenda o layout e o timing camo/chumbo/MOAB."),
      step("2. Medium", "Mesma build, menos dinheiro — force upgrades certos."),
      step("3. Hard", "MOAB no 46. Ninja+Alch firmes. Medalha importante."),
      step("4. Impoppable", "1 vida. Mesma estratégia, zero erro."),
      step("5. CHIMPS", "Só depois de Hard. Sem vender, sem powers. Obyn ajuda."),
      step(
        "Beginner tip",
        "Tree Stump e Monkey Meadow são ótimos primeiros CHIMPS."
      ),
    ],
    metaStatus: "✅ v55.2 — progressão clássica inalterada.",
  },
  {
    id: "estrategia-dan-dmonke",
    title: "Dan D'Monke (herói novo v55)",
    badge: "Herói v55",
    difficulty: "Intermediário",
    summary:
      "Herói novo do patch 55. Divertido, mas Quincy/Obyn/Sauda ainda são melhores para aprender.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step(
        "Quando usar",
        "Depois de vencer Hard em vários Beginner. Não é herói #1 de iniciante."
      ),
      step(
        "Core",
        "Continue com Ninja + Alch — o herói sozinho não substitui camo/chumbo."
      ),
      step(
        "Mapas",
        "Comece em Monkey Meadow / Tree Stump para aprender as habilidades."
      ),
      step(
        "Meta",
        "v55.2 trouxe bugfixes nele — use a versão atualizada do jogo."
      ),
    ],
    tip: "Para medalhas e CHIMPS, Obyn/Sauda/Geraldo ainda são mais seguros.",
    metaStatus: "✅ v55.2 — Dan D'Monke jogável; core Ninja+Alch permanece.",
  },
];

const sid = new Set(t.strategies.map((s) => s.id));
for (const s of newStrats) {
  if (!sid.has(s.id)) t.strategies.unshift(s);
}

t.maps.sort(
  (a, b) =>
    (TIER[a.tier] || 9) - (TIER[b.tier] || 9) ||
    a.title.localeCompare(b.title)
);

t.startHere.intro =
  "Guia completo de mapas Bloons TD 6 (v55.2): do Beginner ao Expert, com estratégias atualizadas. Comece pelos verdes e suba aos poucos.";

fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");

const counts = Object.fromEntries(
  ["beginner", "intermediate", "advanced", "expert"].map((k) => [
    k,
    t.maps.filter((m) => m.tier === k).length,
  ])
);
const combos = new Set(t.combos.map((c) => c.id));
const broken = t.maps.filter((m) => m.useCombo && !combos.has(m.useCombo));

console.log("Mapas:", t.maps.length);
console.log(counts);
console.log("Estrategias:", t.strategies.length);
console.log("Broken:", broken.map((m) => m.id));
console.log(
  "Beginner titles:",
  t.maps.filter((m) => m.tier === "beginner").map((m) => m.title).join(" | ")
);
