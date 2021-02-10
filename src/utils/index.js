var engUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var engDown = 'abcdefghijklmnopqrstuvwxyz';
var rusUp = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
var rusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
export const shifr = (strIn) => {
  let str = '' + strIn;
  let arr = str.split('');
  str = '';
  arr.map((value, index) => {
    if (engUp.indexOf(value) !== -1) value = engUp[engUp.length - engUp.indexOf(value) - 1];
    else if (engDown.indexOf(value) !== -1)
      value = engDown[engDown.length - engDown.indexOf(value) - 1];
    else if (rusUp.indexOf(value) !== -1) {
      value = rusUp[rusUp.length - rusUp.indexOf(value) - 1];
    } else if (rusDown.indexOf(value) !== -1) {
      value = rusDown[rusDown.length - rusDown.indexOf(value) - 1];
    }
    str += value;
  });
  return str;
};
