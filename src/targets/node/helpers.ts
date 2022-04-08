export const removeQuotes =
  (patterns: string[], matchCharacter = `'`) =>
  (input: string) =>
    patterns.reduce((accumulator, pattern) => {
      const regex = new RegExp(`${matchCharacter}${pattern}${matchCharacter}`, 'g');

      return accumulator.replace(regex, '');
    }, input);
