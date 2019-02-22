import { Observable, Scheduler, Subject } from 'rxjs/Rx';

describe('Time', () => {
  const __ = 'Fill in the blank';

  test('launching an event via a scheduler', done => {
    let received = '';
    const delay = 200; // Fix this value
    Scheduler.async.schedule(() => {
      received = 'Finished';
    }, delay);

    setTimeout(() => {
      done();
      expect('Finished').toEqual(received);
    }, 100);
  });

  test('launching an event in the future', done => {
    let received = null;
    const time = __;
    const people = new Subject();

    people.delay(time).subscribe(x => {
      received = x;
    });
    people.next('Godot');

    setTimeout(() => {
      expect('Godot').toEqual(received);
      done();
    }, 100);
  });

  test('a watched pot', done => {
    let received = '';
    const delay = 200;
    const timeout = __;
    const timeoutEvent = Observable.of('Tepid');

    Observable.of('Boiling')
      .delay(delay)
      .timeoutWith(timeout, timeoutEvent)
      .subscribe(x => {
        received = x;
      });

    setTimeout(() => {
      expect(received).toEqual('Boiling');
      done();
    }, 200);
  });

  test('you can place a time limit on how long an event should take', done => {
    const received = [];
    const timeout = 200;
    const timeoutEvent = Observable.of('Tepid');
    const temperatures = new Subject();

    temperatures
      .timeoutWith(timeout, timeoutEvent)
      .subscribe(t => received.push(T));

    temperatures.next('Started');

    setTimeout(() => {
      temperatures.next('Boiling');
    }, 300);

    setTimeout(() => {
      expect(__).toEqual(received.join(', '));
      done();
    }, 400);
  });

  test('debouncing', done => {
    const received = [];
    const events = new Subject();
    events.debounceTime(100).subscribe(n => received.push(n));

    events.next('f');
    events.next('fr');
    events.next('fro');
    events.next('from');

    setTimeout(() => {
      events.next('r');
      events.next('rx');
      events.next('rxj');
      events.next('rxjs');

      setTimeout(() => {
        expect(__).toEqual(received.join(' '));
        done();
      }, 200);
    }, 200);
  });

  test('buffering', done => {
    const received = [];
    const events = new Subject();
    events
      .bufferTime(100)
      .map(c => c.join(''))
      .subscribe(c => received.push(c));

    events.next('R');
    events.next('x');
    events.next('J');
    events.next('S');

    setTimeout(() => {
      events.next('R');
      events.next('o');
      events.next('c');
      events.next('k');
      events.next('s');

      setTimeout(() => {
        expect(__).toEqual(received.join(' '));
        done();
      }, 200);
    }, 200);
  });

  test('time between calls', done => {
    const received = [];
    const events = new Subject();

    events
      .timeInterval()
      .filter(t => t.interval > 100)
      .subscribe(t => {
        received.push(t.value);
      });

    events.next('too');
    events.next('fast');

    setTimeout(() => {
      events.next('slow');

      setTimeout(() => {
        events.next('down');

        expect(__).toEqual(received.join(' '));
        done();
      }, 120);
    }, 120);
  });

  test('results can be ambiguous timing', done => {
    let results = 0;
    const first = Observable.timer(10).mapTo(-1);
    const secnd = Observable.timer(20).mapTo(1);

    first.race(secnd).subscribe(x => {
      results = x;
    });

    setTimeout(() => {
      expect(results).toEqual(__);
      done();
    }, 300);
  });
});
