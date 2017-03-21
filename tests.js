'use strict';

const assert = require('assert');

const generatePasssword = require('./generate-password');

describe('generatePasssword', () => {
  it('should return a string', () => {
    assert.equal(typeof generatePasssword(), 'string');
  });
});
