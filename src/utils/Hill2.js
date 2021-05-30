const arr_ru = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const arr_en = 'abcdefghijklmnopqrstuvwxyz';
var alphabet = [];
var squares = [2, 4, 9, 16, 25];
var size = null;
var sizeAlphabet = null;

function gcdex(a, b) {
  if (b === 0) {
    return { d: a, x: 1, y: 0 };
  } else {
    let { d, x, y } = gcdex(b, a % b);
    return { d, x: y, y: x - y * parseInt(a / b) };
  }
}

const hill = {
  createAlphabet: (lang) => {
    let arr = [];

    if (lang === 'Русский') {
      arr = hill.pushAlphabet(arr_ru);
    } else {
      arr = hill.pushAlphabet(arr_en);
    }

    return arr;
  },
  pushAlphabet: (langStr) => {
    let arr = [];

    langStr.split('').forEach((item, index) => {
      arr.push({
        id: index,
        symbol: item,
      });
    });

    while (arr.length < 37) {
      arr.push({
        id: arr.length + 1,
        symbol: '*',
      });
    }

    return arr;
  },
  findIndex: (text) => {
    let arr = [];

    text.split('').forEach((item) => {
      alphabet.forEach((element) => {
        if (item === element.symbol) {
          arr.push(element.id);
        }
      });
    });

    return arr;
  },
  codeKeyToMatrix: (key) => {
    let arr = [];
    let count = 0;

    for (let i = 0; i < size; i++) {
      arr[i] = [];

      for (let j = 0; j < size; j++) {
        arr[i][j] = key[count];
        count++;
      }
    }

    return arr;
  },
  codeTextToMatrix: (text) => {
    let arr = [];
    let count = 0;
    let newSize = null;

    if (text.length % size !== 0) {
      while (text.length % size !== 0) {
        text.push(35);
      }
    }

    newSize = text.length / size;

    for (let i = 0; i < newSize; i++) {
      arr[i] = [];

      for (let j = 0; j < size; j++) {
        arr[i][j] = text[count];
        count++;
      }
    }

    return arr;
  },
  multiplyMatrix: (textMatrix, keyMatrix) => {
    function matrixMultiplication(block) {
      let cipherBlock = [];

      for (let i = 0; i < size; i++) {
        let number = 0;

        for (let j = 0; j < size; j++) {
          number += parseInt(block[j]) * keyMatrix[j][i];
        }

        cipherBlock.push(number);
      }

      return cipherBlock;
    }

    return textMatrix.map((block) => {
      return matrixMultiplication(block);
    });
  },
  correctMuiltiplyMatrix: (matrix) => {
    function matrixCorrect(block) {
      return block.map((item) => {
        return item % sizeAlphabet;
      });
    }

    return matrix.map((block) => {
      return matrixCorrect(block);
    });
  },
  codingText: (matrix) => {
    let str = '';

    matrix.forEach((block) => {
      block.forEach((item) => {
        alphabet.forEach((alph) => {
          if (item === alph.id) {
            str += alph.symbol;
          }
        });
      });
    });

    return str;
  },
  encoding: (text, key, lang) => {
    text = text.toLowerCase();
    key = key.toLowerCase();

    if (!squares.includes(key.length)) {
      return 'Некорректный ключ!';
    }

    size = Math.sqrt(key.length);

    alphabet = hill.createAlphabet(lang);
    console.log('Алфавит', alphabet);

    sizeAlphabet = alphabet.length;

    let codeText = hill.findIndex(text);
    console.log('Шифр для текста:', codeText);

    let codeKey = hill.findIndex(key);
    console.log('Шифр для ключа:', codeKey);

    let codeKeyToMatrix = hill.codeKeyToMatrix(codeKey);
    console.log('Ключ в виде матрицы:', codeKeyToMatrix);

    let codeTextToMatrix = hill.codeTextToMatrix(codeText);
    console.log('Текст в виде матрицы:', codeTextToMatrix);

    let muiltiplyMatrix = hill.multiplyMatrix(codeTextToMatrix, codeKeyToMatrix);
    console.log('Результат перемножения матриц:', muiltiplyMatrix);

    let correctMuiltiplyMatrix = hill.correctMuiltiplyMatrix(muiltiplyMatrix);
    console.log('Откорректированная матрица:', correctMuiltiplyMatrix);

    let decodingText = hill.codingText(correctMuiltiplyMatrix);
    console.log('Закодированное сообщение', decodingText);

    return decodingText;
  },
  determinant: (A) => {
    let N = A.length,
      B = [],
      denom = 1,
      exchanges = 0;

    for (let i = 0; i < N; ++i) {
      B[i] = [];
      for (let j = 0; j < N; ++j) B[i][j] = A[i][j];
    }

    for (let i = 0; i < N - 1; ++i) {
      let maxN = i,
        maxValue = Math.abs(B[i][i]);
      for (let j = i + 1; j < N; ++j) {
        let value = Math.abs(B[j][i]);
        if (value > maxValue) {
          maxN = j;
          maxValue = value;
        }
      }
      if (maxN > i) {
        let temp = B[i];
        B[i] = B[maxN];
        B[maxN] = temp;
        ++exchanges;
      } else {
        if (maxValue === 0) return maxValue;
      }

      let value1 = B[i][i];

      for (let j = i + 1; j < N; ++j) {
        let value2 = B[j][i];
        B[j][i] = 0;
        for (let k = i + 1; k < N; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
      }
      denom = value1;
    }

    if (exchanges % 2) return -B[N - 1][N - 1];
    else return B[N - 1][N - 1];
  },
  reverseDeterminant: (determinantMatrix, alphabetLength, x) => {
    if (determinantMatrix < 0 && x >= 0) {
      return x;
    } else if ((determinantMatrix >= 0) & (x < 0)) {
      return alphabetLength + x;
    } else if ((determinantMatrix >= 0) & (x >= 0)) {
      return x;
    } else if ((determinantMatrix < 0) & (x < 0)) {
      return -x;
    }
  },
  findMatrixMinors: (matrixKey) => {
    let matrix = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        matrix.push(hill.selectElement(matrixKey, i, j));
      }
    }

    let matrixMinors = [];

    for (let i = 0; i < size; i += 1) {
      matrixMinors.push(hill.findAlgebraicAddition(matrix.splice(0, 3), i + 1));
    }

    matrixMinors = hill.transponseMatrix(matrixMinors);
    return matrixMinors;
  },
  selectElement: (matrixKey, row, column) => {
    let matrix = [];

    for (let i = 0; i < size; i++) {
      let mas = [];

      for (let j = 0; j < size; j++) {
        if (i !== row && j !== column) {
          mas.push(matrixKey[j][i]);
        }
      }

      if (mas.length > 0) {
        matrix.push(mas);
      }
    }

    return matrix;
  },
  findAlgebraicAddition: (matrix, row) => {
    return matrix.map((element, index) => {
      return Math.pow(-1, row + index + 1) * hill.determinant(element);
    });
  },
  transponseMatrix: (matrix) => {
    return matrix[0].map((col, i) => matrix.map((row) => row[i]));
  },
  correctMatrixMinors: (matrixMinors, alphabetLength) => {
    return matrixMinors.map((array) => {
      return array.map((element) => {
        return element % alphabetLength;
      });
    });
  },
  findMatrixMultipliedByElement: (matrixMinors, reverseElement) => {
    return matrixMinors.map((array) => {
      return array.map((element) => {
        return element * reverseElement;
      });
    });
  },
  changingNegativeElements: (matrixMinors, alphabetLength) => {
    return matrixMinors.map((array) => {
      return array.map((element) => {
        return element < 0 ? alphabetLength + element : element;
      });
    });
  },
  decoding: (text, key, lang) => {
    text = text.toLowerCase();
    key = key.toLowerCase();

    console.log('\n');

    if (!squares.includes(key.length)) {
      return 'Некорректный ключ!';
    }

    size = Math.sqrt(key.length);

    alphabet = hill.createAlphabet(lang);
    console.log('Алфавит', alphabet);

    sizeAlphabet = alphabet.length;

    let codeText = hill.findIndex(text);
    console.log('Шифр для текста:', codeText);

    let codeKey = hill.findIndex(key);
    console.log('Шифр для ключа:', codeKey);

    let codeKeyToMatrix = hill.codeKeyToMatrix(codeKey);
    console.log('Ключ в виде матрицы:', codeKeyToMatrix);

    let codeTextToMatrix = hill.codeTextToMatrix(codeText);
    console.log('Текст в виде матрицы:', codeTextToMatrix);

    let determinantMatrix = hill.determinant(codeKeyToMatrix);
    console.log('Определитель матрицы ключей: ', determinantMatrix);

    let { d, x, y } = gcdex(determinantMatrix, sizeAlphabet);
    console.log('Расширенный Евклид: ', d, x, y);

    let reverseElement = hill.reverseDeterminant(determinantMatrix, sizeAlphabet, x);
    console.log('Обратный элемент определителя: ', reverseElement);

    let matrixMinors = hill.findMatrixMinors(codeKeyToMatrix);
    console.log('Матрица миноров: ', matrixMinors);

    matrixMinors = hill.correctMatrixMinors(matrixMinors, sizeAlphabet);
    console.log('Матрица миноров по модулю мощности алфавита: ', matrixMinors);

    matrixMinors = hill.findMatrixMultipliedByElement(matrixMinors, reverseElement);
    console.log('Матрица миноров умноженная на обратный элемент: ', matrixMinors);

    matrixMinors = hill.correctMatrixMinors(matrixMinors, sizeAlphabet);
    console.log('Матрица миноров по модулю мощности алфавита: ', matrixMinors);

    matrixMinors = hill.transponseMatrix(matrixMinors);
    console.log('Транспонированная матрица миноров: ', matrixMinors);

    matrixMinors = hill.changingNegativeElements(matrixMinors, sizeAlphabet);
    console.log('Матрица миноров без отрицательных элементов: ', matrixMinors);

    let muiltiplyMatrix = hill.multiplyMatrix(codeTextToMatrix, matrixMinors);
    console.log('Результат перемножения матриц:', muiltiplyMatrix);

    let correctMuiltiplyMatrix = hill.correctMuiltiplyMatrix(muiltiplyMatrix);
    console.log('Откорректированная матрица:', correctMuiltiplyMatrix);

    let encodingText = hill.codingText(correctMuiltiplyMatrix).replace(/[^a-zа-яё]/gi, '');
    console.log('Закодированное сообщение', encodingText);

    return encodingText;
  },
};

export default hill;
