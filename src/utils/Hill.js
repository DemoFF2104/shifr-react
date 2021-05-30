const arr_ru = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя .?!';
const arr_en = 'abcdefghijklmnopqrstuvwxyz .?';
var alphabet = [];
var squares = [2, 4, 9, 16, 25];
var size = null;
var sizeAlphabet = null;
const hill = {
  TransMatrix: (A) => {
    //На входе двумерный массив
    var m = A.length,
      n = A[0].length,
      AT = [];
    for (var i = 0; i < n; i++) {
      AT[i] = [];
      for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
    }
    return AT;
  },
  MultiplyMatrix: (A, B) => {
    var rowsA = A.length,
      colsA = A[0].length,
      rowsB = B.length,
      colsB = B[0].length,
      C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++) {
      for (var i = 0; i < rowsA; i++) {
        var t = 0;
        for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
        C[i][k] = t;
      }
    }
    return C;
  },
  Determinant: (A) => {
    // Используется алгоритм Барейса, сложность O(n^3)
    var N = A.length,
      B = [],
      denom = 1,
      exchanges = 0;
    for (var i = 0; i < N; ++i) {
      B[i] = [];
      for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
    }
    for (var i = 0; i < N - 1; ++i) {
      var maxN = i,
        maxValue = Math.abs(B[i][i]);
      for (var j = i + 1; j < N; ++j) {
        var value = Math.abs(B[j][i]);
        if (value > maxValue) {
          maxN = j;
          maxValue = value;
        }
      }
      if (maxN > i) {
        var temp = B[i];
        B[i] = B[maxN];
        B[maxN] = temp;
        ++exchanges;
      } else {
        if (maxValue == 0) return maxValue;
      }
      var value1 = B[i][i];
      for (var j = i + 1; j < N; ++j) {
        var value2 = B[j][i];
        B[j][i] = 0;
        for (var k = i + 1; k < N; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
      }
      denom = value1;
    }
    if (exchanges % 2) return -B[N - 1][N - 1];
    else return B[N - 1][N - 1];
  },
  MatrixCofactor: (
    i,
    j,
    A, //Алгебраическое дополнение матрицы
  ) => {
    var N = A.length,
      sign = (i + j) % 2 == 0 ? 1 : -1;
    for (var m = 0; m < N; m++) {
      for (var n = j + 1; n < N; n++) A[m][n - 1] = A[m][n];
      A[m].length--;
    }
    for (var k = i + 1; k < N; k++) A[k - 1] = A[k];
    A.length--;
    return sign * hill.Determinant(A);
  },
  mod: (n, m) => {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
  },
  AdjugateMatrix: (A, mod) => {
    // A - двумерный квадратный массив
    var N = A.length,
      adjA = [];
    for (var i = 0; i < N; i++) {
      adjA[i] = [];
      for (var j = 0; j < N; j++) {
        var B = [],
          sign = (i + j) % 2 == 0 ? 1 : -1;
        for (var m = 0; m < j; m++) {
          B[m] = [];
          for (var n = 0; n < i; n++) B[m][n] = A[m][n];
          for (var n = i + 1; n < N; n++) B[m][n - 1] = A[m][n];
        }
        for (var m = j + 1; m < N; m++) {
          B[m - 1] = [];
          for (var n = 0; n < i; n++) B[m - 1][n] = A[m][n];
          for (var n = i + 1; n < N; n++) B[m - 1][n - 1] = A[m][n];
        }
        adjA[i][j] = hill.mod(sign * hill.Determinant(B), mod); // Функцию Determinant см. выше
      }
    }
    return adjA;
  },
  getInvMod: (a, m) => {
    [a, m] = [+a, +m];
    a = ((a % m) + m) % m;
    if (!a || m < 2) return `входные данные не верны`;
    let [s, b] = [[], m];
    while (b) {
      [a, b] = [b, a % b];
      s.push({ a, b });
    }
    if (a !== 1) return `'a' не обратимое, то есть не имеет обратного`;
    let [x, y] = [1, 0];
    for (let i = s.length - 2; i >= 0; --i) [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)];
    return ((y % m) + m) % m;
  },
  multMatrixNumber: (
    a,
    A,
    mod, // a - число, A - матрица (двумерный массив)
  ) => {
    var m = A.length,
      n = A[0].length,
      B = [];
    for (var i = 0; i < m; i++) {
      B[i] = [];
      for (var j = 0; j < n; j++) B[i][j] = hill.mod(a * A[i][j], mod);
    }
    return B;
  },

  InverseMatrix: (A, mod) => {
    // A - двумерный квадратный массив
    var det = hill.Determinant(A) % mod; // Функцию Determinant см. выше
    if (det == 0) return false;
    let invElem = hill.getInvMod(det, mod);
    A = hill.AdjugateMatrix(A, mod);
    A = hill.multMatrixNumber(invElem, A, mod); // Функцию AdjugateMatrix см. выше
    return A;
  },

  checkKey: (key) => {
    return Number.isInteger(Math.sqrt(key.length));
  },
  strToMatrix: (value, key, language) => {
    let sizeKey = Math.sqrt(key.length);

    while (value.length % sizeKey != 0) value += ' ';
    let sizeValue = value.length;
    let arrValue = value.split('');
    let arrKey = key.split('');
    let arrNumberValue;
    let arrNumberKey;
    if (language) {
      arrNumberValue = arrValue.map((value, index) => {
        return arr_ru.indexOf(value.toLowerCase());
      });
      arrNumberKey = arrKey.map((value, index) => {
        return arr_ru.indexOf(value.toLowerCase());
      });
    } else {
      arrNumberValue = arrValue.map((value, index) => {
        return arr_en.indexOf(value.toLowerCase());
      });
      arrNumberKey = arrKey.map((value, index) => {
        return arr_en.indexOf(value.toLowerCase());
      });
    }
    let matrixValue = [];
    let matrixKey = [];

    for (let i = 0, k = -1; i < sizeValue; i++) {
      if (i % sizeKey === 0) {
        k++;
        matrixValue[k] = [];
      }

      matrixValue[k].push(arrNumberValue[i]);
    }
    for (let i = 0, k = -1; i < arrNumberKey.length; i++) {
      if (i % sizeKey === 0) {
        k++;
        matrixKey[k] = [];
      }
      matrixKey[k].push(arrNumberKey[i]);
    }

    return { matrixValue, matrixKey };
  },
  modMatrix: (matrix, number) => {
    let m = matrix.length,
      n = matrix[0].length,
      B = [];
    for (var i = 0; i < m; i++) {
      B[i] = [];
      for (var j = 0; j < n; j++) B[i][j] = matrix[i][j] % number;
    }
    return B;
    // matrix.map((value, index) => {
    //   if (value.isArray) {
    //     B[index] = [];
    //     value.map((val, ind) => {
    //       B[index][ind] = val % number;
    //     });
    //   } else {
    //     console.log(number);
    //     console.log(value);
    //     B[index] = value % number;
    //     console.log(B);
    //   }
    // });
    // return B;
  },
  matrixToString: (matrix, language) => {
    let m = matrix.length,
      n = matrix[0].length,
      B = '';
    for (var i = 0; i < m; i++) {
      for (var j = 0; j < n; j++)
        if (language) B += arr_ru[matrix[i][j]];
        else B += arr_en[matrix[i][j]];
    }
    return B;
  },
  coding: (value, key, language) => {
    if (hill.checkKey(key)) {
      let { matrixValue, matrixKey } = hill.strToMatrix(value, key, language);
      let resultStr;
      if (language) matrixValue = hill.modMatrix(hill.MultiplyMatrix(matrixValue, matrixKey), 37);
      else matrixValue = hill.modMatrix(hill.MultiplyMatrix(matrixValue, matrixKey), 29);
      resultStr = hill.matrixToString(matrixValue, language);
      console.log(matrixKey);
      console.log(resultStr);
      console.log(matrixValue);
      return resultStr;
    }
  },
  encoding: (value, key, language) => {
    if (hill.checkKey(key)) {
      let { matrixValue, matrixKey } = hill.strToMatrix(value, key, language);
      let resultStr;
      if (language) {
        matrixKey = hill.InverseMatrix(matrixKey, 37);
        matrixValue = hill.modMatrix(hill.MultiplyMatrix(matrixValue, matrixKey), 37);
      } else {
        matrixKey = hill.InverseMatrix(matrixKey, 29);
        matrixValue = hill.modMatrix(hill.MultiplyMatrix(matrixValue, matrixKey), 29);
      }
      resultStr = hill.matrixToString(matrixValue, language);

      console.log(resultStr);
      console.log(matrixValue);
      return resultStr;
    }
  },
};
export default hill;
