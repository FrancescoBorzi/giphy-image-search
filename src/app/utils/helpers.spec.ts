import { nonEmptyPredicate } from './helpers';

describe('Helpers', () => {
  describe('nonEmptyPredicate', () => {
    for (const { input, result } of [
      { input: null, result: false },
      { input: undefined, result: false },
      { input: '', result: false },
      { input: ' ', result: false },
      { input: 'some string', result: true },
    ]) {
      it(`it should return ${result} when the input is ${input}`, () => {
        expect(nonEmptyPredicate(input)).toEqual(result);
      });
    }
  });
});
