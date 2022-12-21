import { put } from 'redux-saga/effects';

export function* handleSagaError(
  error: unknown,
  errorAction: (payload: string) => {
    payload: string;
    type: string;
  },
) {
  if (error instanceof Error) {
    yield put(errorAction(error.toString()));
  } else {
    yield put(errorAction('An unknown error occured.'));
  }
}
