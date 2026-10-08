import { test } from "node:test";
import assert from "node:assert/strict";
import { add, multiply, clamp } from "../src/math.js";

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

test("clamp returns value when within range", () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test("clamp is inclusive at the bounds", () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test("clamp limits values below min and above max", () => {
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
});

test("clamp handles negative and fractional ranges", () => {
  assert.equal(clamp(-7, -5, -1), -5);
  assert.equal(clamp(0.75, 0, 0.5), 0.5);
});

test("clamp works when min equals max", () => {
  assert.equal(clamp(3, 2, 2), 2);
});

test("clamp throws RangeError when min > max", () => {
  assert.throws(() => clamp(1, 10, 0), RangeError);
});
