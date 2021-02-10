export const skital = (strIn, rowCount) => {
  let str = '' + strIn;
  let colCount = Math.floor((str.length - 1) / rowCount) + 1;
  let arr = str.split('');
  str = '';
  function listToMatrix(list, elementsPerSubArray) {
    var matrix = [],
      i,
      k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    for (i = matrix.length - 1; i < rowCount; i++) {
      if (!matrix[i]) matrix[i] = [];
      for (let j = 0; j < colCount; j++) {
        if (!matrix[i][j]) matrix[i][j] = '*';
      }
    }
    return matrix;
  }
  let arrShifr = listToMatrix(arr, colCount);
  for (let i = 0; i < colCount; i++) {
    for (let j = 0; j < rowCount; j++) {
      str += arrShifr[j][i];
    }
  }
  return str;
};
export const deSkital = (strIn, rowCountDe) => {
  let rowCount = rowCountDe;
  let str = '' + strIn;
  let strLenFirst = str.length;
  let colCount = Math.floor((str.length - 1) / rowCount) + 1;
  let arr = str.split('');
  str = '';
  function listToMatrix(list, elementsPerSubArray) {
    var matrix = [],
      i,
      k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    for (i = matrix.length - 1; i < colCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        if (matrix[i][j] === '*') matrix[i][j] = '';
      }
    }
    return matrix;
  }
  let arrShifr = listToMatrix(arr, rowCount);
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      if (str.length !== strLenFirst) str += arrShifr[j][i];
    }
  }
  return str;
};
