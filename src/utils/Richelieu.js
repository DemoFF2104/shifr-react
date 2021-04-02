var engUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var engDown = 'abcdefghijklmnopqrstuvwxyz';
var rusUp = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
var rusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
var engUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var engDown = 'abcdefghijklmnopqrstuvwxyz';
var rusUp = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
var rusDown = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
export const keyCheck = (strIn, keyIn) => {
  let str = '' + strIn;
  let key = '' + keyIn;
  let keyArr = key.split(' ');
  let keyArr2 = [];
  let check = true;
  let check2 = false;
  let count = 0;
  let count2 = 0;
  console.log(keyIn);
  console.log(key);
  console.log(keyArr);
  keyArr.map((value, index) => {
    let arr = value.toString().split(',');
    keyArr2[index] = arr;
  });
  keyArr = keyArr2;
  keyArr.map((value, index) => {
    count += value.length;
  });
  if (count <= str.length) check2 = true;
  keyArr.map((value, index) => {
    if (value.length === 1 && value < str.length) check = true;
    else if (value.length > 1) {
      count2 = 0;
      value.map((val, index) => {
        console.log(value);
        console.log((index + 1).toString());
        if (value.includes((index + 1).toString())) {
          count2++;
        }
      });
      console.log(count2);
      if (count2 == value.length) check = true;
      else check = false;
    } else {
      check = false;
      return false;
    }
  });
  console.log(count2);
  console.log(check);
  console.log(check2);
  if (check && check2) return true;
  else return false;
};
export const shifr = (strIn, keyIn) => {
  let key = '' + keyIn;
  let keyArr = key.split(' ');
  let keyArr2 = [];
  keyArr.map((value, index) => {
    let arr = value.toString().split(',');
    keyArr2[index] = arr;
  });
  keyArr = keyArr2;
  let str = '' + strIn;
  let arr = str.split('');
  str = '';
  let startInd = 0;
  keyArr.map((value, index) => {
    let tempStr = arr.slice(startInd, startInd + value.length);
    let tempStr2 = tempStr.slice();
    value.map((val, ind) => {
      tempStr2[ind] = tempStr[val - 1];
    });

    for (let i = startInd; i < startInd + value.length; i++) {
      arr[i] = tempStr2[i - startInd];
    }

    startInd += value.length;
  });
  str = arr.join('');

  return str;
};
