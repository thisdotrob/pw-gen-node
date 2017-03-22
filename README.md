## generatePassword(length, uppercase, lowercase, number, special)

- ```length``` &lt;number&gt; The length of the password to generate.
- ```uppercase``` &lt;boolean&gt; Whether to require uppercase characters in the generated password.
- ```lowercase``` &lt;boolean&gt; Whether to require lowercase characters in the generated password.
- ```number``` &lt;boolean&gt; Whether to require numeric characters in the generated password.
- ```special``` &lt;boolean&gt; Whether to require special characters in the generated password.
- Returns: &lt;string&gt;

The returned password will contain at least one of each character type for which a true value was given in the function's parameters.

A single character will make up no more than 20% of the total password.

If length is not sufficient to allow at least one of each required character type, an error will be thrown.

If no character types are required, an error will be thrown.

**Can be used to generate a random password as follows:**

Requires [Node v6.10.0](https://nodejs.org/en/).

```bash
$ node
> const generatePassword = require('./generate-password');
undefined
> generatePassword(50, true, true, true, true);
'Y$Iw6LfNd$mZGiIl@j@&xcOs0E@kFU0v9Y9Z%0c&PnLFrJ@xjO'
```

**To run the tests:**
```
$ npm install
...
$ npm test

> pw-gen-node@1.0.0 test
> mocha tests.js



  generatePasssword
    ✓ should return a string
    ✓ should return a password with the correct length
    ✓ should not be made up more than 20% by a single character
    when the rules given can not be valid
      because all options are set to false
        ✓ should throw an error
      because length is insufficent to allow all required character types to be present
        ✓ should throw an error
    when only 'uppercase' is set to true
      ✓ should return a password with only uppercase characters
    when only 'lowercase' is set to true
      ✓ should return a password with only lowercase characters
    when only 'number' is set to true
      ✓ should return a password with only numeric characters
    when only 'special' is set to true
      ✓ should return a password with only special characters
    when 'lowercase' and 'uppercase' are set to true
      ✓ should return a password containing both lowercase and uppercase characters
      ✓ should return a password containing only lowercase and uppercase characters
    when 'lowercase', 'uppercase' and 'number' are set to true
      ✓ should return a password containing lowercase, uppercase and numeric characters
      ✓ should return a password containing only lowercase, uppercase and numeric characters
    when 'lowercase' and 'special' are set to true
      ✓ should return a password containing both lowercase and special characters
      ✓ should return a password containing only lowercase and uppercase characters
    when all parameters are set to true
      ✓ should return a password containing all types of characters
      ✓ should return a password containing only lowercase, uppercase, numeric and special characters


  17 passing (15ms)
```
