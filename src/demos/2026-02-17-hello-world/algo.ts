//Pure Function
export function createHelloWorld() {
  const greeting = "Hello World";
  return function (...args:unknown[]):string {
    return greeting;
  };
}
