const arr_ru = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const arr_en = 'abcdefghijklmnopqrstuvwxyz';
const arr_RU = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const arr_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var alphabet = '';
var specialSymbol = '';
var size = null;

const playfair = {
  keyCorrect: (key) => {
    let newKey = key.split('');
    let objectsSymbol = {};

    newKey.forEach((element) => {
      let count = objectsSymbol[element] ? objectsSymbol[element] : 0;
      objectsSymbol[element] = count + 1;
    });

    return Object.keys(objectsSymbol)
      .map((item) => item)
      .join('');
  },
  alphabetCorrect: (key) => {
    key = key.split('');

    key.forEach((symbol) => {
      alphabet = alphabet.replace(symbol, '');
    });

    alphabet = key.join('') + alphabet;
    alphabet = alphabet.replaceAll('j', '');

    return alphabet;
  },
  createMatrix: (key) => {
    alphabet = playfair.alphabetCorrect(key);

    specialSymbol = size === 5 ? '!' : '!';

    let matrix = [];
    let index = 0;
    let symbols = ['*', '.', '?'];
    let count = 0;

    for (let i = 0; i < size; i++) {
      let arr = [];
      for (let j = 0; j < size; j++) {
        if (alphabet[index]) {
          arr.push(alphabet[index]);
        } else {
          arr.push(symbols[count]);
          count++;
        }
        index += 1;
      }
      matrix.push(arr);
    }

    return matrix;
  },
  textToBigrams: (text) => {
    let check = true;

    while (check) {
      let bigrams = [];

      for (let i = 0; i < text.length; i += 2) {
        let newText = text.split('');
        bigrams.push(newText.splice(i, 2).join(''));
      }

      let position = null;

      try {
        bigrams.forEach((bigram, index) => {
          if (bigram.length === 2) {
            if (bigram[0] === bigram[1]) {
              throw index;
            }
          }
        });
      } catch (index) {
        position = index * 2 + 1;
      }

      if (position) {
        text = text.split('');
        text.splice(position, 0, specialSymbol);
        text = text.join('');
      } else {
        bigrams = bigrams.map((bigram) => {
          if (bigram.length === 1) {
            bigram += specialSymbol;
          }
          return bigram;
        });
        check = false;
        return bigrams;
      }
    }

    return text;
  },
  findBigramFromMatrix: (matrix, bigram) => {
    bigram = bigram.split('');

    return bigram.map((element) => {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (element === matrix[i][j]) {
            return {
              symbol: element,
              i,
              j,
            };
          }
        }
      }
    });
  },
  buildStrEncrypt: (matrix, bigramInfo) => {
    let str = '';

    if (playfair.checkRow(bigramInfo)) {
      str += playfair.trueRowEncrypt(matrix, bigramInfo);
    }

    if (playfair.checkColumn(bigramInfo)) {
      str += playfair.trueColumnEncrypt(matrix, bigramInfo);
    }

    if (!playfair.checkRow(bigramInfo) && !playfair.checkColumn(bigramInfo)) {
      str += playfair.falseRowAndColumn(matrix, bigramInfo);
    }
    return str;
  },
  checkRow: (bigramInfo) => {
    if (bigramInfo[0].i === bigramInfo[1].i) {
      return true;
    } else {
      return false;
    }
  },
  checkColumn: (bigramInfo) => {
    if (bigramInfo[0].j === bigramInfo[1].j) {
      return true;
    } else {
      return false;
    }
  },
  trueRowEncrypt: (matrix, bigramInfo) => {
    let str = '';

    bigramInfo.forEach((bigram) => {
      let index = bigram.j < size - 1 ? bigram.j + 1 : 0;
      str += matrix[bigram.i][index];
    });

    return str;
  },
  trueColumnEncrypt: (matrix, bigramInfo) => {
    let str = '';

    bigramInfo.forEach((bigram) => {
      let index = bigram.i < size - 1 ? bigram.i + 1 : 0;
      str += matrix[index][bigram.j];
    });

    return str;
  },
  falseRowAndColumn: (matrix, bigramInfo) => {
    let str = matrix[bigramInfo[0].i][bigramInfo[1].j] + matrix[bigramInfo[1].i][bigramInfo[0].j];

    return str;
  },
  encrypt: (matrix, bigrams) => {
    let textEncrypt = '';

    bigrams.forEach((bigram) => {
      let bigramInfo = playfair.findBigramFromMatrix(matrix, bigram);
      textEncrypt += playfair.buildStrEncrypt(matrix, bigramInfo);
    });

    return textEncrypt;
  },
  encoding: (text, key, lang) => {
    text = text.toLowerCase().replaceAll(' ', '');
    text = text.toLowerCase().replaceAll('\n', '');
    key = key.toLowerCase().replaceAll(' ', '');
    key = playfair.keyCorrect(key);

    size = lang === 'Английский' ? 5 : 6;
    alphabet = size === 5 ? arr_en : arr_ru;

    const matrix = playfair.createMatrix(key);
    console.log('Матрица: ', matrix);

    let bigrams = playfair.textToBigrams(text);
    console.log('Массив биграм: ', bigrams);

    let textEncrypt = playfair.encrypt(matrix, bigrams);
    console.log('Зашифрованный текст: ', textEncrypt);

    return textEncrypt;
  },
  decoding: (text, key, lang) => {
    key = key.toLowerCase().replaceAll(' ', '');
    key = playfair.keyCorrect(key);

    size = lang === 'Английский' ? 5 : 6;
    alphabet = size === 5 ? arr_en : arr_ru;

    const matrix = playfair.createMatrix(key);
    console.log('Матрица: ', matrix);

    let bigrams = playfair.textToBigrams(text);
    console.log('Массив биграм: ', bigrams);

    let textDecrypt = playfair.decrypt(matrix, bigrams);
    console.log('Расшифрованный текст: ', textDecrypt);

    return textDecrypt;
  },
  decrypt: (matrix, bigrams) => {
    let textDecrypt = '';

    bigrams.forEach((bigram) => {
      let bigramInfo = playfair.findBigramFromMatrix(matrix, bigram);
      textDecrypt += playfair.buildStrDecrypt(matrix, bigramInfo);
    });

    return textDecrypt;
  },
  buildStrDecrypt: (matrix, bigramInfo) => {
    let str = '';

    if (playfair.checkRow(bigramInfo)) {
      str += playfair.trueRowDecrypt(matrix, bigramInfo);
    }

    if (playfair.checkColumn(bigramInfo)) {
      str += playfair.trueColumnDecrypt(matrix, bigramInfo);
    }

    if (!playfair.checkRow(bigramInfo) && !playfair.checkColumn(bigramInfo)) {
      str += playfair.falseRowAndColumn(matrix, bigramInfo);
    }
    return str;
  },
  trueRowDecrypt: (matrix, bigramInfo) => {
    let str = '';

    bigramInfo.forEach((bigram) => {
      let index = bigram.j > 0 ? bigram.j - 1 : size - 1;
      str += matrix[bigram.i][index];
    });

    return str;
  },
  trueColumnDecrypt: (matrix, bigramInfo) => {
    let str = '';

    bigramInfo.forEach((bigram) => {
      let index = bigram.i > 0 ? bigram.i - 1 : size - 1;
      str += matrix[index][bigram.j];
    });

    return str;
  },
};

export default playfair;
