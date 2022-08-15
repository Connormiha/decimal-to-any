'use strict';

const convertor = require('..');

describe('decimal-to-any-convertor', () => {
    it('should convert decimal to hex', () => {
        expect(convertor(0, 16)).toEqual('0');
        expect(convertor(1, 16)).toEqual('1');
        expect(convertor(10, 16)).toEqual('a');
        expect(convertor(100, 16)).toEqual('64');
        expect(convertor(1000, 16)).toEqual('3e8');
        expect(convertor(256, 16)).toEqual('100');
    });

    it('should convert float decimal to float hex', () => {
        expect(convertor(0.1, 16)).toEqual('0.19999999999999999999');
        expect(convertor(.1, 16)).toEqual('0.19999999999999999999');
        expect(convertor(1.0, 16)).toEqual('1');
        expect(convertor(256.000512, 16)).toEqual('100.00218def416bdb1a6d69');
    });

    it('should convert decimal to octal', () => {
        expect(convertor(8, 8)).toEqual('10');
        expect(convertor(1, 8)).toEqual('1');
        expect(convertor(300, 8)).toEqual('454');
    });

    it('should convert float decimal to float octal', () => {
        expect(convertor(20.2, 8)).toEqual('24.14631463146314631463');
        expect(convertor(20.300, 8)).toEqual('24.23146314631463146314');
        expect(convertor(100.001, 8)).toEqual('144.00040611156457065176');
    });

    it('should convert float decimal to float binary', () => {
        expect(convertor(20.2, 2)).toEqual('10100.00110011001100110011');
        expect(convertor(20.300, 2)).toEqual('10100.01001100110011001100');
        expect(convertor(100.001, 2)).toEqual('1100100.00000000010000011000');
        expect(convertor(20.0, 2)).toEqual('10100');
    });

    it('should convert decimal to base 30 numeral system', () => {
        expect(convertor(100, 30)).toEqual('3a');
        expect(convertor(1001.1001, 30)).toEqual('13b.302ktttttttokh0t2cqd');
    });

    it('should convert decimal to base 20 numeral system', () => {
        expect(convertor(1.33, 20)).toEqual('1.6c2');
    });

    it('should convert string', () => {
        expect(convertor('0', 16)).toEqual('0');
        expect(convertor('1', 16)).toEqual('1');
        expect(convertor('10', 16)).toEqual('a');
        expect(convertor('  10', 12)).toEqual('a');
        expect(convertor('  10    ', 12)).toEqual('a');
        expect(convertor('  10    a', 12)).toEqual('a');
    });

    it('should make auto trim', () => {
        expect(convertor('  0  ', 16)).toEqual('0');
        expect(convertor(' 1  ', 16)).toEqual('1');
        expect(convertor('  256.000512  ', 16)).toEqual('100.00218def416bdb1a6d69');
    });

    it('should save minus symbol', () => {
        expect(convertor(-1, 16)).toEqual('-1');
        expect(convertor(' -1.0  ', 16)).toEqual('-1');
        expect(convertor('  -256.000512  ', 16)).toEqual('-100.00218def416bdb1a6d69');
        expect(convertor(' -.1  ', 10)).toEqual('-0.1');
    });

    it('should use user\'s alphabet', () => {
        let alphabet = '!@#$%^&*()_+={}<>±';
        let options = {
            alphabet: alphabet
        };

        expect(convertor(100, 16, options)).toEqual('&%');
        expect(convertor(200.002, 16, options)).toEqual('=(.!!($@#&})*({%<{<$+&%');

        options.alphabet = options.alphabet.split('');
        expect(convertor(100, 16, options)).toEqual('&%');
        expect(convertor(200.002, 16, options)).toEqual('=(.!!($@#&})*({%<{<$+&%');
    });

    it('should convert dec to dec and use user\'s alphabet', () => {
        let alphabet = '@123456789';
        let options = {
            alphabet: alphabet
        };

        expect(convertor(100, 10, options)).toEqual('1@@');
        expect(convertor(100.001, 10, options)).toEqual('1@@.@@1');
    });

    it('should use precision', () => {
        expect(convertor('256.000512', 16, {precision: 3})).toEqual('100.002');
    });

    it('should throw error on alphabet chars overflow', () => {
        expect(() => {
            convertor(100, 100);
        }).toThrowError('The alphabet has\'t all symbols for this numeral system');
    });

    it('should throw error on numeral system smaller than 2', () => {
        expect(() => {
            convertor(100, 1);
        }).toThrowError('Numeral system should be base 2 or higher');

        expect(() => {
            convertor(100, -1);
        }).toThrowError('Numeral system should be base 2 or higher');
    });
});
