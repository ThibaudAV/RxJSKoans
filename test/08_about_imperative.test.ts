import { range, of, iif } from 'rxjs';
import { flatMap } from 'rxjs/operators';

describe('Imperative', () => {
  const __ = 'Fill in the blank';

  test('can make a decision with an if with no else', () => {
    const results = [];
    range(1, 10)
      .pipe(flatMap(x => iif(() => x % 2 === 0, of(x))))
      .subscribe(x => results.push(x));

    expect(__).toEqual(results.join(''));
  });

  test('can make a decision with an if with an else', () => {
    const results = [];
    range(1, 5)
      .pipe(flatMap((x, i) => iif(() => x % 2 === 0, of(x), range(x, i))))
      .subscribe(x => results.push(x));

    expect(__).toEqual(results.join(''));
  });
});

// XXX `case` not yet implemented
// test('we can make test cases', () => {
//   let result = ''

//   const cases = {
//     'matt': Observable.of(1),
//     'erik': Observable.of(2),
//     'bart': Observable.of(3),
//     'wes': Observable.of(4)
//   }

//   Observable.of(__)
//     .flatMap(x => Observable.case(
//       () => x,
//       cases
//     ))
//     .subscribe(x => { result = x })

//   equal(4, result)
// })

// XXX `case` not yet implemented
// test('we can also have a default case', () => {
//   let result = ''

//   const cases = {
//     'matt': Observable.of(1),
//     'erik': Observable.of(2),
//     'bart': Observable.of(3),
//     'wes': Observable.of(4)
//   }

//   Observable.of('RxJS')
//     .flatMap(x => Observable.case(
//       () => x,
//       cases,
//       Observable.of(__)
//     ))
//     .subscribe(x => { result = x })

//   equal(5, result)
// })

// XXX `while` not yet implemented
// test('while does something until proven false', () => {
//   let i = 0
//   const result = []

//   Observable
//     .while(
//       () => ++i < 3,
//       Observable.of(__)
//     )
//     .subscribe(::result.push)

//   equal('4242', result.join(''))
// })
