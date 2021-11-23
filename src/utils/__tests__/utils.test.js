import { charCounter, inTime, msFormatter, range } from "utils/utils";


test('format time (in ms) to seconds and milliseconds', () => {
  expect(msFormatter(3456)).toBe('3s456ms');
  expect(msFormatter(123456)).toBe('123s456ms');
  expect(msFormatter(56.789)).toBe('0s56.789ms');
});

test('4s to not be in time and 2s to be in time', () => {
  expect(inTime(4000)).toBeFalsy
  expect(inTime(2000)).toBeTruthy
});

test('output array from start number tu end number', () => {
  expect(range(5, 2)).toStrictEqual([2, 3, 4, 5]);
  expect(range(2, -2)).toStrictEqual([-2, -1, 0, 1, 2])
});

test('test charCounter to output results', () => {
  expect(charCounter([], [], []).length).toBe(3)
})