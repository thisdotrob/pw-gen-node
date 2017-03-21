'use strict';

const assert = require('assert');

const generatePassword = require('./generate-password');

describe('generatePasssword', () => {
  it('should return a string', () => {
    assert.equal(typeof generatePassword(10, true, true, true, true), 'string');
  });

  it('should return a password with the correct length', () => {
    assert.equal(generatePassword(20, true, true, true, true).length, 20);
  });

  describe('when the rules given can not be valid as all options are set to false', () => {
    it('should throw an error', () => {
      assert.throws(() => generatePassword(10, false, false, false, false));
    });
  });

  describe('when only \'uppercase\' is set to true', () => {
    it('should return a password with only uppercase characters', () => {
      const generated = generatePassword(10, true, false, false, false);
      assert(/^[A-Z]/.test(generated));
    });
  });
});
