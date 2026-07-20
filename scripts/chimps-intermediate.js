const fs = require("fs");
const path = require("path");

const tutFile = path.join(__dirname, "..", "data", "tutorials.json");
const faqFile = path.join(__dirname, "..", "data", "faq.json");
const metaFile = path.join(__dirname, "..", "data", "meta-review.json");

const t = JSON.parse(fs.readFileSync(tutFile, "utf8"));
const faq = JSON.parse(fs.readFileSync(faqFile, "utf8"));
const meta = JSON.parse(fs.readFileSync(metaFile, "utf8"));

function step(when, d) {
  return { when, do: d };
}

function chimps(id, title, badge, summary, mapRef, combo, diagram, steps, tip) {
  return {
    id,
    title,
    badge,
    difficulty: "Desafiador",
    summary,
    useCombo: combo,
    mapRef,
    diagram,
    steps,
    tip,
    metaStatus:
      "✅ v55.2 — core Ninja+Alch/Obyn válido; ajuste posição ao layout do mapa.",
  };
}

const more = [
  chimps(
    "chimps-balance",
    "CHIMPS: Balance",
    "CHIMPS Intermediate",
    "3 caminhos. Um forte primeiro (o do meio), depois cobertura mínima nas laterais.",
    "balance",
    "combo-obyn-ninja-alch",
    "multipath",
    [
      step("Antes", "Vença Hard + 2–3 CHIMPS Beginner."),
      step("Round 1–20", "Obyn + Ninja + Alch no caminho CENTRAL."),
      step("Round 25+", "Ninja barato em cada lateral."),
      step("Round 46", "MOAB no lane principal — ability do Obyn."),
      step("Round 90+", "Spike na saída do caminho principal."),
    ],
    "Não divida o dinheiro em 3 no early."
  ),
  chimps(
    "chimps-bazaar",
    "CHIMPS: Bazaar",
    "CHIMPS Intermediate",
    "Cruzamento central. Sauda/Obyn no centro = máximo valor.",
    "bazaar",
    "combo-sauda-facil",
    "center",
    [
      step("Round 1", "Sauda ou Obyn no cruzamento."),
      step("Round 12–20", "Ninja + Alch no anel interno."),
      step("Mid", "Melhore o núcleo — não espalhe nas bordas."),
      step("Round 90+", "Spike perto da saída."),
    ]
  ),
  chimps(
    "chimps-quiet-street",
    "CHIMPS: Quiet Street",
    "CHIMPS Intermediate",
    "Primeiro Intermediate fácil. Mesmo core Beginner.",
    "quiet-street",
    "combo-obyn-ninja-alch",
    "curve",
    [
      step("Round 1–20", "Obyn → Dart early → Ninja → Alch."),
      step("Mid", "Upgrades tier 3–4 nas torres principais."),
      step("Round 90+", "Spike no fim da rua."),
    ]
  ),
  chimps(
    "chimps-downstream",
    "CHIMPS: Downstream",
    "CHIMPS Intermediate",
    "Rio longo. Terra + Sub opcional. Ninja+Alch na margem principal.",
    "downstream",
    "combo-obyn-ninja-alch",
    "water",
    [
      step("Round 1", "Obyn na melhor margem."),
      step("Round 12–20", "Ninja + Alch na mesma margem."),
      step("Opcional", "Sub 0-0-2 no rio se cobrir bem."),
      step("Round 90+", "Spike no fim."),
    ]
  ),
  chimps(
    "chimps-firing-range",
    "CHIMPS: Firing Range",
    "CHIMPS Intermediate",
    "Campo aberto em U. Sniper central + Ninja para camo.",
    "firing-range",
    "combo-sniper-alch",
    "curve",
    [
      step("Round 1", "Obyn no fundo do U."),
      step("Round 6–12", "Sniper no centro + Ninja (camo)."),
      step("Round 20", "Alch entre eles."),
      step("Round 90+", "Spike na saída + Sniper 0-2-5 se couber."),
    ]
  ),
  chimps(
    "chimps-streambed",
    "CHIMPS: Streambed",
    "CHIMPS Intermediate",
    "Rio no meio. Defesa numa margem primeiro.",
    "streambed",
    "combo-sauda-facil",
    "water",
    [
      step("Round 1", "Sauda/Obyn na margem com melhor curva."),
      step("Round 12–20", "Ninja + Alch na mesma margem."),
      step("Round 30+", "Cobertura mínima na outra margem se precisar."),
      step("Round 90+", "Spike no fim."),
    ]
  ),
  chimps(
    "chimps-water-park",
    "CHIMPS: Water Park",
    "CHIMPS · água",
    "Muita água. Sub core + Alch na terra. Evite Sauda como carry.",
    "water-park",
    "combo-sub-alch-agua",
    "water",
    [
      step("Antes", "Vença Peninsula/Resort em Hard."),
      step("Round 1", "Obyn na maior área seca."),
      step("Round 8–12", "Sub 0-0-2 (camo)."),
      step("Round 20", "Alch na terra + segundo Sub se precisar."),
      step("Round 90+", "Spike em terra no fim, se couber."),
    ],
    "Sauda é fraca aqui — Obyn/Quincy."
  ),
  chimps(
    "chimps-spice-islands",
    "CHIMPS: Spice Islands",
    "CHIMPS · água",
    "Ilhas. Sub entre ilhas + Ninja/Alch na maior terra.",
    "spice-islands",
    "combo-sub-alch-agua",
    "water",
    [
      step("Round 1", "Obyn na maior ilha."),
      step("Round 10", "Sub 0-0-2 na água."),
      step("Round 20", "Alch + Ninja na ilha."),
      step("Round 90+", "Spike na saída da ilha principal."),
    ]
  ),
  chimps(
    "chimps-moon-landing",
    "CHIMPS: Moon Landing",
    "CHIMPS Intermediate",
    "Crateras. Core no anel da cratera principal.",
    "moon-landing",
    "combo-obyn-ninja-alch",
    "curve",
    [
      step("Round 1–20", "Obyn + Ninja + Alch na cratera principal."),
      step("Posição", "Evite cantos sem caminho."),
      step("Round 90+", "Spike no fim."),
    ]
  ),
  chimps(
    "chimps-haunted",
    "CHIMPS: Haunted",
    "CHIMPS · obstáculos",
    "Névoa/obstáculos. Ninja > Dart. Sniper ajuda.",
    "haunted",
    "combo-sniper-alch",
    "obstacle",
    [
      step("Round 1", "Obyn em spot aberto."),
      step("Round 12", "Ninja (camo + ignora bloqueio)."),
      step("Round 20", "Alch + Sniper se precisar de MOAB DPS."),
      step("Round 90+", "Spike no fim."),
    ]
  ),
  chimps(
    "chimps-cracked",
    "CHIMPS: Cracked",
    "CHIMPS Intermediate",
    "Curvas boas. Sauda excelente.",
    "cracked",
    "combo-sauda-facil",
    "curve",
    [
      step("Round 1", "Sauda na melhor rachadura/curva."),
      step("Round 12–20", "Ninja + Alch."),
      step("Round 46", "Ability + Ninja upgradado."),
      step("Round 90+", "Spike no fim."),
    ]
  ),
  chimps(
    "chimps-karts",
    "CHIMPS: KartsNDarts",
    "CHIMPS multi-path",
    "2 pistas. Uma completa primeiro, depois a segunda.",
    "karts-and-darts",
    "combo-obyn-ninja-alch",
    "multipath",
    [
      step("Round 1–20", "Core completo na pista 1."),
      step("Round 25", "Ninja na pista 2."),
      step("Erro", "Dividir early nas duas pistas."),
      step("Round 90+", "Spike na saída da pista principal."),
    ]
  ),
  chimps(
    "chimps-rake",
    "CHIMPS: Rake",
    "CHIMPS multi-path",
    "Vários 'dentes'. Um lane forte, depois cópias baratas.",
    "rake",
    "combo-obyn-ninja-alch",
    "multipath",
    [
      step("Round 1–20", "Core no dente mais longo/central."),
      step("Round 25+", "Ninja barato nos outros dentes."),
      step("Round 90+", "Spike no exit principal."),
    ]
  ),
  chimps(
    "chimps-spring-spring",
    "CHIMPS: Spring Spring",
    "CHIMPS · aceleração",
    "Molas aceleram balões. Torres ANTES das molas.",
    "spring-trap",
    "combo-obyn-ninja-alch",
    "fast",
    [
      step("Round 1", "Obyn no trecho LENTO (antes das molas)."),
      step("Round 12–20", "Ninja + Alch no mesmo trecho."),
      step("Erro", "Torres depois da aceleração — balões passam rápido demais."),
      step("Round 90+", "Spike no fim + DPS alto."),
    ]
  ),
  chimps(
    "chimps-encrypted",
    "CHIMPS: Encrypted",
    "CHIMPS Intermediate",
    "Espaço moderado. Upgrade > spam.",
    "encrypted",
    "combo-obyn-ninja-alch",
    "curve",
    [
      step("Round 1–20", "Core Obyn + Ninja + Alch."),
      step("Mid", "Ninja 0-4-0 + Alch 4-2-0 quando puder."),
      step("Round 50+", "Village MIB se couber."),
      step("Round 90+", "Spike no fim."),
    ]
  ),
  chimps(
    "chimps-adoras-temple",
    "CHIMPS: Adora's Temple",
    "CHIMPS · Adora",
    "Bom para treinar Adora. Ninja+Alch ainda é o core early.",
    "adoras-temple",
    "combo-facil-ninja-alch",
    "center",
    [
      step("Herói", "Adora se tiver; senão Obyn."),
      step("Round 12–20", "Ninja + Alch."),
      step("Late", "Alch perto da Adora — ela escala bem."),
      step("Round 90+", "Spike + anti-DDT."),
    ],
    "Adora não substitui camo/chumbo no early."
  ),
  chimps(
    "chimps-infernal",
    "CHIMPS: Infernal (primeiro Expert)",
    "CHIMPS Expert · entrada",
    "Expert mais acessível. Caminhos longos alternados. Centro cobre os dois.",
    "infernal",
    "combo-meta-avancado",
    "multipath",
    [
      step("Antes", "Hard em Infernal + vários Intermediate CHIMPS."),
      step("Round 1", "Geraldo ou Obyn no centro entre os lanes."),
      step("Round 1–20", "Ninja + Alch cobrindo ambos (alternam por round)."),
      step("Mid", "Ninja GM + Perma Brew + MIB."),
      step("Round 90+", "Spike + Glue/anti-DDT."),
      step("Aviso", "Se Intermediate CHIMPS ainda é apertado, espere."),
    ],
    "Observe round ímpar vs par — os dois caminhos precisam de cobertura."
  ),
  chimps(
    "chimps-dark-castle",
    "CHIMPS: Dark Castle",
    "CHIMPS Expert",
    "Segundo Expert de entrada. Caminho curto convergente. Árvores $1000.",
    "dark-castle",
    "combo-meta-avancado",
    "end",
    [
      step("Antes", "Infernal CHIMPS ou Hard em Dark Castle."),
      step("Round 1", "Herói no trecho convergente."),
      step("Árvores", "Remova 1–2 se balões ficarem imunes ($1000 cada)."),
      step("Round 12–30", "Ninja + Alch + MIB no convergente."),
      step("Late", "Spike no castelo (fim) — essencial."),
    ]
  ),
];

