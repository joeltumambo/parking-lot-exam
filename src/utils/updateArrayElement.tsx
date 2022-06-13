const updateArrayElement = (
  index: number,
  element: any,
  array: any[]
): any[] => [...array.slice(0, index), element, ...array.slice(index + 1)];

export default updateArrayElement;
