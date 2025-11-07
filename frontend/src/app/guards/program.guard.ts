import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProgramStateService } from '../services/program-state.service';
import { ProgramService } from '../services/program.service';
import { UserService } from '../services/user.service';

export const programGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const programStateService = inject(ProgramStateService);
  const programService = inject(ProgramService);
  const userService = inject(UserService);

  const programId = route.paramMap.get('programId');
  if (!programId) {
    router.navigate(['/programs']);
    return false;
  }

  const currentUser = userService.getCurrentUser();

  return programService.getProgram(currentUser, programId).pipe(
    map(program => {
      programStateService.enterProgram(program.id);
      return true;
    }),
    catchError(error => {
      console.error('Program not found:', programId, error);
      router.navigate(['/programs']);
      return of(false);
    })
  );
};
