import decToAny from '../../index.js';

decToAny(100, 2);
decToAny('100', 2);
decToAny('100', 2, {alphabet: 'abcd'});
decToAny('100', 2, {precision: 100});
