import { Observable } from 'rxjs/Rx';

describe('Mapping', () => {
  const __ = 'Fill in the blank';

  test('flatMap can be a cartesian product', () => {
    const results = [];
    Observable.range(1, 3)
      .flatMap((x, i) => Observable.range(__, __))
      .subscribe(x => results.push(x));

    expect('234').toEqual(results.join(''));
  });

  test('switchMap only gets us the latest value', () => {
    const results = [];
    Observable.range(1, 3)
      .switchMap(x => Observable.range(x, __))
      .subscribe(x => results.push(x));

    expect('12345').toEqual(results.join(''));
  });
});