const ids = new Set(t.modes.map((m) => m.id));
for (const m of more) {
  if (!ids.has(m.id)) t.modes.push(m);
}

t.modes.sort((a, b) => {
  const rank = (m) => {
    if (m.id.startsWith("chimps-") && /Expert/i.test(m.badge || "")) return 2;
    if (m.id.startsWith("chimps-") && /Intermediate|água|obstáculos|Adora|aceleração|multi/i.test(m.badge || ""))
      return 1;
    if (m.id.startsWith("chimps-")) return 0;
    return 3;
  };
  const d = rank(a) - rank(b);
  return d || a.title.localeCompare(b.title);
});

const newStrats = [
  {
    id: "estrategia-chimps-intermediate",
    title: "Quando passar para CHIMPS Intermediate",
    badge: "Progressão",
    difficulty: "Intermediário",
    summary:
      "Depois de 3–5 medalhas pretas Beginner. Quiet Street e Balance são os próximos passos naturais.",
    useCombo: "combo-obyn-ninja-alch",
    diagram: "multipath",
    steps: [
      step("Requisito", "Meadow + Tree Stump CHIMPS (ou equivalentes)."),
      step("Ordem", "Quiet Street → Balance → Bazaar → Downstream → Cracked."),
      step("Água", "Streambed → Spice Islands → Water Park (Obyn, não Sauda)."),
      step("Multi-path", "Karts → Rake → Four Circles (já feito?)."),
      step("Expert", "Só depois: Infernal → Dark Castle."),
    ],
    metaStatus: "✅ v55.2 — progressão CHIMPS alinhada à dificuldade oficial.",
  },
  {
    id: "estrategia-impoppable-mapa",
    title: "Impoppable em qualquer mapa",
    badge: "1 vida",
    difficulty: "Intermediário",
    summary:
      "Mesma build do Hard, zero margem. Pause antes dos rounds críticos.",
    useCombo: "combo-facil-ninja-alch",
    diagram: "curve",
    steps: [
      step("Antes", "Vença Hard no mapa."),
      step("Round 1", "Herói imediatamente."),
      step("Round 12/20", "Ninja e Alch ANTES de apertar play nos rounds 24/28."),
      step("Round 46", "MOAB — upgrades tier 3+ prontos."),
      step("Diferença do CHIMPS", "Pode usar MK e powers (se quiser). CHIMPS é mais restrito."),
    ],
    metaStatus: "✅ v55.2 — Impoppable = Hard com 1 vida; core igual.",
  },
];

