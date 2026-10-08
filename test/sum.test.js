import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../bin/sum.js", import.meta.url));
const run = (...args) =>
  spawnSync(process.execPath, [script, ...args], { encoding: "utf8" });

test("sums integer arguments", () => {
  const r = run("1", "2", "3");
  assert.equal(r.status, 0);
  assert.equal(r.stdout, "6\n");
});

test("handles negatives and decimals", () => {
  assert.equal(run("-4", "10").stdout, "6\n");
  assert.equal(run("0.5", "0.25").stdout, "0.75\n");
});

test("single argument returns itself", () => {
  assert.equal(run("42").stdout, "42\n");
});

test("no arguments prints 0", () => {
  const r = run();
  assert.equal(r.status, 0);
  assert.equal(r.stdout, "0\n");
});

test("non-numeric argument fails with exit code 1", () => {
  const r = run("1", "abc");
  assert.equal(r.status, 1);
  assert.equal(r.stdout, "");
  assert.match(r.stderr, /not a number: "abc"/);
});

test("empty and non-finite arguments are rejected", () => {
  assert.equal(run("").status, 1);
  assert.equal(run("Infinity").status, 1);
});
