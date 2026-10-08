// Basic arithmetic helpers.
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Restricts value to the inclusive range [min, max]. Throws if min > max.
export function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError(`clamp: min (${min}) must not be greater than max (${max})`);
  }
  return Math.min(Math.max(value, min), max);
}
