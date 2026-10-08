// HTTP helpers built on Node's global fetch.

/**
 * GET `url` and parse the response body as JSON.
 * Rejects with a TimeoutError if no response arrives within `timeoutMs`,
 * and with an Error (carrying `status`) on any non-2xx response.
 */
export async function fetchJson(url, timeoutMs = 5000) {
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}
