export function arrayClone(array: boolean[][]) {
  return JSON.parse(JSON.stringify(array));
}
