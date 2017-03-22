'use strict';

const assert = require('assert');

const generatePassword = require('./generate-password');

describe('generatePasssword', () => {
  it('should return a string', () => {
    assert.equal(typeof generatePassword(10, true, true, true, true), 'string');
  });

  it('should return a password with the correct length', () => {
    assert.equal(generatePassword(20, true, true, true, true).length, 20);
    assert.equal(generatePassword(18, true, true, true, true).length, 18);
    assert.equal(generatePassword(4, true, true, true, true).length, 4);
  });

  it('should not be made up more than 20% by a single character', () => {
    const length = 100;

    const generated = generatePassword(length, true, true, true, true);

    const characterCounts = new Map();
    for (const char of generated) {
      characterCounts.set(char, characterCounts.get(char) || 0);
      characterCounts.set(char, characterCounts.get(char) + 1);
    }

    const singleCharLimit = length * 0.2;

    for (const count of characterCounts.values()) {
      assert(count <= singleCharLimit);
    }
  });

  describe('when the rules given can not be valid', () => {
    describe('because all options are set to false', () => {
      it('should throw an error', () => {
        assert.throws(() => generatePassword(3, true, true, true, true));
        assert.throws(() => generatePassword(2, true, true, true, false));
        assert.throws(() => generatePassword(1, true, true, false, false));
        assert.throws(() => generatePassword(0, true, false, false, false));
      });
    });

    describe('because length is insufficent to allow all required character types to be present', () => {

    });
  });

  describe('when only \'uppercase\' is set to true', () => {
    it('should return a password with only uppercase characters', () => {
      const generated = generatePassword(10, true, false, false, false);
      assert(/^[A-Z]+$/.test(generated));
    });
  });

  describe('when only \'lowercase\' is set to true', () => {
    it('should return a password with only lowercase characters', () => {
      const generated = generatePassword(10, false, true, false, false);
      assert(/^[a-z]+$/.test(generated));
    });
  });

  describe('when only \'number\' is set to true', () => {
    it('should return a password with only numeric characters', () => {
      const generated = generatePassword(4, false, false, true, false);
      assert(/^[0-9]+$/.test(generated));
    });
  });

  describe('when only \'special\' is set to true', () => {
    it('should return a password with only special characters', () => {
      const generated = generatePassword(4, false, false, false, true);
      assert(/^[!$%&*@^]+$/.test(generated));
    });
  });

  describe('when \'lowercase\' and \'uppercase\' are set to true', () => {
    it('should return a password containing both lowercase and uppercase characters', () => {
      const generated = generatePassword(10, true, true, false, false);
      assert(/[a-z]/.test(generated));
      assert(/[A-Z]/.test(generated));
    });

    it('should return a password containing only lowercase and uppercase characters', () => {
      const generated = generatePassword(10, true, true, false, false);
      assert(/^[A-z]+$/.test(generated));
    });
  });

  describe('when \'lowercase\', \'uppercase\' and \'number\' are set to true', () => {
    it('should return a password containing lowercase, uppercase and numeric characters', () => {
      const generated = generatePassword(10, true, true, true, false);
      assert(/[a-z]/.test(generated));
      assert(/[A-Z]/.test(generated));
      assert(/[0-9]/.test(generated));
    });

    it('should return a password containing only lowercase, uppercase and numeric characters', () => {
      const generated = generatePassword(10, true, true, true, false);
      assert(/^[A-z0-9]+$/.test(generated));
    });
  });

  describe('when \'lowercase\' and \'special\' are set to true', () => {
    it('should return a password containing both lowercase and special characters', () => {
      const generated = generatePassword(10, false, true, false, true);
      assert(/[a-z]/.test(generated));
      assert(/[!$%&*@^]/.test(generated));
    });

    it('should return a password containing only lowercase and uppercase characters', () => {
      const generated = generatePassword(10, false, true, false, true);
      assert(/^[a-z!$%&*@^]+$/.test(generated));
    });
  });

  describe('when all parameters are set to true', () => {
    it('should return a password containing all types of characters', () => {
      const generated = generatePassword(4, true, true, true, true);
      assert(/[a-z]/.test(generated));
      assert(/[A-Z]/.test(generated));
      assert(/[0-9]/.test(generated));
      assert(/[!$%&*@^]/.test(generated));
    });

    it('should return a password containing only lowercase, uppercase, numeric and special characters', () => {
      const generated = generatePassword(4, true, true, true, true);
      assert(/^[a-zA-Z0-9!$%&*@^]+$/.test(generated));
    });
  });
});
