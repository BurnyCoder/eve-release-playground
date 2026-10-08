#!/usr/bin/env node
// Usage: sum <number>...  — prints the sum of its numeric arguments.
import { add } from "../src/math.js";

const args = process.argv.slice(2);
let total = 0;

for (const arg of args) {
  const n = arg.trim() === "" ? NaN : Number(arg);
  if (!Number.isFinite(n)) {
    console.error(`sum: not a number: ${JSON.stringify(arg)}`);
    process.exit(1);
  }
  total = add(total, n);
}

console.log(total);
