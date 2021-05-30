const gamm = {
  setCheckKey: (text, key) => {
    if (key.length < text.length) {
      while (key.length < text.length) {
        key = key + key;
      }
    }

    if (key.length > text.length) {
      let newKey = key;
      const countSymbol = key.length - text.length;

      key = newKey.substring(0, newKey.length - countSymbol);
    }

    return key;
  },
  checkKey: (key) => {
    if (key > 0 && key < 6075) return true;
    else return false;
  },
  setCheckText: (item) => {
    if (item.length < 12) {
      while (item.length !== 12) {
        item = '0' + item;
      }
    }

    return item;
  },
  toBinary: (element) => {
    return '0' + element.toString(2);
  },
  toDecimal: (element) => {
    let number = null;

    element
      .split('')
      .reverse()
      .forEach((item, index) => {
        number += parseInt(item) * Math.pow(2, index);
      });

    return number;
  },
  checkBinary: (binaryElementText, binaryElementKey) => {
    let newBinaryText = '';

    binaryElementText.split('').forEach((item, index) => {
      newBinaryText += item === binaryElementKey[index] ? '0' : '1';
    });

    return newBinaryText;
  },
  generator: (start) => {
    return ((start * 106 + 1283) % 6075) % 256;
  },

  coding: (arrBuf, key) => {
    let binaryMatrixText = [];
    let binaryMatrixKey = [];
    let newBinaryMatrixText = [];
    let newBinaryMatrixKey = [];
    let codingArrayDecimal = [];
    let codingArrayDecimalText = [];
    arrBuf.map((value, index) => {
      if (index === 0) newBinaryMatrixKey.push(gamm.generator(key));
      else newBinaryMatrixKey.push(gamm.generator(newBinaryMatrixKey[index - 1]));
      codingArrayDecimalText.push(
        String.fromCharCode(
          parseInt(
            gamm.toDecimal(
              gamm.checkBinary(
                gamm.setCheckText(gamm.toBinary(value)),
                gamm.setCheckText(gamm.toBinary(newBinaryMatrixKey[index])),
              ),
            ),
          ),
        ),
      );
      codingArrayDecimal.push(
        gamm.toDecimal(
          gamm.checkBinary(
            gamm.setCheckText(gamm.toBinary(value)),
            gamm.setCheckText(gamm.toBinary(newBinaryMatrixKey[index])),
          ),
        ),
      );
    });
    console.log(codingArrayDecimalText);
    codingArrayDecimalText = codingArrayDecimalText.join('');
    console.log(codingArrayDecimalText);
    return { newArrBuf: codingArrayDecimal, newArrText: codingArrayDecimalText };
  },
};

export default gamm;
