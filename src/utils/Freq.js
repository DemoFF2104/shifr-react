import { TimePicker } from 'antd';

const frequency_alphabet = [
  ' ',
  'e',
  't',
  'a',
  'o',
  'n',
  'i',
  's',
  'r',
  'h',
  'l',
  'd',
  'c',
  'u',
  'p',
  'f',
  'm',
  'w',
  'y',
  'b',
  'g',
  'v',
  'k',
  'q',
  'x',
  'j',
  'z',
];
let frequency_alphabet_tmp = [
  ' ',
  'e',
  't',
  'a',
  'o',
  'n',
  'i',
  's',
  'r',
  'h',
  'l',
  'd',
  'c',
  'u',
  'p',
  'f',
  'm',
  'w',
  'y',
  'b',
  'g',
  'v',
  'k',
  'q',
  'x',
  'j',
  'z',
];
const frequency_alphabet_ru = [
  ' ',
  'о',
  'е',
  'а',
  'и',
  'н',
  'т',
  'с',
  'р',
  'в',
  'л',
  'к',
  'м',
  'д',
  'п',
  'у',
  'я',
  'ы',
  'з',
  'ъ',
  'б',
  'г',
  'ч',
  'й',
  'х',
  'ж',
  'ю',
  'ш',
  'ц',
  'щ',
  'э',
  'ф',
  'ь',
  'ё',
];
let frequency_alphabet_ru_tmp = [
  ' ',
  'о',
  'е',
  'а',
  'и',
  'н',
  'т',
  'с',
  'р',
  'в',
  'л',
  'к',
  'м',
  'д',
  'п',
  'у',
  'я',
  'ы',
  'з',
  'ъ',
  'б',
  'г',
  'ч',
  'й',
  'х',
  'ж',
  'ю',
  'ш',
  'ц',
  'щ',
  'э',
  'ф',
  'ь',
  'ё',
];
let Replace = {
  letter: '',
  replace: '',
};
let arrReplace = [];
let startValue = '';
export function findCountSymbols(text) {
  console.log(text);
  text = text.split('');
  let symbolsInfo = {};

  text.forEach((element) => {
    let count = symbolsInfo[element] ? symbolsInfo[element] : 0;
    symbolsInfo[element] = count + 1;
  });

  return symbolsInfo;
}

export function findFrequencySymbols(textInfo, textLength) {
  let freqArr = Object.keys(textInfo).map((symbol) => {
    return {
      symbol,
      count: textInfo[symbol],
      frequency: textInfo[symbol] / textLength,
    };
  });
  freqArr = freqArr.sort((a, b) => {
    return b.frequency - a.frequency;
  });
  return freqArr;
}
export function replaceText(freqArr, text) {
  text = text.split('');
  let text2 = [];
  let result = [];
  freqArr.map((item) => {
    if (
      frequency_alphabet.indexOf(item.symbol.toLowerCase()) !== -1 ||
      frequency_alphabet_ru.indexOf(item.symbol.toLowerCase()) !== -1
    )
      result.push(item.symbol);
  });
  console.log(result);
  text.forEach((element, index) => {
    console.log(element);
    if (result.indexOf(element) !== -1 && frequency_alphabet.indexOf(element.toLowerCase()) !== -1)
      text2 += frequency_alphabet[result.indexOf(element)];
    else if (
      result.indexOf(element) !== -1 &&
      frequency_alphabet_ru.indexOf(element.toLowerCase()) !== -1
    )
      text2 += frequency_alphabet_ru[result.indexOf(element)];
    else text2 += element;
  });

  return text2;
}
export function buildBarInfo(frequencySymbols) {
  let labels = frequencySymbols.map((element) => {
    return element.symbol;
  });

  let data = frequencySymbols.map((element) => {
    return element.frequency;
  });

  return { tmpLabels: labels, tmpFreq: data };
}
export function replaceLetter(text, a, b) {
  text = text.split('');
  let text2 = [];
  let result = [];
  text.map((item) => {
    if (item.toLowerCase() == a) item = b;
    text2 += item;
  });

  return text2;
}
export function replaceLetterTmp(text, a, b, freqArr) {
  if (arrReplace.length == 0) {
    startValue = text.split('');
  }
  let tmpLetter = new Object();
  let text2 = '';
  tmpLetter.letter = a;
  tmpLetter.replace = b;
  arrReplace.push(tmpLetter);
  let arrLetters = [];
  arrReplace.map((item) => {
    arrLetters.push(item.letter);
  });
  startValue.map((item) => {
    if (arrLetters.indexOf(item.toLowerCase()) !== -1)
      item = arrReplace[arrLetters.indexOf(item.toLowerCase())].replace;
    text2 += item;
  });

  return text2;
}
export function clearStart() {
  startValue = '';
  arrReplace = [];
}
