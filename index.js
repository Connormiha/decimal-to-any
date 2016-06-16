'use strict';

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
const regExpInteger = /^-?(\d+)/;
const regExpDivPart = /\.(\d+)$/;

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

    let result = '';
    let char;
    let alphabet = options.alphabet;

    do {
        char = alphabet[count % numericSystem];
        result = char + result;
        count = parseInt(count / numericSystem);
    } while (count > 0);

    return result;
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

    let result = '';
    let precision = options.precision || 20;
    let alphabet = options.alphabet;
    let char;
    let zeroPos;

    do {
        count *= numericSystem;
        char = alphabet[parseInt(count)];
        result += char;
        count += '';
        zeroPos = count.indexOf('.');
        if (zeroPos !== -1) {
            count = +count.slice(zeroPos);
        } else {
            count = 0;
        }
        precision && precision--;
    } while (count !== 0 && precision > 0);

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

    count = String(count);
    count = count.trim();

    let numbers = [];
    let integerPart;
    let isMinus = count[0] === '-';

    integerPart = count.match(regExpInteger);
    if (integerPart && integerPart[1]) {
        integerPart = +integerPart[1];
    } else {
        integerPart = 0;
    }

    integerPart = convertorInteger(integerPart, numericSystem, options) || '0';

    let divPart;

    divPart = count.match(regExpDivPart);
    if (divPart && divPart[1]) {
        divPart = divPart[1];
    } else {
        divPart = 0;
    }

    divPart = convertorDiv(`0.${divPart}`, numericSystem, options);

    if (isMinus && +count != 0) {
        integerPart = `-${integerPart}`;
    }

    if (divPart !== '') {
        return integerPart + `.${divPart}`;
    }

    return integerPart;
}

module.exports = decToAny;
