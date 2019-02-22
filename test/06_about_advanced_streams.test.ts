import { Observable, Subject } from 'rxjs/Rx';

describe('Advanced Streams', () => {
  const __ = 'Fill in the blank';

  test('merging', () => {
    const easy = [];
    const you = Observable.of(1, 2, 3);
    const me = Observable.of('A', 'B', 'C');
    you.merge(me).subscribe(::easy.push);
    expect(easy.join(' ')).toEqual(__);
  });

  test('merging events', () => {
    const first = [];
    const both = [];

    const s1 = new Subject();
    const s2 = new Subject();

    s1.subscribe(f => first.push(f));
    s1.merge(s2).subscribe(b => both.push(b));

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
    const numbers = Observable.range(1, 9);
    const split = numbers.groupBy(n => n % __);
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
    const numbers = Observable.of(22, 22, 99, 22, 101, 22);
    const split = numbers.groupBy(n => n % 2);

    split.subscribe(group => {
      group
        .reduce(({ sum, count }, v) => ({ sum: sum + v, count: count + 1 }), {
          sum: 0,
          count: 0,
        })
        .map(({ sum, count }) => sum / count)
        // XXX .average() not yet implemented
        .__(a => {
          averages[group.key] = a;
        });
    });

    expect(22).toEqual(averages[0]);
    expect(100).toEqual(averages[1]);
  });

  test('multiple subscriptions', () => {
    const numbers = new Subject();
    let sum = 0;
    let average = 0;

    numbers
      .reduce((sum, v) => sum + v, 0) // XXX .sum() not yet implemented
      .subscribe(n => {
        sum = n;
      });
    numbers.next(1);
    numbers.next(1);
    numbers.next(1);
    numbers.next(1);
    numbers.next(1);

    numbers
      .reduce(({ sum, count }, v) => ({ sum: sum + v, count: count + 1 }), {
        sum: 0,
        count: 0,
      })
      .map(({ sum, count }) => sum / count)
      // XXX .average() not yet implemented
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
