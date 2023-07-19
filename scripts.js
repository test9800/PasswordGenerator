console.log("scripts are online");

//relationships to html-elements
const PASSWORD_OUTPUT_ELEMENT = document.getElementById("passwordOutput");
const MAIN_CONTAINER_ELEMENT = document.getElementById("mainContainer");
const CHARACTER_AMOUNT_ELEMENT = document.getElementById(
  "characterAmountNumber"
);
const INCLUDE_UPPERCASE_ELEMENT = document.getElementById("includeUppercase");
const INCLUDE_NUMBERS_ELEMENT = document.getElementById("includeNumbers");
const INCLUDE_SYMBOLS_ELEMENT = document.getElementById("includeSymbols");
const COPY_BUTTON = document.getElementById("copyButton");

//array for password generation
const LOWERCASE_CHAR = arrayFromLowToHigh(97, 122);
const UPPERCASE_CHAR = arrayFromLowToHigh(65, 90);
const NUMBERS = arrayFromLowToHigh(48, 57);
const SYMBOLS = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

//eventListeners
MAIN_CONTAINER_ELEMENT.addEventListener('submit', event => {
  event.preventDefault();

  const CHARACTER_AMOUNT_VALUE = CHARACTER_AMOUNT_ELEMENT.value;
  const INCLUDE_UPPERCASE_STATE = INCLUDE_UPPERCASE_ELEMENT.checked;
  const INCLUDE_NUMBERS_STATE = INCLUDE_NUMBERS_ELEMENT.checked;
  const INCLUDE_SYMBOLS_STATE = INCLUDE_SYMBOLS_ELEMENT.checked;

  const password = generatePassword(
    CHARACTER_AMOUNT_VALUE,
    INCLUDE_UPPERCASE_STATE,
    INCLUDE_NUMBERS_STATE,
    INCLUDE_SYMBOLS_STATE
  );

  PASSWORD_OUTPUT_ELEMENT.innerText = password;
});

COPY_BUTTON.addEventListener('click', function(event){
    navigator.clipboard.writeText(PASSWORD_OUTPUT_ELEMENT.innerHTML);
    alert("Copied Successfully!");
    console.log("password copied");
})

//functions
function generatePassword(
  CHARACTER_AMOUNT_VALUE,
  INCLUDE_UPPERCASE_STATE,
  INCLUDE_NUMBERS_STATE,
  INCLUDE_SYMBOLS_STATE
) {
  let ASCII_CODES_POOL = LOWERCASE_CHAR;

  if (INCLUDE_UPPERCASE_STATE) {
    ASCII_CODES_POOL = ASCII_CODES_POOL.concat(UPPERCASE_CHAR);
  }
  if (INCLUDE_NUMBERS_STATE) {
    ASCII_CODES_POOL = ASCII_CODES_POOL.concat(NUMBERS);
  }
  if (INCLUDE_SYMBOLS_STATE) {
    ASCII_CODES_POOL = ASCII_CODES_POOL.concat(SYMBOLS);
  }

  const passwordAsArray = [];

  for (let i = 1; i <= CHARACTER_AMOUNT_VALUE; i++) {
    const CHAR_INDEX = Math.floor(Math.random() * ASCII_CODES_POOL.length);
    const PASSWORD_ASCII_NUMBER = ASCII_CODES_POOL[CHAR_INDEX];
    const PASSWORD_CHAR = String.fromCharCode(PASSWORD_ASCII_NUMBER);
    passwordAsArray.push(PASSWORD_CHAR);
  }

  return passwordAsArray.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
