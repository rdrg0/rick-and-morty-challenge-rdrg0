import { charCounter, exportedForTesting, inTime, msFormatter, range } from "utils/utils";
const { countCharsInName, getLocations } = exportedForTesting


test('time (in ms) to be formatted as seconds and milliseconds', () => {
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

test('charCounter to output results', () => {
  expect(charCounter([], [], []).length).toBe(3)
});

test('countCharsInName to count chars in objects name property', () => {
  const characters = [{ name: "Rick Sanchez" }, { name: "Morty Smith" }, { name: "Summer Smith" }]
  expect(countCharsInName('c', characters)).toBe(2)
  expect(countCharsInName('s', characters)).toBe(4)
});
test("getLocation to get location(origin) from episode's characters url", () => {
  const charactersUrl = ['rickUrl', 'mortyUrl']
  const characters = [
    { url: "rickUrl", origin: { name: "Earth-C137" } },
    { url: "mortyUrl", origin: { name: "Earth-C137" } },
    { url: "other", origin: { name: "not earth" } }
  ];
  expect(getLocations(charactersUrl, characters)).toStrictEqual(["Earth-C137"])
});