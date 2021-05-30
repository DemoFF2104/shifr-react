/* eslint-disable no-loop-func */
const arr_ru = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const arr_en = 'abcdefghijklmnopqrstuvwxyz';
const cardanus = {
  getRandomInt: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  },
  checkCount: (count) => {
    let countNumber = parseInt(count);
    if (countNumber % 2 == 0 && countNumber > 0) return true;
    else return false;
  },
  checkKey: (key, count) => {
    let keyNumber = parseInt(key);
    let countNumber = parseInt(count);
    if (key.length == Math.pow(countNumber / 2, 2)) return true;
    else return false;
  },
  rotateMatrix: (matrix) => {
    let result = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (!result[j]) {
          result[j] = [];
        }
        result[j].push(matrix[i][j]);
      }
    }
    return result;
  },
  cgetRotatedMatrix: (matrix, isClockwise = true) => {
    const dimension = matrix.length;
    const N = matrix.length - 1; // latest index
    let rotatedMatrix = [];
    for (let i = 0; i < dimension; i++) {
      rotatedMatrix.push([]); // add empty rows
    }
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        let firstIndex, secondIndex;
        if (isClockwise) {
          // two cases
          firstIndex = j; // simply linear algebra :)
          secondIndex = N - i;
        } else {
          firstIndex = N - j;
          secondIndex = i;
        }
        rotatedMatrix[firstIndex][secondIndex] = matrix[i][j]; // matrix filling
      }
    }

    return rotatedMatrix;
  },
  strToMatrix: (str, sizeBlock, language) => {
    let sizeStr = str.length;
    let arrValue = str.split('');
    let matrixValue = [];
    while (arrValue.length % sizeBlock != 0) {
      if (language) arrValue.push(arr_ru[cardanus.getRandomInt(0, 33)]);
      else arrValue.push(arr_en[cardanus.getRandomInt(0, 26)]);
    }
    console.log(arrValue);

    for (let i = 0, k = -1; i < arrValue.length; i++) {
      if (i % sizeBlock === 0) {
        k++;
        matrixValue[k] = [];
      }

      matrixValue[k].push(arrValue[i]);
    }
    while (matrixValue.length % 4 != 0) {
      matrixValue[matrixValue.length] = [];
      while (matrixValue[matrixValue.length - 1].length != sizeBlock) {
        if (language)
          matrixValue[matrixValue.length - 1].push(arr_ru[cardanus.getRandomInt(0, 34)]);
        else matrixValue[matrixValue.length - 1].push(arr_en[cardanus.getRandomInt(0, 27)]);
      }
    }
    console.log(matrixValue);
    return matrixValue;
  },
  cardMatrix: (size, keyVal) => {
    console.log('Z nen');
    let matrix = [];
    let mask = [];
    let key = keyVal.split('');
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
    }
    //левый верхний угол
    let l = 0;
    for (let i = 0; i < parseInt(size / 2); i++) {
      for (let j = 0; j < parseInt(size / 2); j++) {
        matrix[i][j] = l;
        l++;
      }
    }

    l = 0;
    for (let i = 0; i < parseInt(size / 2); i++) {
      for (let j = size - 1; j > parseInt(size / 2) - 1; j--) {
        matrix[j][i] = l;
        l++;
      }
    }

    l = 0;
    for (let i = size - 1; i > parseInt(size / 2) - 1; i--) {
      for (let j = size - 1; j > parseInt(size / 2) - 1; j--) {
        matrix[i][j] = l;
        l++;
      }
    }
    //правый нижний угол
    l = 0;
    for (let i = size - 1; i > parseInt(size / 2) - 1; i--) {
      for (let j = 0; j < parseInt(size / 2); j++) {
        matrix[j][i] = l;
        l++;
      }
    }
    for (let i = 0; i < size; i++) {
      mask[i] = [];
      for (let j = 0; j < size; j++) {
        mask[i][j] = matrix[i][j];
      }
    }
    let maxNumber = Math.pow(size / 2, 2);
    console.log(key);
    key.map((value, index) => {
      let k = value;
      switch (parseInt(value)) {
        case 0:
          for (let i = 0; i < parseInt(size / 2); i++) {
            for (let j = 0; j < parseInt(size / 2); j++) {
              if (matrix[i][j] == index) mask[i][j] = mask[i][j] + '!';
            }
          }
          break;
        case 1:
          for (let i = 0; i < parseInt(size / 2); i++) {
            for (let j = parseInt(size / 2); j < size; j++) {
              if (matrix[i][j] == index) mask[i][j] = mask[i][j] + '!';
            }
          }
          break;
        case 2:
          for (let i = parseInt(size / 2); i < size; i++) {
            for (let j = 0; j < parseInt(size / 2); j++) {
              if (matrix[i][j] == index) mask[i][j] = mask[i][j] + '!';
            }
          }
          break;
        case 3:
          for (let i = parseInt(size / 2); i < size; i++) {
            for (let j = parseInt(size / 2); j < size; j++) {
              if (matrix[i][j] == index) mask[i][j] = mask[i][j] + '!';
            }
          }
          break;
        default:
          alert('We hope that this page looks ok!');
      }
    });

    return { cardMatrix: matrix, maskMatrix: mask, key: key };
  },
  encoding: (value, size, keyVal, language) => {
    let sizeBlock = Math.pow(size / 2, 2);
    let valueMatrix = cardanus.strToMatrix(value, sizeBlock, language);
    let resultMatrix = [];
    let strResult = '';
    let { cardMatrix, maskMatrix, key } = cardanus.cardMatrix(size, keyVal);
    for (let i = 0; i < cardMatrix.length; i++) {
      resultMatrix[i] = [];
    }
    for (let k = 0, count = 0; k < valueMatrix.length; k++) {
      if (valueMatrix.length > 4) {
        if (count == 4) {
          console.log(count);
          for (let i = 0; i < resultMatrix.length; i++) {
            console.log(resultMatrix[i]);
            strResult += resultMatrix[i].join('');
            resultMatrix[i] = [];
            console.log(strResult);
            console.log(resultMatrix[i]);
          }

          count = 0;
        }
      }
      let valueRow = valueMatrix[k];
      valueRow.map((value, index) => {
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (maskMatrix[i][j] == index + '!') {
              resultMatrix[i][j] = value;
            }
          }
        }
      });

      maskMatrix = cardanus.rotateMatrix(maskMatrix);

      count++;
    }
    for (let i = 0; i < resultMatrix.length; i++) {
      strResult += resultMatrix[i].join('');
    }
    console.log(key);
    return strResult;
  },
  decoding: (value, size, keyVal, language) => {
    let sizeBlock = Math.pow(size / 2, 2);
    let valueMatrix = cardanus.strToMatrix(value, sizeBlock, language);
    console.log(valueMatrix);
    let resultMatrix = [];
    let strResult = '';
    let { cardMatrix, maskMatrix, key } = cardanus.cardMatrix(size, keyVal);
    for (let i = 0; i < cardMatrix.length; i++) {
      resultMatrix[i] = [];
    }
    for (let k = 0, count = 0, mat = 0; k < valueMatrix.length; k++) {
      let valueRow = valueMatrix[k];
      if (count == 4) {
        count = 0;
        mat++;
      }
      console.log(valueMatrix);
      console.log(maskMatrix);
      console.log(mat);
      valueRow.map((value, index) => {
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (maskMatrix[i][j] == index + '!') {
              console.log(valueMatrix[mat * 4 + i][j]);
              strResult += valueMatrix[mat * 4 + i][j];
            }
          }
        }
      });
      count++;
      maskMatrix = cardanus.cgetRotatedMatrix(maskMatrix, true);
    }
    console.log(key);
    return strResult;
  },
};
export default cardanus;
