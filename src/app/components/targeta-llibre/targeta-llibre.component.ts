import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Llibre } from '../../models/llibre.model';
import { EtiquetaLlibreComponent } from '../etiqueta-llibre/etiqueta-llibre.component';

@Component({
  selector: 'app-targeta-llibre',
  imports: [EtiquetaLlibreComponent],
  templateUrl: './targeta-llibre.component.html',
  styleUrl: './targeta-llibre.component.scss',
})
export class TargetaLlibreComponent {
  @Input({ required: true }) llibre!: Llibre;
  @Input() seleccionada = false;
  @Output() selecciona = new EventEmitter<Llibre>();

  onSeleccionar(): void {
    this.selecciona.emit(this.llibre);
  }
}
