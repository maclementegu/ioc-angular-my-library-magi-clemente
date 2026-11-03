import { BarraFiltresComponent } from './components/barra-filtres/barra-filtres.component';
import { FiltresLlibre, Llibre } from './models/llibre.model';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LlistaLlibresComponent } from './components/llista-llibres/llista-llibres.component';
import { LLIBRES_MOCK } from './mocks/dades-mocks';

@Component({
  imports: [RouterOutlet, LlistaLlibresComponent, BarraFiltresComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public nomAplicacio = 'MyLibrary';
  protected readonly title = signal('ioc-angular-my-library-magi-clemente');

  public llibres: Llibre[] = LLIBRES_MOCK;
  public llibreSeleccionat: Llibre | null = null;
    public filtres: FiltresLlibre = { text: '', categoria: '' };

  get llibresFiltrats(): Llibre[] {
    const text = this.filtres.text.trim().toLowerCase();
    return this.llibres.filter((llibre) => {
      const coincideixText =
        !text ||
        llibre.titol.toLowerCase().includes(text) ||
        llibre.autor.toLowerCase().includes(text);
      const coincideixCategoria =
        !this.filtres.categoria || llibre.categoria === this.filtres.categoria;
      return coincideixText && coincideixCategoria;
    });
  }

  onFiltresCanviats(filtres: FiltresLlibre): void {
    this.filtres = filtres;
  }

  onSelecciona(llibre: Llibre): void {
    this.llibreSeleccionat = llibre;
  }
}
