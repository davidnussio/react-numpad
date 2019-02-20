import { padding, validate } from '../date';

test('padding', () => {
  expect(padding('02102012', 'DD.MM.YYYY')).toBe('02102012');
  expect(padding('021020', 'DD.MM.YYYY')).toBe('02102020');
  expect(padding('0210201201', 'DD.MM.YYYY HH:mm')).toBe('021020120102');
  expect(padding('', 'DD.MM.YYYY HH:mm:ss')).toBe('01032020010203');
  expect(padding('1', 'DD.MM.YYYY HH:mm:ss')).toBe('11032020010203');
  expect(padding('0930', 'hh:mm A')).toBe('0930AM');
});

test('validate', () => {
  expect(validate(padding('2902', 'DD.MM.YYYY'), 'DD.MM.YYYY', 3)).toBe(true);
  expect(validate(padding('311', 'DD.MM.YYYY'), 'DD.MM.YYYY', 2)).toBe(true);
  expect(validate(padding('3101', 'DD.MM.YYYY'), 'DD.MM.YYYY', 3)).toBe(true);
  expect(validate(padding('311', 'DD.MM.YYYY'), 'DD.MM.YYYY', 2)).toBe(true);
  expect(validate(padding('290', 'DD.MM.YYYY'), 'DD.MM.YYYY', 2)).toBe(true);
});

test('validate time', () => {
  expect(validate('3', 'HH:mm')).toBe(false);
});
