# blog

## CLI Commands

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# run tests with jest and preact-render-spy 
yarn test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

Note: When pre-rendering, your module as components are executed in a Node.js environment, where most Web APIs are not available. To account for this, wrap that code in a check like `if (typeof window !== 'undefined')`. 
Do not add `preact build --no-prerender` to the build command as it will prevent blog posts from rendering.
