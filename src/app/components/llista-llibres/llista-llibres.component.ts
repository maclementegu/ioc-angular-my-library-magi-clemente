import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Llibre } from '../../models/llibre.model';
import { TargetaLlibreComponent } from '../targeta-llibre/targeta-llibre.component';

@Component({
  selector: 'app-llista-llibres',
  imports: [TargetaLlibreComponent],
  templateUrl: './llista-llibres.component.html',
  styleUrl: './llista-llibres.component.scss',
})
export class LlistaLlibresComponent {
  @Input({ required: true }) llibres!: Llibre[];
  @Input() llibreSeleccionatId: number | null = null;
  @Output() selecciona = new EventEmitter<Llibre>();

  onSelecciona(llibre: Llibre): void {
    this.selecciona.emit(llibre);
  }
}