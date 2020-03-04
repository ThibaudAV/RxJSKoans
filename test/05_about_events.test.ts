import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

describe('Events', () => {
  const __ = 'Fill in the blank';

  test('the main event', () => {
    const received = [];
    const e = new EventEmitter();
    const subscription = fromEvent(e, 'change').subscribe(c =>
      received.push(c),
    );

    e.emit('change', 'R');
    e.emit('change', 'x');
    e.emit('change', 'J');
    e.emit('change', 'S');

    subscription.unsubscribe();

    e.emit('change', '!');

    expect(__).toEqual(received.join(''));
  });
});