const sid = new Set(t.strategies.map((s) => s.id));
for (const s of newStrats) {
  if (!sid.has(s.id)) t.strategies.unshift(s);
}

const newFaqs = [
  {
    id: "chimps-intermediate-quando",
    category: "modos",
    question: "Quando tentar CHIMPS Intermediate?",
    answer:
      "Depois de algumas medalhas pretas Beginner (Meadow, Tree Stump). Comece por Quiet Street ou Balance. No site: Modos especiais → filtros CHIMPS Intermediate.",
    tags: ["chimps", "intermediate", "balance", "quiet street"],
  },
  {
    id: "chimps-agua",
    category: "modos",
    question: "CHIMPS em mapa com água — o que muda?",
    answer:
      "Evite Sauda como carry. Use Obyn/Quincy + Sub 0-0-2 na água + Alch na terra. Exemplos: Water Park, Spice Islands, Resort. Veja os tutoriais CHIMPS · água no site.",
    tags: ["chimps", "agua", "sub", "sauda"],
  },
  {
    id: "chimps-expert-primeiro",
    category: "modos",
    question: "Primeiro CHIMPS Expert — qual mapa?",
    answer:
      "Infernal (mais acessível), depois Dark Castle. Não comece em #Ouch, Quad ou Blons. Precisa de Ninja Grandmaster + Alch Permanent Brew + MIB + Spike.",
    tags: ["chimps", "expert", "infernal", "dark castle"],
  },
  {
    id: "diferenca-impoppable-chimps",
    category: "modos",
    question: "Impoppable e CHIMPS — qual a diferença?",
    answer:
      "Ambos têm 1 vida. CHIMPS também: sem vender torres, sem powers, sem Monkey Knowledge, sem habilidades de dinheiro. Impoppable permite MK e powers. Faça Impoppable antes do CHIMPS no mesmo mapa.",
    tags: ["impoppable", "chimps", "diferenca", "regras"],
  },
];

const faqIds = new Set(faq.faqs.map((f) => f.id));
for (const f of newFaqs) {
  if (!faqIds.has(f.id)) faq.faqs.push(f);
}

meta.reviewPass = 14;
meta.changelog.push({
  date: "2026-07-20",
  version: "55.2",
  pass: 14,
  changes: [
    "+18 CHIMPS Intermediate/água/Expert entrada (Balance → Dark Castle)",
    "Estratégias: progressão CHIMPS Intermediate + Impoppable genérico",
    "+4 FAQs modos CHIMPS/água/Expert/Impoppable",
    "Ordenação modes: Beginner CHIMPS → Intermediate → Expert → outros",
  ],
});

fs.writeFileSync(tutFile, JSON.stringify(t, null, 2) + "\n");
fs.writeFileSync(faqFile, JSON.stringify(faq, null, 2) + "\n");
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2) + "\n");

console.log(
  "CHIMPS:",
  t.modes.filter((m) => m.id.startsWith("chimps-")).length,
  "Modes:",
  t.modes.length,
  "FAQs:",
  faq.faqs.length,
  "Strategies:",
  t.strategies.length
);
