# MyLibrary

## Autor/a

Magí Clemente

## Descripció

MyLibrary és un catàleg de llibres per consultar i organitzar una biblioteca personal. Carrega els llibres des d'una API local, permet cercar-los amb un formulari reactiu i desar-ne l'historial de cerques.

## Versions utilitzades

- Node.js: v24.21.0
- npm: 11.19.0
- Angular CLI: 22.2.2
- Angular: 22.2.x
- TypeScript: 6.0.x
- json-server: 1.0.0-beta.15
- Git: 2.56.0.windows.2

## Com executar el projecte

```
npm install
npm run api
ng serve
```

`npm run api` arrenca l'API a `http://localhost:4301` (fitxer `tools/api/llibres.json`). `ng serve` arrenca Angular a `http://localhost:4200`. Calen dos terminals.

Altres comandes: `npm test -- --no-watch` i `npm run build`.

## Branca de l'EAC3

`ra3-serveis`: https://github.com/maclementegu/ioc-angular-my-library-magi-clemente/tree/ra3-serveis

## Estat de l'EAC3

- API local amb `json-server` (10 llibres) i URL base centralitzada a `src/app/config/api.config.ts`.
- Models separats (`LlibreApi` i `Llibre`) i adaptador amb normalització.
- `LlibreService` amb GET, POST, estats de càrrega i error, reintent i `switchMap`.
- Formulari de cerca reactiu amb validació síncrona i asíncrona, debounce i historial a `localStorage`.
- Banner d'error amb botó Reintentar.

## Serveis, models i formularis

| Element | Fitxer |
|---|---|
| Servei HTTP | `src/app/services/llibre.service.ts` |
| Servei d'historial | `src/app/services/historial-cerques.service.ts` |
| Model de l'API | `src/app/models/llibre-api.model.ts` |
| Model intern | `src/app/models/llibre.model.ts` |
| Adaptador | `src/app/adaptadors/llibre.adaptador.ts` |
| Validador asíncron | `src/app/validadors/terme-amb-resultats.validator.ts` |
| Formulari de cerca | `src/app/components/barra-filtres/` |

## Documentació tècnica

- `docs/serveis.md`
- `docs/models.md`
- `docs/formularis.md`

## Estat d'EAC anteriors

- EAC1: completat (branca `ra1-setup`).
- EAC2: completat (branca `ra2-components`).