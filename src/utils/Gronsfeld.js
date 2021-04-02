var engUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var engDown = 'abcdefghijklmnopqrstuvwxyz';
var rusUp = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
var rusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
export const shifr = (strIn, keyIn, mode) => {
  let str = '' + strIn;
  let key = '' + keyIn;
  let arr = str.split('');
  let arrKey = key.split('');
  str = '';
  arr.map((value, index) => {
    console.log(keyIn);
    console.log(key);
    let KeyCh = arrKey[index >= arrKey.length ? index % arrKey.length : index];

    //вычитание при дешифровании, либо сложение.
    let ki;
    ki = parseInt(KeyCh);
    ki = typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1 ? -ki : ki;

    if (engUp.indexOf(value) !== -1) {
      value = engUp[(engUp.length + ki + engUp.indexOf(value)) % engUp.length];
    } else if (engDown.indexOf(value) !== -1)
      value = engDown[(engDown.length + ki + engDown.indexOf(value)) % engDown.length];
    else if (rusUp.indexOf(value) !== -1) {
      value = rusUp[(rusUp.length + ki + rusUp.indexOf(value)) % rusUp.length];
    } else if (rusDown.indexOf(value) !== -1) {
      value = rusDown[(rusDown.length + ki + rusDown.indexOf(value)) % rusDown.length];
    }
    str += value;
  });
  return str;
};
