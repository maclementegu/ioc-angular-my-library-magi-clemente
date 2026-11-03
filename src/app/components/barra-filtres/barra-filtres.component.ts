import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriaLlibre, FiltresLlibre } from '../../models/llibre.model';

@Component({
  selector: 'app-barra-filtres',
  imports: [FormsModule],
  templateUrl: './barra-filtres.component.html',
  styleUrl: './barra-filtres.component.scss',
})
export class BarraFiltresComponent {
  categories: CategoriaLlibre[] = [
    'Novel·la',
    'Fantasia',
    'Ciència-ficció',
    'Història',
    'Poesia',
    'Ciència',
  ];

  filtres: FiltresLlibre = { text: '', categoria: '' };

  @Output() filtresCanviats = new EventEmitter<FiltresLlibre>();

  onAplicar(): void {
    this.filtresCanviats.emit({ ...this.filtres });
  }

  onRestablir(formulari: NgForm): void {
    formulari.resetForm({ text: '', categoria: '' });
    this.filtres = { text: '', categoria: '' };
    this.filtresCanviats.emit({ ...this.filtres });
  }
}
