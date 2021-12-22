export function shuffle(inputArray: any[]): any[] {
  for (let i: number = inputArray.length - 1; i >= 0; i--) {
    const randomIndex: number = Math.floor(Math.random() * (i + 1))
    const itemAtIndex: number = inputArray[randomIndex]

    inputArray[randomIndex] = inputArray[i]
    inputArray[i] = itemAtIndex
  }
  return inputArray
}
