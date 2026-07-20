# Revisão de meta — BTD6 Dúvidas

Este documento descreve como manter a base de conhecimento alinhada ao meta atual do Bloons TD 6.

## Arquivos envolvidos

| Arquivo | Função |
|---------|--------|
| `data/faq.json` | Perguntas, respostas e tags |
| `data/meta-review.json` | Log de revisões, entradas alteradas, triggers |

## Quando revisar

1. **Nova versão major** (ex.: 56.0) — revisar entradas de meta, heróis e torres rebalanceadas
2. **Patch notes** com mudanças em Ninja, Alchemist, Geraldo ou Paragons
3. **Novo herói ou torre principal**
4. **Feedback** de usuários sobre resposta incorreta

## Checklist de revisão

- [ ] Ler patch notes em [Blooncyclopedia](https://www.bloonswiki.com/) ou r/btd6
- [ ] Verificar builds citadas (ex.: 0-4-0 Ninja, 4-2-0 Alch) ainda são meta
- [ ] Confirmar rounds (camo 24, lead 28, MOAB 40/46)
- [ ] Confirmar preços base em Medium (Dart $200, Ninja $400, Sniper $300)
- [ ] Atualizar `meta.gameVersion` e `meta.lastReviewed` em `faq.json`
- [ ] Registrar mudanças em `meta-review.json` → `changelog`
- [ ] Marcar entradas alteradas em `entriesUpdated`

## Entradas prioritárias (mudam com patches)

- `meta-iniciante-2026`, `meta-core-comp`
- `geraldo-meta`, `quincy-meta-2026`
- `ninja-alchemist`, `alchemist-420-vs-401`
- `dart-monkey` (paragon nerfs)
- `glue-gunner`, `beast-handler`, `desperado-mermonkey`

## Campos opcionais por FAQ

```json
{
  "lastReviewed": "2026-07-20"
}
```

Use em entradas sensíveis a balanceamento.

## Fontes confiáveis

1. [Blooncyclopedia / Bloons Wiki](https://www.bloonswiki.com/)
2. [Fandom BTD6 Balance Changes](https://bloons.fandom.com/wiki/Bloons_TD_6/Balance_changes)
3. [r/btd6](https://www.reddit.com/r/btd6/) — megathreads de patch
4. ISAB / JazItUp / Syntech — vídeos pós-patch (secundário)

## Histórico

Ver `data/meta-review.json` → `changelog`.
