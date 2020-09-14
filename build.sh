#!/bin/bash

microbundle build -i src/pure.js -o index.js --compress --name async-actions --no-sourcemap
microbundle build -i src/svelte.js -o svelte.js --compress --name async-actions --no-sourcemap
microbundle build -i src/vue/index.js -o vue.js --compress --name async-actions --no-sourcemap