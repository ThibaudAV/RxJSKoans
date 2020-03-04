import { EventEmitter } from 'events';
import { range, Observable, fromEvent } from 'rxjs';
import { toArray, filter, map, bufferCount } from 'rxjs/operators';

describe('Querying', () => {
  const __: any = 'Fill in the blank';

  test('Basic querying', () => {
    const strings = [];
    const numbers = range(1, 100);

    numbers
      .pipe(
        filter(x => x % __ === 0),
        map(x => x.toString()),
        toArray(),
      )
      .subscribe(x => strings.push(x));

    expect('11,22,33,44,55,66,77,88,99').toEqual(strings.toString());
  });

  test('querying over events', () => {
    let results = 0;
    const e = new EventEmitter();

    fromEvent<{ x: number; y: number }>(e, 'click')
      .pipe(
        filter(click => click.x === click.y),
        map(click => __ + __),
      )
      .subscribe(x => {
        results = x;
      });

    e.emit('click', { x: 100, y: 50 });
    e.emit('click', { x: 75, y: 75 });
    e.emit('click', { x: 40, y: 80 });

    expect(results).toEqual(150);
  });

  test('buffering with count and skip', () => {
    const results = [];
    range(1, 10)
      .pipe(bufferCount(__, __))
      .subscribe(x => results.push(x));

    expect('12345').toEqual(results[0].join(''));
    expect('678910').toEqual(results[1].join(''));
  });
});
