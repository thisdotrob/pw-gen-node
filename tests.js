'use strict';

const assert = require('assert');

const generatePasssword = require('./generate-password');

describe('generatePasssword', () => {it('should return a string', () => {
    assert.equal(typeof generatePasssword(10, true, true, true, true), 'string');
  });

  it('should return a password with the correct length', () => {
    const expectedLength = 20;
    assert.equal(generatePasssword(20, true, true, true, true).length, expectedLength);
  });

  describe('when the rules given can not be valid as all options are set to false', () => {
    it('should throw an error', () => {
      assert.throws(() => generatePasssword(10, false, false, false, false));
    });
  })
});
