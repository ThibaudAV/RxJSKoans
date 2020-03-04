import { of, merge, Subject, range } from 'rxjs';
import { groupBy, reduce, map, scan } from 'rxjs/operators';

describe('Advanced Streams', () => {
  const __: any = 'Fill in the blank';

  test('merging', () => {
    const easy = [];
    const you = of(1, 2, 3);
    const me = of('A', 'B', 'C');
    merge(you, me).subscribe(e => easy.push(e));
    expect(easy.join(' ')).toEqual(__);
  });

  test('merging events', () => {
    const first = [];
    const both = [];

    const s1 = new Subject();
    const s2 = new Subject();

    s1.subscribe(f => first.push(f));
    merge(s1, s2).subscribe(b => both.push(b));

    s1.next('I');
    s1.next('am');
    s2.next('nobody.');
    s2.next('Nobody');
    s2.next('is');
    s1.next('perfect.');

    expect('I am nobody. Nobody is perfect.').toEqual(both.join(' '));
    expect(__).toEqual(first.join(' '));
  });

  test('splitting up', () => {
    const oddsAndEvens = [];
    const numbers = range(1, 9);
    const split = numbers.pipe(groupBy(n => n % __));
    split.subscribe(group => {
      group.subscribe(n => {
        oddsAndEvens[group.key] || (oddsAndEvens[group.key] = '');
        oddsAndEvens[group.key] += n;
      });
    });

    expect('2468').toEqual(oddsAndEvens[0]);
    expect('13579').toEqual(oddsAndEvens[1]);
  });

  test('need to subscribe immediately when splitting', () => {
    const averages = [0, 0];
    const numbers = of(22, 22, 99, 22, 101, 22);
    const split = numbers.pipe(groupBy(n => n % 2));

    split.subscribe(group => {
      group
        .pipe(
          scan<number>((acc, curr) => [...acc, curr], []),
          map(
            arr => arr.reduce((acc, current) => acc + current, 0) / arr.length,
          ),
          map(a => {
            averages[group.key] = a;
          }),
        )
        .subscribe();
    });

    expect(22).toEqual(averages[0]);
    expect(100).toEqual(averages[1]);
  });

  test('multiple subscriptions', () => {
    const numbers = new Subject<number>();
    let sum = 0;
    let average = 0;

    numbers.pipe(reduce((sum, v) => sum + v, 0)).subscribe(n => {
      sum = n;
    });
    numbers.next(1);
    numbers.next(1);
    numbers.next(1);
    numbers.next(1);
    numbers.next(1);

    numbers
      .pipe(
        scan<number>((acc, curr) => [...acc, curr], []),
        map(arr => arr.reduce((acc, current) => acc + current, 0) / arr.length),
      )
      .subscribe(n => {
        average = n;
      });
    numbers.next(2);
    numbers.next(2);
    numbers.next(2);
    numbers.next(2);
    numbers.next(2);

    numbers.complete();

    expect(15).toEqual(sum);
    expect(__).toEqual(average);
  });
});
