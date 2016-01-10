'use strict';

var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');

/**
* @params {number|string} count
* @params {number} numericSystem
* @params {Object} [options]
* @return {String}
*/
function convertorInteger(count, numericSystem, options) {
    count = +count;

    if (!count) {
        return '';
    }

    var result = [];
    var char;

    do {
        char = options.alphabet[count % numericSystem];
        result.push(char);
        count = parseInt(count / numericSystem);
    } while (count > 0);

    return result.reverse().join('');
}

/**
* @params {string} count
* @params {number} numericSystem
* @params {Object} [options]
* @return {String}
*/
function convertorDiv(count, numericSystem, options) {
    count = +count;

    if (!count) {
        return '';
    }

    var result = '';
    var precision = options.precision || 60;
    var char;

    do {
        count *= numericSystem;
        char = options.alphabet[parseInt(count)];
        result += char;
        count -= parseInt(count);
        precision && precision--;
    } while (count != 0 && precision > 0);

    return result;
}

/**
* @params {number} count
* @params {number} numericSystem
* @params {Object} [options]
* @return {String}
*/
function decToAny(count, numericSystem, options) {
    numericSystem = parseInt(numericSystem);

    if (numericSystem < 2) {
        throw new Error('Numeral system should be base 2 or higher');
    }

    options = options || {};

    options.alphabet = options.alphabet || ALPHABET;

    if (options.alphabet.length < numericSystem) {
        throw new ReferenceError('The alphabet has\'t all symbols for this numeral system');
    }

    count = '' + count;
    count = count.trim();

    var numbers = [];
    var integerPart;
    var isMinus = count[0] === '-';

    integerPart = count.match(/^-?(\d+)/);
    if (integerPart && integerPart[1]) {
        integerPart = +integerPart[1];
    } else {
        integerPart = 0;
    }

    integerPart = convertorInteger(integerPart, numericSystem, options) || '0';

    var divPart;

    divPart = count.match(/\.(\d+)$/);
    if (divPart && divPart[1]) {
        divPart = divPart[1];
    } else {
        divPart = 0;
    }

    divPart = convertorDiv('0.' + divPart, numericSystem, options);

    if (isMinus && +count != 0) {
        integerPart = '-' + integerPart;
    }

    if (divPart !== '') {
        return integerPart + '.' + divPart;
    }

    return integerPart;
}

module.exports = decToAny;
