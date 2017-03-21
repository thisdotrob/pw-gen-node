'use strict';

function generatePasssword(length, uppercase, lowercase, number, special) {
  const characterSet = [];

  if (uppercase) characterSet.push('A');
  if (lowercase) characterSet.push('a');

  if (!characterSet.length) throw new Error();

  let characterSetIndex = 0;

  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(characterSet[characterSetIndex]);
    characterSetIndex += 1;
    if (characterSetIndex === characterSet.length) characterSetIndex = 0;
  }

  return result.join("");
}

module.exports = generatePasssword;
