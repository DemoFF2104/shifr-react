var engUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var engDown = 'abcdefghijklmnopqrstuvwxyz';
var rusUp = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
var rusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
export const cezarFunc = (strIn, count) => {
  let str = '' + strIn;
  let arr = str.split('');
  str = '';
  arr.map((value, index) => {
    if (engUp.indexOf(value) !== -1) {
      if (count < 0) {
        count = (count % engUp.length) + engUp.length;
      }
      value = engUp[(engUp.indexOf(value) + count) % engUp.length];
    } else if (engDown.indexOf(value) !== -1) {
      if (count < 0) {
        count = (count % engDown.length) + engDown.length;
      }
      value = engDown[(engDown.indexOf(value) + count) % engDown.length];
    } else if (rusUp.indexOf(value) !== -1) {
      if (count < 0) {
        count = (count % rusUp.length) + rusUp.length;
      }
      value = rusUp[(rusUp.indexOf(value) + count) % rusUp.length];
    } else if (rusDown.indexOf(value) !== -1) {
      if (count < 0) {
        count = (count % rusDown.length) + rusDown.length;
      }
      value = rusDown[(rusDown.indexOf(value) + count) % rusDown.length];
    }
    str += value;
  });
  return str;
};
export const deCezar = (strIn, count) => {
  let str = '' + strIn;
  let arr = str.split('');
  str = '';
  arr.map((value, index) => {
    if (engUp.indexOf(value) !== -1) value = engUp[(engUp.indexOf(value) - count) % engUp.length];
    else if (engDown.indexOf(value) !== -1)
      value = engDown[(engDown.indexOf(value) - count) % engDown.length];
    else if (rusUp.indexOf(value) !== -1) {
      value = rusUp[(rusUp.indexOf(value) - count) % rusUp.length];
    } else if (rusDown.indexOf(value) !== -1) {
      value = rusDown[(rusDown.indexOf(value) - count) % rusDown.length];
    }
    str += value;
  });
  return str;
};
