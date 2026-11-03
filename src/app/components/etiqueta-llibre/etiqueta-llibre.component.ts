import { Component, Input } from '@angular/core';
import { CategoriaLlibre } from '../../models/llibre.model';

@Component({
  selector: 'app-etiqueta-llibre',
  imports: [],
  templateUrl: './etiqueta-llibre.component.html',
  styleUrl: './etiqueta-llibre.component.scss',
})
export class EtiquetaLlibreComponent {
  @Input({ required: true }) categoria!: CategoriaLlibre;
  @Input() destacat = false;
}
