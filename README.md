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
