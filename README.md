# decimal-to-any
> Convert decimal number to any other numeral system. Support user's alphabet.

## Usage

Convert 256 decimal number to hex
```javascript
var decToAny = require('decimal-to-any-convertor');
decToAny(256, 16); // '100'
```

Convert 100 decimal number to base 6 numeral system
```javascript
var decToAny = require('decimal-to-any-convertor');
decToAny(100, 6); // '244'
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
Default: `0123456789abcdefghijklmnopqrstuvw`  

Alternative alphabet for output.
```javascript
var options = {
    alphabet: '!@#$%^&*()_+={}<>±'
};

decToAny(100, 16, options)// '&%'
decToAny(200.002, 16, options)// '=(.!!($@#&})*({%<}'
```
Or use DEC to DEC with user's alphabet
```javascript
var options = {
    alphabet: '@123456789'// 'at' symbol instead of 0
};

decToAny(100, 10, options)// '1@@'
```

##### options.precision
Type: `Number`  
Default: 60  

Quantity of numbers after point
