# eve-release-playground

Tiny Node.js project used to test the [vercel-eve](https://github.com/BurnyCoder/vercel-eve) feature-release agent. Each feature the agent ships becomes its own GitHub release.

```bash
npm test
```

## CLI: sum

Prints the sum of its numeric arguments (non-numeric input exits with code 1).

```bash
node bin/sum.js 1 2 3      # 6
node bin/sum.js -4 10.5    # 6.5
```

## Helper: fetchJson

`fetchJson(url, timeoutMs = 5000)` in `src/http.js` GETs a URL with Node's built-in `fetch`, aborts via `AbortSignal.timeout(timeoutMs)` (rejects with a `TimeoutError`), throws an `Error` with a `status` property on non-2xx responses, and otherwise resolves with the parsed JSON body.

```js
import { fetchJson } from "./src/http.js";
const data = await fetchJson("https://example.com/api", 3000);
```

## Helper: clamp

`clamp(value, min, max)` in `src/math.js` restricts `value` to the inclusive range `[min, max]` and throws a `RangeError` if `min > max`.

```js
import { clamp } from "./src/math.js";
clamp(15, 0, 10); // 10
clamp(-5, 0, 10); // 0
clamp(5, 0, 10);  // 5
```
