const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "tutorials.json");
const faqFile = path.join(__dirname, "..", "data", "faq.json");
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const faq = JSON.parse(fs.readFileSync(faqFile, "utf8"));

function step(when, d) {
  return { when, do: d };
}

// Diagramas por tipo de layout
const diagramByMap = {
  "monkey-meadows": "curve",
  "tree-stump": "center",
  "town-center": "curve",
  cub: "curve",
  "in-the-loop": "loop",
  logs: "straight",
  "end-of-the-lane": "straight",
  "end-of-the-road": "straight",
  peninsula: "water",
  "off-the-coast": "water",
  "pats-pond": "water",
  resort: "water",
  "lotus-valley": "water",
  "spa-pits": "water",
  "water-park": "water",
  dockside: "water",
  "luminous-cove": "water",
  "spice-islands": "water",
  "flooded-valley": "water",
  "sunken-columns": "water",
  balance: "multipath",
  "karts-and-darts": "multipath",
  rake: "multipath",
  "four-circles": "multipath",
  "one-two-tree": "multipath",
  "muddy-puddles": "multipath",
  quad: "multipath",
  "bloody-puddles": "multipath",
  "skull-tweak": "obstacle",
  "hedge-park": "obstacle",
  haunted: "obstacle",
  cornfield: "obstacle",
  polyphemus: "obstacle",
  underground: "obstacle",
  bazaar: "center",
  "x-factor": "center",
  "spring-trap": "fast",
  chutes: "fast",
  "alpine-run": "curve",
  "carved-path": "curve",
  "snake-path": "curve",
  cracked: "curve",
  geared: "special",
  "high-finance": "special",
  infernal: "multipath",
  "dark-castle": "end",
};

t.maps.forEach((m) => {
  if (!m.diagram) m.diagram = diagramByMap[m.id] || (m.tier === "beginner" ? "curve" : "curve");
});

