export function getRandomIds(lowerBound: number, upperBound: number, length: number): number[] {
  const randomIds: number[] = []
  for (let i = 1; i <= length; i++) {
    randomIds.push(Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound))
  }
  return randomIds
}

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) throw Error("El valor 'val' no esta definido, recibimos" + val)
}
