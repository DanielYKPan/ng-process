/**
 * polyfills
 */

import 'core-js/es6';
import 'core-js/es7/reflect';
import 'web-animations-js/web-animations.min';
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
    // Production
} else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}

