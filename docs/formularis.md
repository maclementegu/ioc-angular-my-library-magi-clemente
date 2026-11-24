# Formularis

## Formulari de cerca: BarraFiltresComponent

Fitxer: `src/app/components/barra-filtres/barra-filtres.component.ts`. Usa `ReactiveFormsModule`, `FormBuilder` i `formControlName`.

| Control | Validadors | Missatge |
|---|---|---|
| `text` | `Validators.minLength(3)` (síncron) | "El text ha de tenir mínim 3 caràcters." |
| `text` | `termeAmbResultatsValidator` (asíncron) | "Cap llibre coincideix amb aquest terme." |
| `categoria` | Cap | Selector amb "Totes" i les sis categories |

### Validador asíncron

Fitxer: `src/app/validadors/terme-amb-resultats.validator.ts`.

Espera 400 ms amb `timer(400)` (debounce) i després crida `comptarResultats` amb `switchMap`. Si no hi ha cap resultat retorna `{ senseResultats: true }`. Si l'API falla, retorna `null` perquè el formulari no es bloquegi. Mentre es valida, el control té `pending` i es mostra "Comprovant resultats...".

### Missatges d'error

Només es mostren si el control és invàlid i `dirty` o `touched`, amb `role="alert"`.

### Botons

- **Cercar**: desactivat si el formulari és invàlid o pendent. Desa el terme a l'historial i emet els filtres cap a `App`.
- **Netejar cerca**: reinicia el formulari i emet uns filtres buits.

## Historial de cerques

Es mostra a "Cerques recents". Clicar un terme el recupera al camp i torna a llançar la cerca. Vegeu `docs/serveis.md` per a la persistència a `localStorage`.