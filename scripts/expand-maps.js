const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "tutorials.json");
const t = JSON.parse(fs.readFileSync(file, "utf8"));

const TIER = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

const fixes = {
  cub: {
    title: "Cubism",
    tier: "beginner",
    badge: "Beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
  },
  "alpine-run": {
    tier: "beginner",
    badge: "Beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
  },
  "four-circles": {
    tier: "beginner",
    badge: "Beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
  },
  "hedge-park": {
    title: "Hedge",
    tier: "beginner",
    badge: "Beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
  },
  "carved-path": {
    title: "Carved",
    tier: "beginner",
    badge: "Beginner",
    difficulty: "Fácil",
    mode: "Easy",
  },
  "end-of-the-lane": {
    title: "End of the Road",
    tier: "beginner",
    badge: "Beginner",
    difficulty: "Fácil",
    mode: "Easy",
  },
  "spring-trap": {
    title: "Spring Spring",
    tier: "intermediate",
    badge: "Intermediate",
    difficulty: "Médio",
    mode: "Medium → Hard",
  },
  "quiet-street": { tier: "intermediate", badge: "Intermediate" },
  "lotus-valley": {
    title: "Lotus Island",
    tier: "beginner",
    badge: "Beginner · água",
    difficulty: "Fácil",
    mode: "Easy → Medium",
    useCombo: "combo-sub-alch-agua",
  },
  peninsula: {
    tier: "advanced",
    badge: "Advanced · água",
    difficulty: "Difícil",
    mode: "Hard",
  },
  "off-the-coast": {
    tier: "advanced",
    badge: "Advanced · água",
    difficulty: "Difícil",
    mode: "Hard",
  },
  "pats-pond": {
    tier: "advanced",
    badge: "Advanced · água",
    difficulty: "Difícil",
    mode: "Hard",
  },
  spillway: {
    tier: "advanced",
    badge: "Advanced",
    difficulty: "Difícil",
    mode: "Hard",
  },
  geared: {
    tier: "advanced",
    badge: "Advanced · gira",
    difficulty: "Difícil",
    mode: "Hard",
  },
  cargo: { tier: "advanced", badge: "Advanced · água" },
  "high-finance": { tier: "advanced" },
  cornfield: { tier: "advanced" },
  "another-brick": { tier: "advanced" },
  "x-factor": { tier: "advanced" },
  "muddy-puddles": { tier: "expert", badge: "Expert" },
  quad: { tier: "expert", badge: "Expert" },
  infernal: { tier: "expert", badge: "Expert · mais fácil" },
  "dark-castle": { tier: "expert", badge: "Expert" },
  "monkey-meadows": { tier: "beginner", badge: "Beginner · comece aqui" },
  "skull-tweak": { tier: "beginner", badge: "Beginner · v55" },
  "tree-stump": { tier: "beginner", badge: "Beginner" },
  logs: { tier: "beginner", badge: "Beginner" },
  "town-center": { tier: "beginner", badge: "Beginner" },
  "in-the-loop": { tier: "beginner", badge: "Beginner" },
  "park-path": { tier: "beginner", badge: "Beginner" },
  "one-two-tree": { tier: "beginner", badge: "Beginner" },
  balance: { tier: "intermediate", badge: "Intermediate" },
  bazaar: { tier: "intermediate", badge: "Intermediate" },
  streambed: { tier: "intermediate", badge: "Intermediate" },
  "karts-and-darts": { tier: "intermediate", badge: "Intermediate" },
  downstream: { tier: "intermediate", badge: "Intermediate" },
  "firing-range": { tier: "intermediate", badge: "Intermediate" },
  rake: { tier: "intermediate", badge: "Intermediate" },
  cracked: { tier: "intermediate", badge: "Intermediate" },
  "moon-landing": { tier: "intermediate", badge: "Intermediate" },
  haunted: { tier: "intermediate", badge: "Intermediate" },
  "spice-islands": { tier: "intermediate", badge: "Intermediate" },
  chutes: { tier: "intermediate", badge: "Intermediate" },
  "water-park": { tier: "intermediate", badge: "Intermediate" },
  "snake-path": { tier: "intermediate", badge: "Intermediate" },
  dockside: { tier: "intermediate", badge: "Intermediate" },
};