const moreChimps = [
  {
    id: "chimps-alpine-run",
    title: "CHIMPS: Alpine Run",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary: "Muitas curvas na montanha. Sauda brilha. Ninja+Alch nas curvas do meio.",
    useCombo: "combo-sauda-facil",
    mapRef: "alpine-run",
    diagram: "curve",
    steps: [
      step("Antes", "Vença Hard. Meadow ou Tree Stump CHIMPS ajuda."),
      step("Round 1", "Sauda na curva mais apertada."),
      step("Round 1–10", "Habilidade da Sauda sempre que estiver pronta."),
      step("Round 12–20", "Ninja + Alch nas próximas curvas."),
      step("Round 46", "MOAB — ability + Ninja tier 3+."),
      step("Round 90+", "Spike no fim da trilha."),
    ],
    metaStatus: "✅ v55.2 — Alpine Run CHIMPS com Sauda+Ninja+Alch válido.",
  },
  {
    id: "chimps-four-circles",
    title: "CHIMPS: Four Circles",
    badge: "CHIMPS multi-path",
    difficulty: "Desafiador",
    summary: "4 círculos. Um forte primeiro, depois copie defesa barata nos outros.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "four-circles",
    diagram: "multipath",
    steps: [
      step("Erro clássico", "Dividir dinheiro nos 4 círculos no round 1."),
      step("Round 1–20", "Obyn + Ninja + Alch no círculo mais longo."),
      step("Round 25+", "Ninja básico nos outros 3 círculos."),
      step("Round 90+", "Spike no exit do círculo principal + cobertura mínima nos outros."),
    ],
    metaStatus: "✅ v55.2 — estratégia multi-path concentrada ainda meta.",
  },
  {
    id: "chimps-hedge",
    title: "CHIMPS: Hedge",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary: "Sebes bloqueiam visão. Prefira Ninja/Sniper. Alch para chumbo.",
    useCombo: "combo-sniper-alch",
    mapRef: "hedge-park",
    diagram: "obstacle",
    steps: [
      step("Round 1", "Obyn em spot aberto (teste o verde)."),
      step("Round 10–12", "Ninja ou Sniper — Dart sofre com sebe."),
      step("Round 20", "Alch + Ninja se usou Sniper (camo)."),
      step("Round 90+", "Spike no fim."),
    ],
    metaStatus: "✅ v55.2 — Hedge CHIMPS: Ninja/Sniper > Dart atrás de sebe.",
  },
  {
    id: "chimps-logs-hard",
    title: "CHIMPS: End of the Road",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary: "Caminho curto/reto. Concentre no meio. Spike na saída.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "end-of-the-lane",
    diagram: "straight",
    steps: [
      step("Round 1", "Obyn no meio do caminho."),
      step("Round 12–20", "Ninja + Alch no mesmo trecho central."),
      step("Erro", "Torre só no início — balões escapam no fim."),
      step("Round 90+", "Spike na saída."),
    ],
    metaStatus: "✅ v55.2 — caminho curto exige DPS concentrado.",
  },
  {
    id: "chimps-candy-falls",
    title: "CHIMPS: Candy Falls",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary: "Beginner colorido. Mesmo core Obyn+Ninja+Alch.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "candy-falls",
    diagram: "curve",
    steps: [
      step("Round 1–20", "Obyn → Ninja → Alch nas curvas."),
      step("Mid", "Upgrades tier 3–4, não spam."),
      step("Round 90+", "Spike no fim."),
    ],
    metaStatus: "✅ v55.2 — Candy Falls CHIMPS beginner-friendly.",
  },
  {
    id: "chimps-resort",
    title: "CHIMPS: Resort",
    badge: "CHIMPS · água leve",
    difficulty: "Desafiador",
    summary: "Terra + piscina. Ninja+Alch na terra; Sub opcional na água.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "resort",
    diagram: "water",
    steps: [
      step("Round 1", "Obyn na terra (não dependa só da água)."),
      step("Round 12–20", "Ninja + Alch na terra."),
      step("Opcional", "Sub 0-0-2 se a piscina cobrir bem o caminho."),
      step("Round 90+", "Spike no fim terrestre."),
    ],
    metaStatus: "✅ v55.2 — Resort: terra primeiro, Sub complementar.",
  },
  {
    id: "chimps-scrapyard",
    title: "CHIMPS: Scrapyard",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary: "Obstáculos leves. Ninja resolve melhor que Dart bloqueado.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "scrapyard",
    diagram: "obstacle",
    steps: [
      step("Round 1", "Obyn em spot com visão."),
      step("Round 12", "Ninja (não Dart atrás de ferro-velho)."),
      step("Round 20", "Alch."),
      step("Round 90+", "Spike no fim."),
    ],
    metaStatus: "✅ v55.2 — Scrapyard CHIMPS: cuidado com LoS.",
  },
  {
    id: "chimps-park-path",
    title: "CHIMPS: Park Path",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary: "Espaço amplo. Bom para praticar posição em CHIMPS.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "park-path",
    diagram: "curve",
    steps: [
      step("Round 1–20", "Core Obyn + Ninja + Alch na melhor curva."),
      step("Dica", "Pause e compare 2 spots antes de upgradar."),
      step("Round 90+", "Spike na saída."),
    ],
    metaStatus: "✅ v55.2 — Park Path CHIMPS padrão.",
  },
  {
    id: "chimps-carved",
    title: "CHIMPS: Carved",
    badge: "CHIMPS Beginner",
    difficulty: "Desafiador",
    summary: "Caminho estreito — cada quadrado vale. Poucas torres fortes.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "carved-path",
    diagram: "curve",
    steps: [
      step("Round 1", "Obyn na melhor curva disponível."),
      step("Round 12–20", "Ninja + Alch — sem gastar em cantos ruins."),
      step("Regra", "Espaço apertado = upgrade, não quantidade."),
      step("Round 90+", "Spike no fim."),
    ],
    metaStatus: "✅ v55.2 — Carved CHIMPS space-management.",
  },
  {
    id: "chimps-frozen-over",
    title: "CHIMPS: Frozen Over",
    badge: "CHIMPS · gelo",
    difficulty: "Desafiador",
    summary: "Gelo/água. Core terrestre + Sub se houver azul.",
    useCombo: "combo-obyn-ninja-alch",
    mapRef: "frozen-over",
    diagram: "water",
    steps: [
      step("Round 1–20", "Obyn + Ninja + Alch na terra firme."),
      step("Água", "Sub 0-0-2 se o caminho passar bem na água."),
      step("Round 90+", "Spike no fim."),
    ],
    metaStatus: "✅ v55.2 — Frozen Over: terra core, Sub opcional.",
  },
];

const modeIds = new Set(t.modes.map((m) => m.id));
for (const m of moreChimps) {
  if (!modeIds.has(m.id)) t.modes.push(m);
}

// Ordenar modes: CHIMPS primeiro
t.modes.sort((a, b) => {
  const ac = a.id.startsWith("chimps-") ? 0 : 1;
  const bc = b.id.startsWith("chimps-") ? 0 : 1;
  if (ac !== bc) return ac - bc;
  return a.title.localeCompare(b.title);
});

