import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaLlibre, FiltresLlibre } from '../../models/llibre.model';
import { HistorialCerquesService } from '../../services/historial-cerques.service';
import { LlibreService } from '../../services/llibre.service';
import { termeAmbResultatsValidator } from '../../validadors/terme-amb-resultats.validator';

@Component({
  selector: 'app-barra-filtres',
  imports: [ReactiveFormsModule],
  templateUrl: './barra-filtres.component.html',
  styleUrl: './barra-filtres.component.scss',
})
export class BarraFiltresComponent {
  private readonly fb = inject(FormBuilder);
  private readonly llibreService = inject(LlibreService);
  protected readonly historialService = inject(HistorialCerquesService);

  categories: CategoriaLlibre[] = [
    'Novel·la',
    'Fantasia',
    'Ciència-ficció',
    'Història',
    'Poesia',
    'Ciència',
  ];

  readonly formulari = this.fb.nonNullable.group({
    text: this.fb.nonNullable.control('', {
      validators: [Validators.minLength(3)],
      asyncValidators: [termeAmbResultatsValidator(this.llibreService)],
    }),
    categoria: this.fb.nonNullable.control<CategoriaLlibre | ''>(''),
  });

  @Output() filtresCanviats = new EventEmitter<FiltresLlibre>();

  get textControl() {
    return this.formulari.controls.text;
  }

  onAplicar(): void {
    if (this.formulari.invalid || this.formulari.pending) {
      this.formulari.markAllAsTouched();
      return;
    }
    const { text, categoria } = this.formulari.getRawValue();
    this.historialService.afegir(text);
    this.filtresCanviats.emit({ text, categoria });
  }

  onNetejar(): void {
    this.formulari.reset({ text: '', categoria: '' });
    this.filtresCanviats.emit({ text: '', categoria: '' });
  }

  onRecuperar(terme: string): void {
    this.textControl.setValue(terme);
    this.filtresCanviats.emit({ text: terme, categoria: this.formulari.controls.categoria.value });
  }
}