var engUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var engDown = 'abcdefghijklmnopqrstuvwxyz';
var rusUp = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
var rusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
var newEngUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var newEngDown = 'abcdefghijklmnopqrstuvwxyz';
var newRusUp = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
var newRusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
export const shifr = (strIn, keyIn, keyAIn, mode) => {
  let str = '' + strIn;
  let key = '' + keyIn;
  let keyA = '' + keyAIn.toLowerCase();
  let arr = str.split('');
  let arrKey = key.split('');
  let arrKeyA = keyA.split('');
  str = '';
  let lang = true;
  arrKeyA = arrKeyA.filter((item, index) => {
    return arrKeyA.indexOf(item) === index;
  });
  keyA = arrKeyA.join('');
  arrKeyA.map((value, index) => {
    if (newEngDown.indexOf(value) !== -1) {
      let newEngDownArr = newEngDown.split('');
      newEngDownArr.splice(newEngDownArr.indexOf(value), 1);
      newEngDown = newEngDownArr.join('');
      lang = true;
    }
    if (newRusDown.indexOf(value) !== -1) {
      let newRusDownArr = newRusDown.split('');

      newRusDownArr.splice(newRusDownArr.indexOf(value), 1);
      newRusDown = newRusDownArr.join('');
      lang = false;
    }
  });
  if (lang) {
    newEngDown = keyA + newEngDown;
    newEngUp = newEngDown.toUpperCase();
  } else {
    newRusDown = keyA + newRusDown;
    newRusUp = newRusUp.toUpperCase();
  }
  console.log(arr);
  arr.map((value, index) => {
    let KeyCh = arrKey[index >= arrKey.length ? index % arrKey.length : index];

    //вычитание при дешифровании, либо сложение.
    let ch;
    let ki;
    if (engUp.indexOf(KeyCh) !== -1) {
      ki = engUp.indexOf(KeyCh);
      ki = typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1 ? -ki : ki;
    } else if (engDown.indexOf(KeyCh) !== -1) {
      ki = engDown.indexOf(KeyCh);
      ki = typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1 ? -ki : ki;
    } else if (rusUp.indexOf(KeyCh) !== -1) {
      ki = rusUp.indexOf(KeyCh);
      ki = typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1 ? -ki : ki;
    } else if (rusDown.indexOf(KeyCh) !== -1) {
      ki = rusDown.indexOf(KeyCh);
      ki = typeof mode !== 'undefined' && mode.indexOf('decrypt') !== -1 ? -ki : ki;
    }
    console.log(ki);
    if (mode !== 'undefined' && mode.indexOf('encrypt') !== -1) {
      if (engUp.indexOf(value) !== -1) {
        value = newEngUp[(engUp.length - ki + engUp.indexOf(value)) % engUp.length];
      } else if (engDown.indexOf(value) !== -1) {
        value = newEngDown[(engDown.length - ki + engDown.indexOf(value)) % engDown.length];
      } else if (rusUp.indexOf(value) !== -1) {
        value = newRusUp[(rusUp.length - ki + rusUp.indexOf(value)) % rusUp.length];
      } else if (rusDown.indexOf(value) !== -1) {
        value = newRusDown[(rusDown.length - ki + rusDown.indexOf(value)) % rusDown.length];
      }
      str += value;
    } else if (mode !== 'undefined' && mode.indexOf('decrypt') !== -1) {
      if (engUp.indexOf(value) !== -1) {
        value = engUp[(engUp.length - ki + newEngUp.indexOf(value)) % engUp.length];
      } else if (engDown.indexOf(value) !== -1) {
        value = engDown[(engDown.length - ki + newEngDown.indexOf(value)) % engDown.length];
      } else if (rusUp.indexOf(value) !== -1) {
        value = rusUp[(rusUp.length - ki + newRusUp.indexOf(value)) % rusUp.length];
      } else if (rusDown.indexOf(value) !== -1) {
        value = rusDown[(rusDown.length - ki + newRusDown.indexOf(value)) % rusDown.length];
      }
      str += value;
    }
  });
  return str;
};
