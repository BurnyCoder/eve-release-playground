import { test } from "node:test";
import assert from "node:assert/strict";
import { add, multiply } from "../src/math.js";

test("add sums two numbers", () => {
  assert.equal(add(2, 3), 5);
});

test("multiply multiplies two numbers", () => {
  assert.equal(multiply(2, 3), 6);
});

test("multiply handles negative numbers", () => {
  assert.equal(multiply(-4, 3), -12);
  assert.equal(multiply(-4, -3), 12);
});

test("multiply by zero gives zero", () => {
  assert.equal(multiply(0, 5), 0);
  assert.equal(multiply(5, 0), 0);
});

test("multiply handles fractions", () => {
  assert.equal(multiply(0.5, 8), 4);
});
