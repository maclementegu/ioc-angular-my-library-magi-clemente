# Nom de l'aplicació
MyLibrary
## Autor/a
Magí Clemente 
## Descripció
MyLibrary és un catàleg de llibres per consultar i organitzar una biblioteca personal. S'anirà ampliant durant el semestre
## Versions utilitzades
- Node.js: v24.21.0
- npm: 11.19.0
- Angular CLI: 22.2.2
- Angular: 22.2.2
- Git: 2.56.0.windows.2
- typescript 6.0.3
## Com crear i executar el projecte
Per crear el projecte: ng new ioc-angular-my-library-magi-clemente --routing --style=scss --ssr=false --standalone --file-name-style-guide=2016 --skip-git --package-manager=npm
Per executar el projecte: npm install
ng serve
## Estat de l'EAC1
EAC compleatat amb els cinc exercicis.
## Estat de l'EAC2

Completat: model de dades i dades mock, components amb `@Input` i `@Output`, formulari de filtres amb `FormsModule`, validacions, control de flux amb `@for` i `@if`/`@else`, comptador, estat sense resultats, panell de detall, pipe `date`, accessibilitat i disseny responsive. Els canvis són a la branca `ra2-components`.

## Components creats

| Component
| `EtiquetaLlibreComponent` Mostra la categoria del llibre com a distintiu 
| `TargetaLlibreComponent`  Mostra un llibre i avisa el component pare quan se selecciona 
| `LlistaLlibresComponent`  Mostra les targetes amb `@for` i reenvia la selecció 
| `BarraFiltresComponent`   Formulari de filtres amb `FormsModule`, `required` i `minlength` 
| `App` Guarda l'estat: filtres, llibre seleccionat i panell de detall

## Enllaç del repositori

- Repositori: https://github.com/maclementegu/ioc-angular-my-library-magi-clemente
- Branca ra1-setup: https://github.com/maclementegu/ioc-angular-my-library-magi-clemente/tree/ra1-setup
- Branca ra2-components: https://github.com/maclementegu/ioc-angular-my-library-magi-clemente/tree/ra2-components