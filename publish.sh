#!/bin/bash

microbundle build -i src/pure.js -o dist/index.js --compress --name async-actions --no-sourcemap
microbundle build -i src/svelte.js -o dist/svelte.js --compress --name async-actions --no-sourcemap
microbundle build -i src/vue/index.js -o dist/vue.js --compress --name async-actions --no-sourcemap

npm publish --access public