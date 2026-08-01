'use strict';

/**
 * EMY page generator entry point.
 * Source lives in src/generator/sections/*.cjs (split from the original monolith).
 * Backup of the unsplit file: generate-linked-pages.monolith.cjs.bak
 */
require('./src/generator/run.cjs').runGenerator();
