import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { LlibreService } from '../services/llibre.service';

export function termeAmbResultatsValidator(servei: LlibreService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const terme = String(control.value ?? '').trim();
    if (terme.length < 3) {
      return of(null);
    }
    return timer(400).pipe(
      switchMap(() => servei.comptarResultats(terme)),
      map((total) => (total > 0 ? null : { senseResultats: true })),
      catchError(() => of(null)),
    );
  };
}