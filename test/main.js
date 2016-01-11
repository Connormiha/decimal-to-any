'use strict';

var expect = require('chai').expect;
var convertor = require('../');

describe('decimal-to-any-convertor', function() {
    it('Should convert decimal to hex', function() {
        expect(convertor(0, 16)).to.equal('0');
        expect(convertor(1, 16)).to.equal('1');
        expect(convertor(10, 16)).to.equal('a');
        expect(convertor(100, 16)).to.equal('64');
        expect(convertor(1000, 16)).to.equal('3e8');
        expect(convertor(256, 16)).to.equal('100');
    });

    it('Should convert float decimal to float hex', function() {
        expect(convertor(0.1, 16)).to.equal('0.1999999999999a');
        expect(convertor(.1, 16)).to.equal('0.1999999999999a');
        expect(convertor(1.0, 16)).to.equal('1');
        expect(convertor(256.000512, 16)).to.equal('100.00218def416bdb1a');
    });

    it('Should convert decimal to octal', function() {
        expect(convertor(8, 8)).to.equal('10');
        expect(convertor(1, 8)).to.equal('1');
        expect(convertor(300, 8)).to.equal('454');
    });

    it('Should convert float decimal to float octal', function() {
        expect(convertor(20.2, 8)).to.equal('24.146314631463146315');
        expect(convertor(20.300, 8)).to.equal('24.231463146314631463');
        expect(convertor(100.001, 8)).to.equal('144.00040611156457065177');
    });

    it('Should convert float decimal to float binary', function() {
        expect(convertor(20.2, 2)).to.equal('10100.001100110011001100110011001100110011001100110011001101');
        expect(convertor(20.300, 2)).to.equal('10100.010011001100110011001100110011001100110011001100110011');
        expect(convertor(100.001, 2)).to.equal('1100100.000000000100000110001001001101110100101111000110101001111111');
        expect(convertor(20.0, 2)).to.equal('10100');
    });

    it('Should convert decimal to base 30 numeral system', function() {
        expect(convertor(100, 30)).to.equal('3a');
        expect(convertor(1001.1001, 30)).to.equal('13b.302kttttttto4c9h2kn73fojttj1jh3gtelefem1q463km7t1q7f');
    });

    it('Should convert string', function() {
        expect(convertor('0', 16)).to.equal('0');
        expect(convertor('1', 16)).to.equal('1');
        expect(convertor('10', 16)).to.equal('a');
    });

    it('Should make auto trim', function() {
        expect(convertor('  0  ', 16)).to.equal('0');
        expect(convertor(' 1  ', 16)).to.equal('1');
        expect(convertor('  256.000512  ', 16)).to.equal('100.00218def416bdb1a');
    });

    it('Should save minus symbol', function() {
        expect(convertor(-1, 16)).to.equal('-1');
        expect(convertor(' -1.0  ', 16)).to.equal('-1');
        expect(convertor('  -256.000512  ', 16)).to.equal('-100.00218def416bdb1a');
        expect(convertor(' -.1  ', 10)).to.equal('-0.1');
    });

    it('Should use user\'s alphabet', function() {
        var alphabet = '!@#$%^&*()_+={}<>±';
        var options = {
            alphabet: alphabet
        };

        expect(convertor(100, 16, options)).to.equal('&%');
        expect(convertor(200.002, 16, options)).to.equal('=(.!!($@#&})*({%<}');

        options.alphabet = options.alphabet.split('');
        expect(convertor(100, 16, options)).to.equal('&%');
        expect(convertor(200.002, 16, options)).to.equal('=(.!!($@#&})*({%<}');
    });

    it('Should convert dec to dec and use user\'s alphabet', function() {
        var alphabet = '@123456789';
        var options = {
            alphabet: alphabet
        };

        expect(convertor(100, 10, options)).to.equal('1@@');
        expect(convertor(100.001, 10, options)).to.equal('1@@.@@1');
    });

    it('Should use precision', function() {
        expect(convertor('256.000512', 16, {precision: 3})).to.equal('100.002');
    });

    it('Should throw error on alphabet chars overflow', function() {
        expect(function() {
            convertor(100, 100);
        }).to.throw('The alphabet has\'t all symbols for this numeral system');
    });

    it('Should throw error on numeral system smaller than 2', function() {
        expect(function() {
            convertor(100, 1);
        }).to.throw('Numeral system should be base 2 or higher');

        expect(function() {
            convertor(100, -1);
        }).to.throw('Numeral system should be base 2 or higher');
    });
});
