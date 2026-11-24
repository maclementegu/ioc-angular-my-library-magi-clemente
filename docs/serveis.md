# Serveis

## API local

- Eina: `json-server` 1.0.0-beta.15 (dependència de desenvolupament).
- Fitxer de dades: `tools/api/llibres.json` (10 llibres).
- Arrencada: `npm run api` (port **4301**).
- URL base: `http://localhost:4301` (constant `API_URL` a `src/app/config/api.config.ts`).

| Mètode | Endpoint | Ús |
|---|---|---|
| GET | `/llibres` | Llista de llibres |
| POST | `/llibres` | Creació d'un llibre nou |

## LlibreService

Fitxer: `src/app/services/llibre.service.ts`.

Encapsula `HttpClient`: els components no construeixen URL ni fan peticions.

| Mètode | Descripció |
|---|---|
| `cerca(criteris)` | Emet uns criteris nous al flux de cerca |
| `reintentar()` | Torna a emetre els últims criteris (botó Reintentar) |
| `crearLlibre(nou)` | Calcula el següent id (GET), fa el POST i recarrega el llistat |
| `comptarResultats(terme)` | Retorna quants llibres coincideixen (el fa servir el validador asíncron) |
| `estat` | Signal de lectura amb `fase`, `llibres` i `error` |

### Estats

`fase` pot ser `inactiu`, `carregant`, `exit` o `error`. El servei posa `carregant` en rebre uns criteris nous, `exit` si el GET va bé i `error` si falla.

### switchMap

El constructor del servei fa `criteris$.pipe(tap(...), switchMap(...))`. Si arriba una cerca nova mentre n'hi ha una en curs, `switchMap` cancel·la la petició anterior. També s'usa a `crearLlibre` (GET de ids, després POST).

### Errors

`missatgeError` tradueix el codi HTTP: 0 (API no disponible), 404, 5xx i la resta.

Cada resposta passa per l'adaptador (`adaptarLlibresApi`) abans d'arribar a la vista.

## HistorialCerquesService

Fitxer: `src/app/services/historial-cerques.service.ts`.

- Clau de `localStorage`: `mylibrary-historial-cerques`.
- Guarda un màxim de 8 termes i evita duplicats consecutius.
- Lectura i escriptura dins de `try/catch`.