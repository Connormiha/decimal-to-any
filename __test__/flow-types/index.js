/* @flow */

const decToAny = require('../../index.js.flow');

decToAny(100, 2);
decToAny('100', 2);
decToAny('100', 2, {alphabet: 'abcd'});
decToAny('100', 2, {precision: 100});
