import {take, fork, join, ActionPattern} from 'redux-saga/effects';

function takeLeading(
  patternOrChannel: ActionPattern,
  saga: any,
  ...args: any[]
) {
  return fork(function*() {
    while (true) {
      const action = yield take(patternOrChannel);
      const task = yield fork(saga, ...args.concat(action));
      yield join(task);
    }
  });
}
export {takeLeading};
