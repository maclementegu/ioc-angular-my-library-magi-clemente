# Models i adaptador

## Fitxers

| Rol | Fitxer |
|---|---|
| Model de la resposta de l'API | `src/app/models/llibre-api.model.ts` |
| Model intern | `src/app/models/llibre.model.ts` |
| Adaptador | `src/app/adaptadors/llibre.adaptador.ts` |

## Mapatge API -> model intern

| Camp API (`LlibreApi`) | Camp intern (`Llibre`) | Transformació |
|---|---|---|
| `id` (string) | `id` (number) | `Number(api.id)` |
| `titol` | `titol` | `trim()`; si falta, text buit |
| `autor` | `autor` | `trim()`; si falta, text buit |
| `descripcio` | `descripcio` | `trim()`; si queda buida, "Sense descripció" |
| `categoria` | `categoria` | `trim()` + minúscules i cerca a la llista de categories vàlides; per defecte "Novel·la" |
| `data_afegida` | `dataAfegida` | Canvi de nom (snake_case a camelCase) i `trim()` |
| `valoracio` (string o number) | `valoracio` (number) | Conversió segura amb `Number()`; valors no vàlids donen 0 i s'acota entre 0 i 5 |
| `destacat?` | `destacat` | `true` només si és exactament `true`; si falta, `false` |

## Normalitzacions aplicades

1. Neteja d'espais amb `trim()` en els textos.
2. Conversió numèrica segura de la valoració.
3. Valors per defecte per als camps opcionals (`destacat`).
4. Normalització de categories (majúscules i minúscules).
5. Substitució de textos buits (descripció).