// Checklist de rounds
t.roundChecklist = [
  { round: "1", label: "Herói no caminho", icon: "⭐" },
  { round: "1–4", label: "Dart 0-2-0 na curva", icon: "🎯" },
  { round: "12", label: "Ninja (antes do camo)", icon: "🥷" },
  { round: "20", label: "Alquimista (antes do chumbo)", icon: "🧪" },
  { round: "24", label: "Camo — Ninja resolve", icon: "👻" },
  { round: "28", label: "Chumbo — Alch resolve", icon: "🪨" },
  { round: "40/46", label: "MOAB — habilidade do herói", icon: "🎈" },
  { round: "90+", label: "Spike no fim (DDT)", icon: "📌" },
];

// FAQs úteis
const newFaqs = [
  {
    id: "chimps-primeiro-mapa",
    category: "modos",
    question: "Qual mapa fazer primeiro CHIMPS?",
    answer:
      "Monkey Meadow ou Tree Stump. Vença Hard antes. Use Obyn ou Sauda + Ninja + Alquimista. No site: aba Tutoriais → Modos especiais e CHIMPS por mapa.",
    tags: ["chimps", "primeiro", "meadow", "tree stump", "medalha preta"],
  },
  {
    id: "onde-ver-foto-mapa",
    category: "mapas",
    question: "Como ver a foto de um mapa?",
    answer:
      "Abra o tutorial do mapa neste site e toque em Ver foto do mapa na Wiki. Abre a página oficial da comunidade com imagens do mapa (em nova aba).",
    tags: ["foto", "imagem", "wiki", "mapa", "visual"],
  },
  {
    id: "diagrama-posicao",
    category: "inicio",
    question: "O que significam os diagramas de posição no site?",
    answer:
      "São desenhos simples (não oficiais) mostrando ONDE colocar torres: curva (vermelho), água (azul), fim do caminho (roxo), vários caminhos, loop, obstáculos. Use junto com o passo a passo.",
    tags: ["diagrama", "posição", "curva", "onde colocar"],
  },
  {
    id: "torres-icones-site",
    category: "inicio",
    question: "Os ícones de torres no site são oficiais?",
    answer:
      "Não — são emojis/cores para você achar a torre no menu do jogo sem confundir nomes. Dart 🎯, Ninja 🥷, Alch 🧪, Sub 🚤, Spike 📌. Arte oficial fica no próprio jogo e na Wiki.",
    tags: ["icone", "torre", "emoji", "visual"],
  },
];

const faqIds = new Set(faq.faqs.map((f) => f.id));
for (const f of newFaqs) {
  if (!faqIds.has(f.id)) faq.faqs.push(f);
}
faq.meta.reviewPass = (faq.meta.reviewPass || 6) + 1;

// Estratégia diagramas
const sid = new Set(t.strategies.map((s) => s.id));
if (!sid.has("estrategia-diagramas")) {
  t.strategies.unshift({
    id: "estrategia-diagramas",
    title: "Como ler os diagramas de posição",
    badge: "Visual",
    difficulty: "Essencial",
    summary:
      "Cada mapa pode mostrar um desenho simples. Cores = tipos de spot. Não é o mapa real — é um guia de ideia.",
    useCombo: "combo-facil-ninja-alch",
    diagram: "curve",
    steps: [
      step("Vermelho / curva", "Melhor lugar: balões demoram mais no alcance."),
      step("Azul / água", "Só torres de água (Sub). Terra = Ninja/Alch."),
      step("Roxo / fim", "Spike Factory no último pedaço do caminho."),
      step("Vários caminhos", "Fortifique UM primeiro, depois copie."),
      step("Loop", "Torres no MIOLA do círculo."),
      step("Obstáculo", "Ninja/Sniper; evite Dart atrás do bloqueio."),
    ],
    metaStatus: "✅ v55.2 — diagramas educativos do site (não oficiais).",
  });
}

fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
fs.writeFileSync(faqFile, JSON.stringify(faq, null, 2) + "\n");

console.log("Modes:", t.modes.length, "CHIMPS:", t.modes.filter((m) => m.id.startsWith("chimps-")).length);
console.log("Maps with diagram:", t.maps.filter((m) => m.diagram).length);
console.log("FAQs:", faq.faqs.length);
console.log("Checklist:", t.roundChecklist.length);
