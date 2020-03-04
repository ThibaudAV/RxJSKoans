import { range } from 'rxjs';
import { flatMap, switchMap } from 'rxjs/operators';

describe('Mapping', () => {
  const __ = 'Fill in the blank';

  test('flatMap can be a cartesian product', () => {
    const results = [];
    range(1, 3)
      .pipe(flatMap((x, i) => range(__, __)))
      .subscribe(x => results.push(x));

    expect('234').toEqual(results.join(''));
  });

  test('switchMap only gets us the latest value', () => {
    const results = [];
    range(1, 3)
      .pipe(switchMap(x => range(x, __)))
      .subscribe(x => results.push(x));

    expect('12345').toEqual(results.join(''));
  });
});
