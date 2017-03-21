'use strict';

function generatePasssword(length, uppercase, lowercase, number, special) {
  if (!uppercase) throw new Error();
  return "A".repeat(length);
}

module.exports = generatePasssword;
