'use strict';

const assert = require('assert');

const generatePasssword = require('./generate-password');

describe('generatePasssword', () => {
  it('should return a string', () => {
    assert.equal(typeof generatePasssword(), 'string');
  });

  it('should return a password with the correct length', () => {
    const expectedLength = 20;
    assert.equal(generatePasssword(expectedLength).length, expectedLength);
  });
});
