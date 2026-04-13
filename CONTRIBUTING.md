# Guide de développement — iceLib

## Contexte architectural

iceLib a été migré d'un bundle global (SystemJS, tout dans un seul scope) vers des **modules ESM**. Durant cette migration, ~70 fichiers legacy ont reçu `// @ts-nocheck` et continuent de référencer des symboles globaux sans import explicite. Deux mondes coexistent :

| Monde | Fichiers | Pattern |
|---|---|---|
| **ESM typé** | Fichiers sans `@ts-nocheck`, nouveaux fichiers | `import { X } from './...'` |
| **Legacy global** | Fichiers avec `// @ts-nocheck` | Références directes aux globaux (`new ice2Label(...)`) |

---

## Règle 1 — Nouveau fichier typé → imports explicites

Tout nouveau fichier **sans** `// @ts-nocheck` doit importer explicitement ce dont il a besoin :

```typescript
// ✅ Correct
import { ice2Label } from '../ice2Label';
import { enumCouleur } from '../../xBase';

export class MaNouvelleClasse {
    // ...
}
```

Ne jamais compter sur `globalThis` dans un fichier typé.

---

## Règle 2 — Fichier legacy (`// @ts-nocheck`) → pas d'imports nécessaires

Les fichiers marqués `// @ts-nocheck` peuvent utiliser les globaux directement **à condition que le symbole soit enregistré dans `xGlobals.ts`** (voir règle 3).

```typescript
// @ts-nocheck
// Pas d'import — les symboles viennent de globalThis via xGlobals.ts
export class MonComposantLegacy {
    constructor() {
        this.label = new ice2Label({ textVariable: 'Hello' }); // ✅ fonctionne
    }
}
```

> Le `export` sur la classe est quand même obligatoire pour que le module ESM puisse l'inclure dans le bundle.

---

## Règle 3 — Toute nouvelle classe/enum doit être dans `xGlobals.ts`

`xGlobals.ts` est le pont entre les deux mondes. Il importe les symboles ESM et les expose sur `globalThis` pour les fichiers legacy.

### Quand mettre à jour `xGlobals.ts`

- Quand tu crées une **nouvelle classe** ou **enum** utilisée par des fichiers `@ts-nocheck`
- Quand une `ReferenceError: X is not defined` apparaît au runtime

### Comment mettre à jour `xGlobals.ts`

**Étape 1** — S'assurer que la classe/enum est exportée depuis son fichier source :

```typescript
// ice2MonComposant.ts
// @ts-nocheck
export class MonComposant { ... }      // ✅ export obligatoire
export enum MonEnum { A, B, C }        // ✅ export obligatoire
```

**Étape 2** — Ajouter l'import dans `xGlobals.ts` :

```typescript
// xGlobals.ts
import { MonComposant, MonEnum } from './V2/xcontrols/ice2MonComposant';
```

**Étape 3** — Ajouter l'assignment globalThis dans `xGlobals.ts` :

```typescript
(globalThis as any).MonComposant = MonComposant;
(globalThis as any).MonEnum = MonEnum;
```

> **Tous les imports doivent être en haut du fichier** (avant les assignments). ESM interdit les imports après du code.

---

## Règle 4 — Nouveau builder sur `xElementHolder` → `xElementHolderBuilders.ts`

Les méthodes fluentes (`asHolder.ice2Label(...)`, `asHolder.xdiv(...)`) sont définies dans `xElementHolderBuilders.ts` via extension de prototype.

Pour ajouter un builder pour un nouveau composant :

```typescript
// xElementHolderBuilders.ts
import { MonComposant } from './V2/xcontrols/ice2MonComposant';

// En bas du fichier, avec les autres :
xElementHolder.prototype.monComposant = function(o, out) {
    return _b.call(this, MonComposant, o, out);
};
```

Le helper `_b(ctor, o, out)` :
- crée `new ctor(o)`
- si `out` est fourni, assigne `out.content = instance`
- appelle `this.append(instance)`
- retourne `this` (pour le chaînage)

---

## Règle 5 — Pattern `Container<T>` (paramètre out)

Plusieurs composants utilisent un objet `Container<T>` pour récupérer une référence interne :

```typescript
// Déclaration
private monDiv: Container<xDiv> = new Container<xDiv>();

// Usage — le constructeur xDiv assigne out.content = this
new xDiv({ class: 'ma-classe' }, this.monDiv);
// Maintenant : this.monDiv.content === l'instance xDiv créée

// Ou via append (xElementHolder.append supporte le même pattern)
asHolder.append(new xDiv({ class: 'ma-classe' }), this.monDiv);
```

`Container<T>` est défini dans `xBase.ts` :
```typescript
export class Container<T> {
    public content: T = undefined as any;
}
```

---

## Règle 6 — Ajouter `index.ts` si le symbole doit être consommé depuis `icelib`

`index.ts` est le point d'entrée public du package. Seuls les symboles exportés ici sont accessibles aux consommateurs (`import { X } from 'icelib'`).

```typescript
// index.ts — ajouter en bas de la section appropriée
export * from './V2/xcontrols/ice2MonComposant';
// ou pour un export avec alias :
export { MaClasse as MaClassePublique } from './V2/xcontrols/ice2MonFichier';
```

Ne pas oublier de rebuilder (`npm run build`) après toute modification.

---

## Checklist — Ajouter un nouveau composant

```
[ ] Créer le fichier dans V2/xcontrols/ice2MonComposant.ts
[ ] Ajouter // @ts-nocheck si le fichier référence des globaux legacy
[ ] Exporter la classe et les enums (export class / export enum)
[ ] Ajouter l'import + globalThis dans xGlobals.ts
[ ] Ajouter le builder dans xElementHolderBuilders.ts (si composant UI)
[ ] Exporter depuis index.ts (si accès externe nécessaire)
[ ] npm run build && vérifier ✓ built
```

---

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `index.ts` | Point d'entrée public du package ESM |
| `xGlobals.ts` | Expose tous les symboles sur `globalThis` pour les fichiers legacy |
| `xElementHolderBuilders.ts` | Builder methods fluentes sur `xElementHolder.prototype` |
| `V2/xBase.ts` | Types de base : `Container<T>`, `iXElement`, `enumCouleur`, etc. |
| `xElement.ts` | `xElementHolder` — le DOM wrapper central |
