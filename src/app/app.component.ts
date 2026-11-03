import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LlistaLlibresComponent } from './components/llista-llibres/llista-llibres.component';
import { LLIBRES_MOCK } from './mocks/dades-mocks';
import { Llibre } from './models/llibre.model';

@Component({
  imports: [RouterOutlet, LlistaLlibresComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public nomAplicacio = 'MyLibrary';
  protected readonly title = signal('ioc-angular-my-library-magi-clemente');

  public llibres: Llibre[] = LLIBRES_MOCK;
  public llibreSeleccionat: Llibre | null = null;

  onSelecciona(llibre: Llibre): void {
    this.llibreSeleccionat = llibre;
  }
}
