const vernam = {
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
  setCheckText: (item) => {
    if (item.length < 12) {
      while (item.length !== 12) {
        item = '0' + item;
      }
    }

    return item;
  },
  toBinary: (element) => {
    return '0' + element.charCodeAt(0).toString(2);
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
  coding: (text, key) => {
    let binaryMatrixText = [];
    let binaryMatrixKey = [];
    let newBinaryMatrixText = [];
    let newBinaryMatrixKey = [];
    let codingArrayText = [];
    let codingArrayDecimalText = [];

    key = vernam.setCheckKey(text, key);

    text.split('').forEach((element) => {
      binaryMatrixText.push(vernam.toBinary(element));
    });

    binaryMatrixText.forEach((item) => {
      newBinaryMatrixText.push(vernam.setCheckText(item));
    });

    console.log('Бинарный массив текста:');
    console.log(newBinaryMatrixText);

    key.split('').forEach((element) => {
      binaryMatrixKey.push(vernam.toBinary(element));
    });

    binaryMatrixKey.forEach((item) => {
      newBinaryMatrixKey.push(vernam.setCheckText(item));
    });

    console.log('Бинарный массив ключа:');
    console.log(newBinaryMatrixKey);

    newBinaryMatrixText.forEach((element, index) => {
      let item = vernam.checkBinary(element, newBinaryMatrixKey[index]);

      codingArrayText.push(item);
    });

    console.log('Полученный бинарный массив:');
    console.log(codingArrayText);

    codingArrayText.forEach((element) => {
      console.log(parseInt(vernam.toDecimal(element)));
      let item = String.fromCharCode(parseInt(vernam.toDecimal(element)));
      console.log(item);
      codingArrayDecimalText.push(item);
    });

    console.log('Переведенный бинарный массив в нормальный вид:');
    console.log(codingArrayDecimalText);

    return codingArrayDecimalText.join('');
  },
};

export default vernam;
