import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraFiltresComponent } from './components/barra-filtres/barra-filtres.component';
import { LlistaLlibresComponent } from './components/llista-llibres/llista-llibres.component';
import { FiltresLlibre, Llibre } from './models/llibre.model';
import { LlibreService } from './services/llibre.service';

@Component({
  imports: [RouterOutlet, LlistaLlibresComponent, BarraFiltresComponent, DatePipe],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App implements OnInit {
  protected readonly llibreService = inject(LlibreService);
  public nomAplicacio = 'MyLibrary';
  public llibreSeleccionat: Llibre | null = null;
  public missatgeCreacio = signal('');

  ngOnInit(): void {
    this.llibreService.cerca({ text: '', categoria: '' });
  }

  onFiltresCanviats(filtres: FiltresLlibre): void {
    this.llibreService.cerca(filtres);
  }

  onReintentar(): void {
    this.llibreService.reintentar();
  }

  onAfegirDeProva(): void {
    this.llibreService
      .crearLlibre({
        titol: 'Llibre de prova',
        autor: 'Autor de prova',
        descripcio: 'Creat amb POST des de MyLibrary.',
        categoria: 'Novel·la',
        valoracio: 3,
        destacat: false,
      })
      .subscribe({
        next: (llibre) => {
          this.llibreSeleccionat = llibre;
          this.missatgeCreacio.set(`Llibre "${llibre.titol}" creat amb POST (id ${llibre.id}).`);
        },
        error: () => this.missatgeCreacio.set("No s'ha pogut crear el llibre. Torna-ho a provar."),
      });
  }

  onTancarDetall(): void {
    this.llibreSeleccionat = null;
  }

  onSelecciona(llibre: Llibre): void {
    this.llibreSeleccionat = llibre;
  }
}