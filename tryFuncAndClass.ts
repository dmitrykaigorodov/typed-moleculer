
// const max = (a: number, b: number) => (a > b ? a : b)

const abc = ({ a }: { a: number }) => {
  return a ** 2
}

interface Named {
  name: string;
}

interface fnInterface {
  (x: { a: number }): number
}

interface NamedFunction extends Named, fnInterface {
}

const createNamedFunction = (name: string, fn: ((x: { a: number }) => number)): NamedFunction => {
  const that = abc as NamedFunction
  that.name = name
  Object.freeze(that)
  return Object.freeze(that)
}