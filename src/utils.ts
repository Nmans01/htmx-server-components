function pipe<A>(value: A): A;
function pipe<A, B>(value: A, fn1: (input: A) => B): B;
function pipe<A, B, C>(value: A, fn1: (input: A) => B, fn2: (input: B) => C): C;
function pipe<A, B, C, D>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D
): D;
function pipe<A, B, C, D, E>(
    value: A,
    fn1: (input: A) => B,
    fn2: (input: B) => C,
    fn3: (input: C) => D,
    fn4: (input: D) => E
): E;
// ... and so on

/**
 * Pipe function that takes a value and a list of functions and applies them in order.
 * @param value 
 * @param fns 
 */
function pipe(value: any, ...fns: Function[]): unknown {
    return fns.reduce((acc, fn) => fn(acc), value);
}

export { pipe as p };