t.maps.forEach((m) => {
  const f = fixes[m.id];
  if (f) Object.assign(m, f);
  if (!m.tier) {
    if (/Expert/i.test(m.badge || "")) m.tier = "expert";
    else if (/Advanced/i.test(m.badge || "")) m.tier = "advanced";
    else if (/Intermediate|Médio/i.test(m.badge || m.difficulty || ""))
      m.tier = "intermediate";
    else m.tier = "beginner";
  }
});

const existing = new Set(t.maps.map((m) => m.id));

function step(when, d) {
  return { when, do: d };
}

const novo = [
  {
    id: "middle-of-the-road",
    title: "Middle of the Road",
    badge: "Beginner",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy",
    summary:
      "Caminho no meio da estrada. Espaço amplo e layout simples — ótimo depois de Meadows.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Quincy no meio, perto do caminho."),
      step("Round 2–4", "Dart 0-2-0 na curva principal."),
      step("Round 12–20", "Ninja + Alch — camo 24 e chumbo 28."),
      step("Vitória", "Easy round 40. Depois tente Medium."),
    ],
    nextMap: "Scrapyard ou The Cabin",
  },
  {
    id: "scrapyard",
    title: "Scrapyard",
    badge: "Beginner",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
    summary:
      "Ferro-velho com obstáculos leves. Ninja resolve se Dart ficar bloqueado.",
    useCombo: "combo-facil-ninja-alch",
    altCombo: "combo-sniper-alch",
    steps: [
      step("Round 1", "Herói em spot aberto (teste alcance verde)."),
      step("Round 12", "Ninja — ignora obstáculos melhor que Dart."),
      step("Round 20", "Alchemist ao lado do Ninja."),
      step("Dica", "Se torre não atira, está bloqueada — mude de posição."),
    ],
    nextMap: "The Cabin ou Resort",
  },
  {
    id: "the-cabin",
    title: "The Cabin",
    badge: "Beginner",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy",
    summary:
      "Cabana no bosque. Curvas boas para Sauda e Ninja. Beginner clássico.",
    useCombo: "combo-sauda-facil",
    altCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Sauda ou Quincy numa curva perto da cabana."),
      step("Round 12–20", "Ninja + Alch nas curvas."),
      step("Round 40", "Habilidade do herói no MOAB."),
    ],
    nextMap: "Resort ou Skates",
  },
  {
    id: "resort",
    title: "Resort",
    badge: "Beginner · água",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
    summary:
      "Resort com piscina. Primeiro contato leve com água — Sub opcional.",
    useCombo: "combo-facil-ninja-alch",
    altCombo: "combo-sub-alch-agua",
    steps: [
      step("Round 1", "Quincy ou Obyn na terra."),
      step("Round 12–20", "Ninja + Alch na terra (suficiente no Easy)."),
      step("Opcional", "Sub 0-0-2 na piscina para praticar água."),
      step("Dica", "Sauda ainda funciona se houver terra boa nas curvas."),
    ],
    nextMap: "Skates ou Candy Falls",
  },
  {
    id: "skates",
    title: "Skates",
    badge: "Beginner",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy",
    summary:
      "Pista de patinação. Caminho longo e claro. Remova bloqueios baratos só se precisar.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói na curva da pista."),
      step(
        "Round 12–20",
        "Ninja + Alch no trecho onde balões demoram mais."
      ),
      step("Bloqueios", "Só remova se atrapalhar — dinheiro é da defesa."),
    ],
    nextMap: "Candy Falls ou Winter Park",
  },
  {
    id: "candy-falls",
    title: "Candy Falls",
    badge: "Beginner",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
    summary:
      "Cachoeira de doces. Visual colorido, layout amigável. Ninja+Alch padrão.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói perto do caminho principal."),
      step("Round 12–20", "Ninja + Alch."),
      step("Round 40", "MOAB Easy — Ninja tier 3 ajuda."),
    ],
    nextMap: "Winter Park ou Frozen Over",
  },
  {
    id: "winter-park",
    title: "Winter Park",
    badge: "Beginner",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy",
    summary:
      "Parque de inverno. Espaço amplo, curvas suaves. Ideal para praticar posição.",
    useCombo: "combo-dart-boomerang",
    steps: [
      step("Round 1–8", "Dart + Boomerang nas curvas."),
      step("Round 12", "Ninja antes do camo."),
      step("Round 20", "Alch antes do chumbo."),
    ],
    nextMap: "Frozen Over ou Lotus Island",
  },
  {
    id: "frozen-over",
    title: "Frozen Over",
    badge: "Beginner · gelo",
    tier: "beginner",
    difficulty: "Fácil",
    mode: "Easy → Medium",
    summary:
      "Lago congelado. Água sob o gelo em partes — Sub em spots azuis se aparecerem.",
    useCombo: "combo-facil-ninja-alch",
    altCombo: "combo-sub-alch-agua",
    steps: [
      step("Round 1", "Herói na terra firme."),
      step("Round 12–20", "Ninja + Alch."),
      step("Água", "Se houver azul, Sub 0-0-2 complementa camo."),
    ],
    nextMap: "Cubism ou Hedge",
  },
  {
    id: "polyphemus",
    title: "Polyphemus",
    badge: "Intermediate",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Medium → Hard",
    summary:
      "Mapa do ciclope. Obstáculos centrais — Ninja e Sniper funcionam bem.",
    useCombo: "combo-sniper-alch",
    altCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói em spot com visão do caminho."),
      step("Round 12", "Ninja ou Sniper — evite Dart atrás do obstáculo."),
      step("Round 20", "Alch para chumbo."),
      step("Round 40+", "Tier 3 nas torres principais."),
    ],
    nextMap: "Covered Garden ou Quarry",
  },
  {
    id: "covered-garden",
    title: "Covered Garden",
    badge: "Intermediate",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Medium",
    summary:
      "Jardim coberto. Espaço bom com algumas plantas bloqueando. Ninja+Alch.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Sauda ou Quincy numa curva aberta."),
      step("Round 12–20", "Ninja + Alch."),
      step("Dica", "Teste alcance — plantas podem bloquear Dart."),
    ],
    nextMap: "Quarry ou Bloonarius Prime",
  },
  {
    id: "quarry",
    title: "Quarry",
    badge: "Intermediate",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Hard",
    summary:
      "Pedreira com caminhos em níveis. Posicione no trecho mais longo.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói no caminho principal (mais longo)."),
      step("Round 12–20", "Ninja + Alch nesse caminho."),
      step("Round 30+", "Reforce se balões escaparem por atalhos."),
    ],
    nextMap: "Bloonarius Prime ou Encrypted",
  },
  {
    id: "bloonarius-prime",
    title: "Bloonarius Prime",
    badge: "Intermediate",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Medium → Hard",
    summary:
      "Temático do boss Bloonarius. Layout Intermediate padrão — Ninja+Alch carrega.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói cedo na curva."),
      step("Round 12–20", "Ninja + Alch completos."),
      step("Round 40+", "MOAB — herói ability + Ninja melhorado."),
    ],
    nextMap: "Encrypted ou Adora's Temple",
  },
  {
    id: "encrypted",
    title: "Encrypted",
    badge: "Intermediate",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Hard",
    summary:
      "Mapa digital/criptografado. Espaço moderado. Foque upgrades, não spam.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Obyn ou Quincy no centro útil."),
      step("Round 12–20", "Ninja + Alch."),
      step("Regra", "Poucas torres fortes — espaço não é infinito."),
    ],
    nextMap: "Adora's Temple ou Spring Spring",
  },
  {
    id: "adoras-temple",
    title: "Adora's Temple",
    badge: "Intermediate · Adora",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Hard",
    summary:
      "Templo da Adora. Bom para treinar Adora depois de desbloquear. Ninja+Alch também funciona.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Herói", "Adora se já tiver; senão Obyn/Quincy."),
      step("Round 12–20", "Ninja + Alch no caminho do templo."),
      step("Late", "Adora escala bem com buffs — Alch perto dela ajuda."),
    ],
    nextMap: "Spring Spring ou Firing Range",
  },
  {
    id: "lost-crevasse",
    title: "Lost Crevasse",
    badge: "Intermediate",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Hard",
    summary:
      "Rachadura / canyon. Caminho embaixo — torres nas bordas. Alcance importa.",
    useCombo: "combo-sniper-alch",
    altCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói na borda com visão do canyon."),
      step("Round 10", "Sniper ou Ninja com alcance no caminho."),
      step("Round 20", "Alch."),
      step("Dica", "Não coloque torre sem ver o caminho."),
    ],
    nextMap: "Luminous Cove ou Sulfur Springs",
  },
  {
    id: "luminous-cove",
    title: "Luminous Cove",
    badge: "Intermediate · água",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Medium → Hard",
    summary: "Enseada luminosa. Muita água — Sub + Alch.",
    useCombo: "combo-sub-alch-agua",
    steps: [
      step("Round 1", "Obyn na terra (não Sauda)."),
      step("Round 10", "Sub 0-0-2 na água."),
      step("Round 20", "Alch na terra."),
      step("Round 30+", "Segundo Sub se precisar."),
    ],
    nextMap: "Sulfur Springs ou Ancient Portal",
  },
  {
    id: "sulfur-springs",
    title: "Sulfur Springs",
    badge: "Intermediate",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Hard",
    summary:
      "Fontes de enxofre. Layout Intermediate com obstáculos. Ninja+Alch.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói em curva aberta."),
      step("Round 12–20", "Ninja + Alch."),
      step("Round 40+", "Tier 3 antes do MOAB."),
    ],
    nextMap: "Ancient Portal ou Polyphemus",
  },
  {
    id: "ancient-portal",
    title: "Ancient Portal",
    badge: "Intermediate",
    tier: "intermediate",
    difficulty: "Médio",
    mode: "Hard",
    summary:
      "Portal antigo. Pode ter gimmick de caminho — observe 1–2 rounds antes de gastar tudo.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói; observe de onde vêm os balões."),
      step("Round 12–20", "Ninja + Alch no trecho mais usado."),
      step("Dica", "Se o caminho mudar, posicione no centro."),
    ],
    nextMap: "Downstream ou Balance",
  },
  {
    id: "mesa",
    title: "Mesa",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Platô desértico. Espaço limitado no topo. Poucas torres fortes.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Antes", "Vença Intermediate em Hard."),
      step("Round 1", "Herói no melhor spot do platô."),
      step("Round 12–20", "Ninja + Alch juntos."),
      step("Regra", "Espaço apertado = upgrade, não quantidade."),
    ],
    nextMap: "Underground ou Midnight Mansion",
  },
  {
    id: "underground",
    title: "Underground",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Subterrâneo. Visão limitada em túneis — Ninja/Sniper/Mortar.",
    useCombo: "combo-sniper-alch",
    altCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói onde vê o máximo do caminho."),
      step("Round 12", "Ninja — não depende de linha longa."),
      step("Round 20", "Alch + Sniper se couber."),
      step("Erro", "Dart no túnel sem visão."),
    ],
    nextMap: "Midnight Mansion ou Erosion",
  },
  {
    id: "midnight-mansion",
    title: "Midnight Mansion",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Mansão à meia-noite. Obstáculos e espaços fechados. Ninja+Alch no corredor principal.",
    useCombo: "combo-facil-ninja-alch",
    altCombo: "combo-sniper-alch",
    steps: [
      step("Round 1", "Obyn no hall / corredor principal."),
      step("Round 12–20", "Ninja + Alch."),
      step("Round 40+", "Village MIB se houver espaço."),
    ],
    nextMap: "Erosion ou Dark Path",
  },
  {
    id: "erosion",
    title: "Erosion",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary: "Terreno erodido. Caminho irregular. Foque curvas e DPS.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói na melhor curva."),
      step("Round 12–20", "Ninja + Alch."),
      step("Round 50+", "Spike no fim do caminho."),
    ],
    nextMap: "Dark Path ou Sunken Columns",
  },
  {
    id: "dark-path",
    title: "Dark Path",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Caminho escuro / floresta. Visão ruim — Ninja e Village radar ajudam.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói cedo."),
      step("Round 12", "Ninja (camo nativo)."),
      step("Round 20", "Alch."),
      step(
        "Opcional",
        "Village 0-2-0 radar se usar torres sem camo."
      ),
    ],
    nextMap: "Sunken Columns ou Last Resort",
  },
  {
    id: "sunken-columns",
    title: "Sunken Columns",
    badge: "Advanced · água",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary: "Colunas submersas. Água + obstáculos. Sub + Ninja.",
    useCombo: "combo-sub-alch-agua",
    steps: [
      step("Round 1", "Obyn na terra disponível."),
      step("Round 10", "Sub 0-0-2."),
      step("Round 20", "Alch + Ninja se houver terra."),
      step("Erro", "Sauda como carry principal."),
    ],
    nextMap: "Last Resort ou Castle Revenge",
  },
  {
    id: "last-resort",
    title: "Last Resort",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Último recurso — layout apertado Advanced. Economia e upgrades.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Antes", "Vença High Finance / Mesa."),
      step("Round 1", "Geraldo ou Obyn."),
      step("Round 12–30", "Ninja + Alch → Village MIB."),
      step("Late", "Spike no fim."),
    ],
    nextMap: "Castle Revenge ou Enchanted Glade",
  },
  {
    id: "castle-revenge",
    title: "Castle Revenge",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Castelo (versão Advanced). Menos extremo que Dark Castle. Centro convergente.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step(
        "Round 1",
        "Herói no trecho onde caminhos se aproximam."
      ),
      step("Round 12–20", "Ninja + Alch."),
      step("Late", "Spike perto da saída."),
    ],
    nextMap: "Enchanted Glade ou Party Parade",
  },
  {
    id: "enchanted-glade",
    title: "Enchanted Glade",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Clareira encantada. Espaço irregular. Obyn sinergiza com magia.",
    useCombo: "combo-obyn-ninja-alch",
    steps: [
      step("Round 1", "Obyn no centro útil."),
      step("Round 12–20", "Ninja + Alch."),
      step("Round 40+", "Wall of Trees no MOAB se precisar."),
    ],
    nextMap: "Party Parade ou Sunset Gulch",
  },
  {
    id: "party-parade",
    title: "Party Parade",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Desfile / festa. Caminho pode ser longo mas com pressão. Ninja+Alch.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói no percurso do desfile."),
      step("Round 12–20", "Ninja + Alch."),
      step("Round 40+", "Tier 3–4 antes do late."),
    ],
    nextMap: "Sunset Gulch ou Mushroom Grotto",
  },
  {
    id: "sunset-gulch",
    title: "Sunset Gulch",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Desfiladeiro ao pôr do sol. Canyon — alcance e posição.",
    useCombo: "combo-sniper-alch",
    altCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói na borda com visão."),
      step("Round 12", "Sniper ou Ninja."),
      step("Round 20", "Alch."),
    ],
    nextMap: "Mushroom Grotto ou Infernal",
  },
  {
    id: "mushroom-grotto",
    title: "Mushroom Grotto",
    badge: "Advanced",
    tier: "advanced",
    difficulty: "Difícil",
    mode: "Hard",
    summary:
      "Gruta de cogumelos. Obstáculos orgânicos. Ninja ignora bem.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step("Round 1", "Herói em clareira."),
      step("Round 12–20", "Ninja + Alch."),
      step("Dica", "Evite Dart atrás de cogumelos grandes."),
    ],
    nextMap: "Infernal (primeiro Expert)",
  },
  {
    id: "workshop",
    title: "Workshop",
    badge: "Expert · mecânico",
    tier: "expert",
    difficulty: "Muito difícil",
    mode: "Hard (experiente)",
    summary:
      "Oficina com esteiras que mudam o caminho. Observe a mecânica antes de gastar.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Antes", "Vença Infernal e Dark Castle."),
      step("Round 1", "Observe 1 ciclo das esteiras."),
      step("Herói", "Geraldo ou Etienne — flexibilidade."),
      step(
        "Round 12–20",
        "Ninja + Alch em spot que cobre múltiplas configurações."
      ),
      step("Aviso", "Mapa Expert com gimmick — não é para iniciantes."),
    ],
    nextMap: "Flooded Valley ou Bloody Puddles",
  },
  {
    id: "flooded-valley",
    title: "Flooded Valley",
    badge: "Expert · água",
    tier: "expert",
    difficulty: "Muito difícil",
    mode: "Hard",
    summary:
      "Vale inundado. Quase só água. Sub é obrigatório. Sauda fraca.",
    useCombo: "combo-sub-alch-agua",
    steps: [
      step("Antes", "Domine Off the Coast e Pat's Pond em Hard."),
      step("Round 1", "Obyn na única terra boa."),
      step("Round 8–12", "Subs 0-0-2 cedo."),
      step("Round 20", "Alch na terra."),
      step("Late", "Vários Subs upgradados + suporte."),
    ],
    nextMap: "Bloody Puddles ou Ravine",
  },
  {
    id: "bloody-puddles",
    title: "Bloody Puddles",
    badge: "Expert",
    tier: "expert",
    difficulty: "Muito difícil",
    mode: "Hard/CHIMPS",
    summary:
      "Versão sangrenta do Muddy Puddles. Multi-path curto. Defesa em todos os lanes cedo.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Antes", "Vença Muddy Puddles."),
      step("Round 1–8", "Torre em CADA caminho (como Quad/Muddy)."),
      step("Round 12", "Camo em todos os lanes."),
      step("Round 20", "Alch centralizado se possível."),
      step(
        "Aviso",
        "Expert hardcore — ignore se Intermediate ainda é difícil."
      ),
    ],
    nextMap: "Ravine ou Sanctuary",
  },
  {
    id: "ravine",
    title: "Ravine",
    badge: "Expert",
    tier: "expert",
    difficulty: "Muito difícil",
    mode: "Hard",
    summary: "Ravina profunda. Pouco espaço, caminho curto. DPS extremo.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Antes", "Infernal + Dark Castle em Hard."),
      step("Round 1", "Geraldo — carry early."),
      step("Round 12–30", "Ninja GM + Alch Perma Brew + MIB."),
      step("Late", "Spike no fim obrigatório."),
    ],
    nextMap: "Sanctuary ou Dark Dungeons",
  },
  {
    id: "sanctuary",
    title: "Sanctuary",
    badge: "Expert",
    tier: "expert",
    difficulty: "Muito difícil",
    mode: "Hard",
    summary:
      "Santuário. Layout Expert complexo. Só depois de vários Experts.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Antes", "Vença 3+ Experts em Hard."),
      step("Round 1", "Geraldo ou Obyn."),
      step("Core", "Ninja+Alch+MIB+Spike — meta completo."),
      step("Aviso", "Não é mapa de aprendizado."),
    ],
    nextMap: "Dark Dungeons ou #Ouch",
  },
  {
    id: "dark-dungeons",
    title: "Dark Dungeons",
    badge: "Expert",
    tier: "expert",
    difficulty: "Muito difícil",
    mode: "Hard",
    summary: "Masmorras escuras. Visão péssima + Expert. Ninja essencial.",
    useCombo: "combo-meta-avancado",
    altCombo: "combo-sniper-alch",
    steps: [
      step("Round 1", "Herói + observe caminhos."),
      step("Round 12", "Ninjas — camo e visão curta."),
      step("Round 20+", "Alch + Village."),
      step("Late", "Spike e anti-DDT."),
    ],
    nextMap: "#Ouch ou Glacial Trail",
  },
  {
    id: "ouch",
    title: "#Ouch",
    badge: "Expert · lendário",
    tier: "expert",
    difficulty: "Extremo",
    mode: "Só veteranos",
    summary:
      "Um dos Experts mais difíceis. Multi-path infernal. NÃO tente cedo.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Antes", "Black border em vários Experts. Sério."),
      step("Round 1", "Geraldo + micro extremo."),
      step(
        "Estratégia",
        "Siga guia atualizado de CHIMPS #Ouch (muda com patch)."
      ),
      step(
        "Aviso",
        "Se você está lendo este site como iniciante: ignore este mapa por meses."
      ),
    ],
    nextMap: "Glacial Trail ou Tricky Tracks",
  },
  {
    id: "glacial-trail",
    title: "Glacial Trail",
    badge: "Expert · gelo",
    tier: "expert",
    difficulty: "Muito difícil",
    mode: "Hard",
    summary:
      "Trilha glacial. Gelo e Expert. Ice Monkey pode ajudar, mas Ninja+Alch ainda é base.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Antes", "Dark Castle e Infernal."),
      step("Round 1", "Herói em spot estável."),
      step("Core", "Ninja+Alch+MIB."),
      step("Gelo", "Ice opcional para stall — não substitua o core."),
    ],
    nextMap: "Tricky Tracks",
  },
  {
    id: "tricky-tracks",
    title: "Tricky Tracks",
    badge: "Expert",
    tier: "expert",
    difficulty: "Muito difícil",
    mode: "Hard",
    summary:
      "Trilhos complicados. Caminhos múltiplos/enganosos. Observe antes de gastar.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("Round 1", "Pause e veja de onde vêm os balões."),
      step("Round 1–15", "Defesa nos lanes ativos."),
      step("Core", "Ninja+Alch+MIB+Spike."),
      step("Aviso", "Expert completo — último da trilha."),
    ],
    nextMap: "Parabéns — você cobriu o mapa Expert",
  },
];

