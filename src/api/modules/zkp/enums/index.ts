export enum Operators {
  NOOP = 0,
  EQ = 1,
  LT = 2,
  GT = 3,
  IN = 4,
  NIN = 5,
  NE = 6,
}

export enum QueryOperators {
  $noop = Operators.NOOP,
  $eq = Operators.EQ,
  $lt = Operators.LT,
  $gt = Operators.GT,
  $in = Operators.IN,
  $nin = Operators.NIN,
  $ne = Operators.NE,
}
