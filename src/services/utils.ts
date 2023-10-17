export function getRandomIds(
  lowerBound: number,
  upperBound: number,
  arrLength: number
) {
  let randomIds: number[] = [];
  for (let i = 1; i <= arrLength; i++) {
    randomIds.push(
      Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound)
    );
  }
  return randomIds;
}
