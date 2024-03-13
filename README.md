# Nuxt server files

## Using server assets

You can use [server assets](https://nitro.unjs.io/guide/assets#server-assets) to include files into the production bundle.

Any file inside `server/assets/` is by default included. You can access server assets using [storage](https://nitro.unjs.io/guide/storage) api.

> [!TIP]
> Using this method is recommanded to access server assets.

**Example:**

<!-- automd:file code src="./server/api/storage.ts" -->

```ts [storage.ts]
export default defineEventHandler(async () => {
  // https://nitro.unjs.io/guide/assets#server-assets
  const assets = useStorage('assets:server')
  const users = await assets.getItem('users.json')
  return {
    users
  }
})

```

<!-- /automd -->

### Adding extra server assets

You can include more directories other than `server/assets` to the bundle using `nuxt.config`.

```js
export default defineNuxtConfig({
  nitro: {
    serverAssets: [
      {
        baseName: 'templates',
        dir: './templates'
      }
    ]
  }
})
```

## Using ESM imports

You can use esm imports (or `require` while not recommanded) to import server assets.

> [!IMPORTANT]
> Please prefer using storage api unless you need to directly import assets.

**Example:**

<!-- automd:file code src="./server/api/import.ts" -->

```ts [import.ts]
// import testHtml from 'server/assets/test.html'

export default defineEventHandler(async () => {
  const testHtml = process.dev ? undefined : await import('server/assets/test.html').then(r=>r.default)
  return testHtml
})

```

<!-- /automd -->

## Auto traced node_module dependencies

If you use dependencies that use filesystem access to read some files, nitro automatically detects usage using [vercel/nft](https://github.com/vercel/nft) and copy them to the lambda files.

**Example:** (a commonjs dependency)

<!-- automd:file code src="./server/node_modules/test_dep/index.cjs" -->

```cjs [index.cjs]
const { join } = require("path")
const { readFileSync } = require("fs")

module.exports = readFileSync(join(__dirname, "test.txt"), "utf-8")

```

<!-- /automd -->

When building with `--preset verrcel` or using vercel CI, you will have `.vercel/output/functions/__nitro.func/node_modules/test_dep/test.txt` in the build output which is auto traced.

If you need to force track a dependency, you can use `nitro.externals.traceInclude` config:

```js
export default defineNuxtConfig({
  nitro: {
    externals: {
      traceInclude: ['test_dep']
    }
  }
})
```

> [!NOTE]
> Nitro by default treeshakes dependencies and only includes **used** files from `node_modules` so normally you don't need to manually exclude files from tracing.


