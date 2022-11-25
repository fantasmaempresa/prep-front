import { map, scan, startWith, Subject, switchMap, timer } from 'rxjs';
import { format } from 'date-fns';

export const SECOND = 1_000;

export class RefreshCountdown {
  private click$ = new Subject<number>();
  refresh$ = this.click$.asObservable().pipe(
    startWith(0),
    switchMap(() => timer(0, this.refresh_time))
  );
  clock$ = this.refresh$.pipe(
    switchMap(() =>
      timer(0, SECOND).pipe(
        scan((accumulator) => accumulator - SECOND, this.refresh_time)
      )
    ),
    map((time) => format(time, 'mm:ss'))
  );

  constructor(private refresh_time: number) {}

  resetCountDown() {
    this.click$.next(0);
  }
}
