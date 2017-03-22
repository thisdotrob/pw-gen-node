'use strict';

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SPECIAL_CHARS = '!$%&*@^';
const MAX_PROPORTION_SINGLE_CHAR = 0.2;

function generatePasssword(length, uppercase, lowercase, number, special) {
  if (!argumentsValid(length, uppercase, lowercase, number, special)) throw new Error();
  const charSet = createCharSet(uppercase, lowercase, number, special);
  let password = Array(length).fill(null);
  password = populateWithOneOfEachRequiredCharType(password, uppercase, lowercase, number, special);
  password = populateRemaining(password, charSet);
  return password.join("");
}

function argumentsValid(length, uppercase, lowercase, number, special) {
  const hasSufficientLengthForRequiredCharSets = length >= (uppercase + lowercase + number + special);
  const hasAtLeastOneRequiredCharSet = uppercase || lowercase || number || special;
  return hasSufficientLengthForRequiredCharSets && hasAtLeastOneRequiredCharSet;
}

function createCharSet(uppercase, lowercase, number, special) {
  let charSet = '';
  if (uppercase) charSet += UPPERCASE_CHARS;
  if (lowercase) charSet += LOWERCASE_CHARS;
  if (number) charSet += NUMBER_CHARS;
  if (special) charSet += SPECIAL_CHARS;
  return charSet;
}

function populateWithOneOfEachRequiredCharType(password, uppercase, lowercase, number, special) {
  if (uppercase) password[randomEmptyIndex(password)] = randomChar(UPPERCASE_CHARS);
  if (lowercase) password[randomEmptyIndex(password)] = randomChar(LOWERCASE_CHARS);
  if (number) password[randomEmptyIndex(password)] = randomChar(NUMBER_CHARS);
  if (special) password[randomEmptyIndex(password)] = randomChar(SPECIAL_CHARS);
  return password;
}

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function randomEmptyIndex(password) {
  let emptyIndex = null;
  while (emptyIndex === null) {
    const index = randomIndex(password)
    if (password[index] === null) emptyIndex = index;
  }
  return emptyIndex;
}

function populateRemaining(password, charSet) {
  const singleCharCountLimit = password.length * MAX_PROPORTION_SINGLE_CHAR;

  const charCounts = calculateCharCounts(password, charSet);

  for (const i in password) {
    if (password[i]) continue;

    let char = null;

    while(char === null) {
      const candidate = randomChar(charSet);
      if (charCounts[candidate] < singleCharCountLimit) char = candidate;
    }

    password[i] = char;
    charCounts[char] += 1;
  }

  return password;
}

function randomChar(charSet) {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

function calculateCharCounts(password, charSet) {
  const characterCounts = {};

  for (const char of charSet) {
    characterCounts[char] = 0;
  }

  for (const char of password) {
    characterCounts[char] += 1;
  }

  return characterCounts;
}

module.exports = generatePasssword;
