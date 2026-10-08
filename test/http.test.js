import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { fetchJson } from "../src/http.js";

let server;
let base;

before(async () => {
  server = createServer((req, res) => {
    if (req.url === "/ok") {
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ hello: "world", n: 1 }));
    } else if (req.url === "/created") {
      res.statusCode = 201;
      res.end(JSON.stringify({ created: true }));
    } else if (req.url === "/missing") {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "nope" }));
    } else if (req.url === "/boom") {
      res.statusCode = 500;
      res.end("oops");
    } else if (req.url === "/badjson") {
      res.end("not json");
    } else if (req.url === "/slow") {
      // never responds in time; the client's timeout should fire
      setTimeout(() => res.end("{}"), 2000).unref();
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
});

test("fetchJson parses a 200 JSON response", async () => {
  assert.deepEqual(await fetchJson(`${base}/ok`, 1000), { hello: "world", n: 1 });
});

test("fetchJson accepts other 2xx statuses", async () => {
  assert.deepEqual(await fetchJson(`${base}/created`, 1000), { created: true });
});

test("fetchJson throws with status on 404", async () => {
  await assert.rejects(fetchJson(`${base}/missing`, 1000), (err) => {
    assert.equal(err.status, 404);
    assert.match(err.message, /404/);
    return true;
  });
});

test("fetchJson throws with status on 500", async () => {
  await assert.rejects(fetchJson(`${base}/boom`, 1000), { status: 500 });
});

test("fetchJson rejects on invalid JSON", async () => {
  await assert.rejects(fetchJson(`${base}/badjson`, 1000), SyntaxError);
});

test("fetchJson times out on a slow server", async () => {
  await assert.rejects(fetchJson(`${base}/slow`, 100), { name: "TimeoutError" });
});
