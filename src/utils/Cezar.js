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
        let locCount = (count % engUp.length) + engUp.length;
        value = engUp[(engUp.indexOf(value) + locCount) % engUp.length];
      } else {
        value = engUp[(engUp.indexOf(value) + count) % engUp.length];
      }
    } else if (engDown.indexOf(value) !== -1) {
      if (count < 0) {
        let locCount = (count % engDown.length) + engDown.length;
        value = engDown[(engDown.indexOf(value) + locCount) % engDown.length];
      } else value = engDown[(engDown.indexOf(value) + count) % engDown.length];
    } else if (rusUp.indexOf(value) !== -1) {
      if (count < 0) {
        let locCount = (count % rusUp.length) + rusUp.length;
        value = rusUp[(rusUp.indexOf(value) + locCount) % rusUp.length];
      } else value = rusUp[(rusUp.indexOf(value) + count) % rusUp.length];
    } else if (rusDown.indexOf(value) !== -1) {
      if (count < 0) {
        let locCount = (count % rusDown.length) + rusDown.length;
        value = rusDown[(rusDown.indexOf(value) + locCount) % rusDown.length];
      } else {
        value = rusDown[(rusDown.indexOf(value) + count) % rusDown.length];
      }
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
    if (engUp.indexOf(value) !== -1) {
      if ((engUp.indexOf(value) - count) % engUp.length < 0) {
        value = engUp[((engUp.indexOf(value) - count) % engUp.length) + engUp.length];
      } else value = engUp[(engUp.indexOf(value) - count) % engUp.length];
    } else if (engDown.indexOf(value) !== -1) {
      if ((engDown.indexOf(value) - count) % engDown.length < 0) {
        value = engDown[((engDown.indexOf(value) - count) % engDown.length) + engDown.length];
      } else value = engDown[(engDown.indexOf(value) - count) % engDown.length];
    } else if (rusUp.indexOf(value) !== -1) {
      if ((rusUp.indexOf(value) - count) % rusUp.length < 0) {
        value = rusUp[((rusUp.indexOf(value) - count) % rusUp.length) + rusUp.length];
      } else value = rusUp[(rusUp.indexOf(value) - count) % rusUp.length];
    } else if (rusDown.indexOf(value) !== -1) {
      if ((rusDown.indexOf(value) - count) % rusDown.length < 0) {
        value = rusDown[((rusDown.indexOf(value) - count) % rusDown.length) + rusDown.length];
      } else value = rusDown[(rusDown.indexOf(value) - count) % rusDown.length];
    }
    str += value;
  });
  return str;
};
