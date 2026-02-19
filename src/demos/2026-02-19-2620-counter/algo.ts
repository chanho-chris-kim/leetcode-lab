//Pure Function
export function createCounter(n: number): () => number {
  return function (): number {
    return n++;
  };
}