for (const m of novo) {
  if (!existing.has(m.id)) t.maps.push(m);
}

t.maps.sort(
  (a, b) =>
    (TIER[a.tier] || 9) - (TIER[b.tier] || 9) ||
    a.title.localeCompare(b.title)
);

const newStrats = [
  {
    id: "estrategia-beginner-completo",
    title: "Como zerar todos os Beginner",
    badge: "Roteiro",
    difficulty: "Essencial",
    summary:
      "Ordem fácil→menos fácil nos Beginner. Vença Easy depois Hard em cada um.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step(
        "Bloco 1",
        "Meadows → Town Center → Middle of the Road → End of the Road → Logs."
      ),
      step(
        "Bloco 2",
        "Tree Stump → In the Loop → Cubism → Four Circles → Hedge."
      ),
      step(
        "Bloco 3",
        "Park Path → Carved → Alpine Run → Scrapyard → The Cabin."
      ),
      step(
        "Água leve",
        "Resort → Lotus Island → Frozen Over → Skates → Candy Falls."
      ),
      step("Meta", "Hard em 15+ Beginner antes de Intermediate sério."),
    ],
    tip: "Skull Tweak (v55) encaixa no Bloco 2 — Ninja/Sniper.",
    metaStatus: "✅ v55.2 — lista Beginner oficial.",
  },
  {
    id: "estrategia-intermediate-completo",
    title: "Como subir Intermediate",
    badge: "Roteiro",
    difficulty: "Intermediário",
    summary: "Depois dos Beginner em Hard. Foque multi-path e água.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step(
        "Terrestre",
        "Balance → Bazaar → Cracked → Moon Landing → Encrypted."
      ),
      step(
        "Multi-path",
        "Karts → Rake → One Two Tree → Four Circles (revisão)."
      ),
      step(
        "Água",
        "Streambed → Downstream → Spice Islands → Water Park → Luminous Cove."
      ),
      step(
        "Obstáculos",
        "Haunted → Polyphemus → Firing Range → Lost Crevasse."
      ),
      step("Pronto p/ Advanced", "Hard em 12+ Intermediate."),
    ],
    metaStatus: "✅ v55.2 — trilha Intermediate.",
  },
  {
    id: "estrategia-advanced-completo",
    title: "Como sobreviver Advanced",
    badge: "Roteiro",
    difficulty: "Avançado",
    summary:
      "Advanced = menos espaço, mais gimmicks. Ninja+Alch ainda funciona, mas com menos margem.",
    useCombo: "combo-meta-avancado",
    steps: [
      step(
        "Entrada",
        "High Finance → Cornfield → X Factor → Another Brick."
      ),
      step(
        "Água",
        "Peninsula → Off the Coast → Cargo → Pat's Pond → Sunken Columns."
      ),
      step(
        "Gimmick",
        "Geared (gira) → Spillway → Underground → Mesa."
      ),
      step(
        "Antes do Expert",
        "Midnight Mansion → Erosion → Mushroom Grotto."
      ),
      step("Regra", "Hard em 8+ Advanced antes de Infernal."),
    ],
    metaStatus: "✅ v55.2 — Advanced com Ninja+Alch/MIB.",
  },
  {
    id: "estrategia-expert-completo",
    title: "Ordem Expert (do menos pior ao pior)",
    badge: "Roteiro Expert",
    difficulty: "Avançado",
    summary: "Nunca comece no #Ouch. Ordem da comunidade 2026.",
    useCombo: "combo-meta-avancado",
    steps: [
      step("1–2", "Infernal → Dark Castle (Experts de entrada)."),
      step("3–5", "Workshop → Flooded Valley → Muddy Puddles."),
      step("6–8", "Quad → Bloody Puddles → Ravine."),
      step("9–11", "Sanctuary → Dark Dungeons → Glacial Trail."),
      step("12–13", "Tricky Tracks → #Ouch (por último)."),
      step(
        "CHIMPS",
        "Primeiro CHIMPS Expert: Infernal ou Dark Castle."
      ),
    ],
    tip: "Builds mudam em patches — confira metaStatus e r/btd6 após major update.",
    metaStatus:
      "✅ v55.2 — ordem Expert alinhada à comunidade; Ninja+Alch+MIB+Spike ainda base.",
  },
  {
    id: "estrategia-meta-por-dificuldade",
    title: "Build por dificuldade de mapa",
    badge: "Meta v55.2",
    difficulty: "Essencial",
    summary: "Qual build usar em cada categoria — atualizado jul/2026.",
    useCombo: "combo-facil-ninja-alch",
    steps: [
      step(
        "Beginner",
        "Dart early → Ninja + Alch. Herói Quincy/Sauda/Obyn. Suficiente até Hard."
      ),
      step(
        "Intermediate",
        "Mesmo core. Adicione Village 0-2-0 ou MIB no late. Multi-path: um lane forte primeiro."
      ),
      step(
        "Advanced",
        "Ninja 0-4-0 + Alch 4-2-0 + MIB mais cedo. Menos spam. Água: Sub core."
      ),
      step(
        "Expert",
        "Meta completo: herói forte + Ninja GM + Perma Brew + MIB + Perma-Spike + anti-DDT."
      ),
      step(
        "Ainda vale?",
        "Sim em v55.2. Ninja/Alch sem nerf que inviabilize. Revise no v56 (Archer)."
      ),
    ],
    metaStatus:
      "✅ v55.2 — core Ninja+Alch viable Beginner→Expert; Expert precisa do kit completo.",
  },
];

const sid = new Set(t.strategies.map((s) => s.id));
for (const s of newStrats) {
  if (!sid.has(s.id)) t.strategies.push(s);
}

t.startHere.intro =
  "Este site cobre mapas do Beginner ao Expert com estratégias atualizadas (v55.2). Comece pelos fáceis e suba aos poucos.";
t.startHere.steps = [
  {
    icon: "1️⃣",
    title: "Mapas em ordem",
    text: "Na aba Tutoriais os mapas estão do fácil ao difícil (Beginner → Expert).",
  },
  {
    icon: "2️⃣",
    title: "Estratégias",
    text: "Leia a trilha completa e a build por dificuldade — tudo checado no meta atual.",
  },
  {
    icon: "3️⃣",
    title: "Não pule",
    text: "Vença Hard na categoria atual antes de Advanced/Expert. #Ouch é o último.",
  },
];

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
console.log("Por tier:", counts);
console.log("Estrategias:", t.strategies.length);
console.log("Broken:", broken.map((m) => m.id));
console.log("Primeiros:", t.maps.slice(0, 5).map((m) => m.title).join(", "));
console.log(
  "Ultimos:",
  t.maps.slice(-5).map((m) => m.title).join(", ")
);
