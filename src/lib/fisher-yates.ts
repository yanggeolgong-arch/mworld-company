/**
 * Fisher-Yates (Knuth) Shuffle
 * O(n) in-place shuffle. Used for randomizing Best 10 list on each page load.
 * @param array - Array to shuffle (mutated in place)
 * @returns The same array reference, shuffled
 */
export function fisherYatesShuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Returns a new shuffled copy (does not mutate original)
 */
export function shuffledCopy<T>(array: readonly T[]): T[] {
  const copy = [...array];
  return fisherYatesShuffle(copy);
}
