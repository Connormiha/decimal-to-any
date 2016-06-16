'use strict';

const expect = require('chai').expect;
const convertor = require('../');

describe('decimal-to-any-convertor', () => {
    it('should convert decimal to hex', () => {
        expect(convertor(0, 16)).to.equal('0');
        expect(convertor(1, 16)).to.equal('1');
        expect(convertor(10, 16)).to.equal('a');
        expect(convertor(100, 16)).to.equal('64');
        expect(convertor(1000, 16)).to.equal('3e8');
        expect(convertor(256, 16)).to.equal('100');
    });

    it('should convert float decimal to float hex', () => {
        expect(convertor(0.1, 16)).to.equal('0.19999999999999999999');
        expect(convertor(.1, 16)).to.equal('0.19999999999999999999');
        expect(convertor(1.0, 16)).to.equal('1');
        expect(convertor(256.000512, 16)).to.equal('100.00218def416bdb1a6d69');
    });

    it('should convert decimal to octal', () => {
        expect(convertor(8, 8)).to.equal('10');
        expect(convertor(1, 8)).to.equal('1');
        expect(convertor(300, 8)).to.equal('454');
    });

    it('should convert float decimal to float octal', () => {
        expect(convertor(20.2, 8)).to.equal('24.14631463146314631463');
        expect(convertor(20.300, 8)).to.equal('24.23146314631463146314');
        expect(convertor(100.001, 8)).to.equal('144.00040611156457065176');
    });

    it('should convert float decimal to float binary', () => {
        expect(convertor(20.2, 2)).to.equal('10100.00110011001100110011');
        expect(convertor(20.300, 2)).to.equal('10100.01001100110011001100');
        expect(convertor(100.001, 2)).to.equal('1100100.00000000010000011000');
        expect(convertor(20.0, 2)).to.equal('10100');
    });

    it('should convert decimal to base 30 numeral system', () => {
        expect(convertor(100, 30)).to.equal('3a');
        expect(convertor(1001.1001, 30)).to.equal('13b.302ktttttttokh0t2cqd');
    });

    it('should convert decimal to base 20 numeral system', () => {
        expect(convertor(1.33, 20)).to.equal('1.6c2');
    });

    it('should convert string', () => {
        expect(convertor('0', 16)).to.equal('0');
        expect(convertor('1', 16)).to.equal('1');
        expect(convertor('10', 16)).to.equal('a');
    });

    it('should make auto trim', () => {
        expect(convertor('  0  ', 16)).to.equal('0');
        expect(convertor(' 1  ', 16)).to.equal('1');
        expect(convertor('  256.000512  ', 16)).to.equal('100.00218def416bdb1a6d69');
    });

    it('should save minus symbol', () => {
        expect(convertor(-1, 16)).to.equal('-1');
        expect(convertor(' -1.0  ', 16)).to.equal('-1');
        expect(convertor('  -256.000512  ', 16)).to.equal('-100.00218def416bdb1a6d69');
        expect(convertor(' -.1  ', 10)).to.equal('-0.1');
    });

    it('should use user\'s alphabet', () => {
        let alphabet = '!@#$%^&*()_+={}<>±';
        let options = {
            alphabet: alphabet
        };

        expect(convertor(100, 16, options)).to.equal('&%');
        expect(convertor(200.002, 16, options)).to.equal('=(.!!($@#&})*({%<{<$+&%');

        options.alphabet = options.alphabet.split('');
        expect(convertor(100, 16, options)).to.equal('&%');
        expect(convertor(200.002, 16, options)).to.equal('=(.!!($@#&})*({%<{<$+&%');
    });

    it('should convert dec to dec and use user\'s alphabet', () => {
        let alphabet = '@123456789';
        let options = {
            alphabet: alphabet
        };

        expect(convertor(100, 10, options)).to.equal('1@@');
        expect(convertor(100.001, 10, options)).to.equal('1@@.@@1');
    });

    it('should use precision', () => {
        expect(convertor('256.000512', 16, {precision: 3})).to.equal('100.002');
    });

    it('should throw error on alphabet chars overflow', () => {
        expect(() => {
            convertor(100, 100);
        }).to.throw('The alphabet has\'t all symbols for this numeral system');
    });

    it('should throw error on numeral system smaller than 2', () => {
        expect(() => {
            convertor(100, 1);
        }).to.throw('Numeral system should be base 2 or higher');

        expect(() => {
            convertor(100, -1);
        }).to.throw('Numeral system should be base 2 or higher');
    });
});
