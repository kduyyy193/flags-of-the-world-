export const getRandomIndex = (max: number) => Math.floor(Math.random() * max);
export const getRandomElements = (arr: any[], n: number) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
};
