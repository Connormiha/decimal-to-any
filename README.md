[![Build Status](https://travis-ci.org/Connormiha/decimal-to-any.svg?branch=master)](https://travis-ci.org/Connormiha/decimal-to-any)

# decimal-to-any [![NPM version][npm-image]][npm-url]
> Convert decimal number to any other numeral system. Support user's alphabet.

## Usage
### Simple usage without alternative alphabet

Convert 256 decimal number to hex
```javascript
var decToAny = require('decimal-to-any');
decToAny(256, 16); // '100'
```

Convert 100 decimal number to base 6 numeral system
```javascript
decToAny(100, 6); // '244'
```
Convert 200.1 decimal number to base 30 numeral system
```javascript
decToAny(200.1, 30); // '6k.3'
```

Convert 20 decimal number to binary
```javascript
decToAny(20, 2); // '10100'
```


## API
### decimal-to-any(number, numeralSystem[, options])

#### number
Type: `Number`, `String`  

The decimal number for convert. `100, 100.1, "100.1"`

#### numeralSystem
Type: `Number`  

The numeral system for output.

#### options
Type: `Object`

##### options.alphabet
Type: `Array`, `String`  
Default: `"0123456789abcdefghijklmnopqrstuvwxyz"`  

Alternative alphabet for output.
```javascript
var options = {
    alphabet: '!@#$%^&*()_+={}<>±'
};

decToAny(100, 16, options)// '&%'
decToAny(200.002, 16, options)// '=(.!!($@#&})*({%<}'
```

`Example for understanding.` DEC to DEC with user's alphabet. It's just example. It's better to use here  String.replace :)
```javascript
var options = {
    alphabet: '@123456789'// 'at' symbol instead of 0
};

decToAny(100, 10, options)// '1@@'
```

`Important:` if you want to use numeral system with base higher than the default alphabet length (example: base 50), you should define new alphabet via options.alphabet.

##### options.precision
Type: `Number`  
Default: 20  

Quantity of numbers after point

[npm-url]: https://npmjs.org/package/decimal-to-any
[npm-image]: https://img.shields.io/npm/v/decimal-to-any.svg
