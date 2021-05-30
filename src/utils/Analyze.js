const arr_ru = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const arr_en = 'abcdefghijklmnopqrstuvwxyz';
export const analyze = {
  Letter: {
    char: '',
    freq: 0,
  },
  countInStr: (str, lit, cis = false) => {
    var m = str.toString().match(new RegExp(lit, cis ? 'gi' : 'g'));
    return m != null ? m.length : 0;
  },
  strToArr: (str, size) => {
    str = str.replace(/[&\/\#,+()$~%.'":*?<>{} ]/g, '');

    console.log(str);
    let arrValue = str.split('');
    console.log(arrValue);
    let matrixValue = [];
    for (let i = 0, k = -1; i < arrValue.length; i++) {
      if (i % size === 0) {
        k++;
        matrixValue[k] = [];
      }

      matrixValue[k].push(arrValue[i]);
    }
    return matrixValue;
  },
  matrixInRow: (matrix, size) => {
    let matrixRows = [];
    for (let i = 0; i < size; i++) {
      matrixRows[i] = [];
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < size; j++) {
        matrixRows[j].push(matrix[i][j]);
      }
    }
    for (let i = 0; i < size; i++) {
      matrixRows[i] = matrixRows[i].join('');
      matrixRows[i] = matrixRows[i].replace(/[^а-яА-Я]/g, '');
    }
    return matrixRows;
  },
  freqMatrix: (matrixRows, language) => {
    let alphabet = '';
    let arrFreq = [];
    for (let i = 0; i < matrixRows.length; i++) {
      arrFreq[i] = [];
    }
    if (language) alphabet = arr_ru.split('');
    else alphabet = arr_en.split('');
    alphabet.map((value, index) => {
      for (let i = 0; i < matrixRows.length; i++) {
        let letter = {};
        letter.char = value;
        letter.freq = analyze.countInStr(matrixRows[i], value);
        arrFreq[i].push(letter);
      }
    });
    return arrFreq;
  },
  countIndex: (arrFreq, matrixRows) => {
    let arrIndex = [];

    for (let i = 0; i < matrixRows.length; i++) {
      let sum = 0;
      arrFreq[i].map((value, index) => {
        if (value.freq != 0) sum += value.freq * (value.freq - 1);
      });
      let index = sum / (matrixRows[i].length * (matrixRows[i].length - 1));

      arrIndex.push(index);
    }

    return arrIndex;
  },
  encoding: (str, language) => {
    let arrFreq;
    let arrIndexs = [];
    for (let i = 3; i < 10; i++) {
      arrFreq = analyze.freqMatrix(analyze.matrixInRow(analyze.strToArr(str, i), i), language);
      let arrIndex = analyze.countIndex(arrFreq, analyze.matrixInRow(analyze.strToArr(str, i), i));
      arrIndexs[i] = arrIndex;
    }
    console.log(arrIndexs);
    for (let i = 3; i < 10; i++) {
      let around = arrIndexs[i].reduce((a, b) => a + b) / arrIndexs[i].length;
      console.log(i + ' ' + around);
    }
    return arrFreq;
  },
};
export const kasizka = {
  getListIdx: (str, substr) => {
    let listIdx = [];
    let lastIndex = -1;
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
      listIdx.push(lastIndex);
    }
    return listIdx;
  },
  NOD: (arr) => {
    for (var x = arr[0], i = 1; i < arr.length; i++) {
      var y = arr[i];
      while (x && y) {
        x > y ? (x %= y) : (y %= x);
      }
      x += y;
    }
    return x;
  },
  distIndex: (listIdx) => {
    let arrDist = [];

    listIdx.map((value, index) => {
      if (index != listIdx.length - 1) arrDist.push(listIdx[index + 1] - value);
    });
    return arrDist;
  },
  mode: (numbers) => {
    var counterObj = {};
    var max = 0;
    var result = [];
    for (let num in numbers) {
      counterObj[numbers[num]] = (counterObj[numbers[num]] || 0) + 1;
      if (counterObj[numbers[num]] >= max) {
        max = counterObj[numbers[num]];
      }
    }
    for (let num in counterObj) {
      if (counterObj[num] == max) {
        result.push(parseInt(num));
      }
    }
    return result;
  },
  encoding: (str, sizeStr) => {
    let count = 0;
    let arrSubStr = [];
    let substr;
    let arrSubStrTmp = [];
    let arrNod = [];
    str = str.replace(/[&\/\#,+()$~%.'":*?<>{} ]/g, '');
    while (count < str.length - 3) {
      substr = str.slice(count, count + sizeStr);
      let strObj = {};

      if (kasizka.getListIdx(str, substr).length > 2 && arrSubStrTmp.indexOf(substr) == -1) {
        strObj.substr = substr;
        arrSubStrTmp.push(substr);
        strObj.listIdx = kasizka.getListIdx(str, substr);
        strObj.distIdx = kasizka.distIndex(strObj.listIdx);
        strObj.nod = kasizka.NOD(strObj.distIdx);
        if (kasizka.NOD(strObj.distIdx) != 1) arrNod.push(kasizka.NOD(strObj.distIdx));
        arrSubStr.push(strObj);
      }
      count++;
    }
    arrSubStr.map((value, index) => {
      if (value.nod != 1) console.log(value);
    });
    let maxNod = kasizka.mode(arrNod);
    console.log(maxNod);
    return arrSubStr;
  },
};
export const autoCorr = {
  shift: (str, shift) => {
    var ReturnString = str;

    for (var i = 0; i < shift; i++) {
      ReturnString =
        ReturnString.substr(ReturnString.length - 1) +
        ReturnString.substr(0, ReturnString.length - 1);
    }

    return ReturnString;
  },
  countMatch: (str, copyStr) => {
    let countMatch = 0;
    str = str.split('');
    copyStr = copyStr.split('');
    str.map((value, index) => {
      if (value == copyStr[index]) countMatch++;
    });
    return countMatch;
  },
  countIndex: (countMatch, str, shift) => {
    return countMatch / (str.length - shift);
  },
  encoding: (str) => {
    let arrIndex = [];
    str = str.replace(/[&\/\#,+()$~%.'":*?<>{} ]/g, '');
    for (let i = 1; i < str.length; i++) {
      let tmpIndex = {};
      tmpIndex.number = autoCorr.countIndex(
        autoCorr.countMatch(str, autoCorr.shift(str, i)),
        str,
        i,
      );
      tmpIndex.shift = i;
      arrIndex.push(tmpIndex);
    }
    let arrNumber = [];

    arrIndex.sort(function (a, b) {
      return b.number - a.number;
    });
    console.log(arrIndex);
  },
};
