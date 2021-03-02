let RuSqUp = [
  ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
  ['Ё', 'Ж', 'З', 'И', 'Й', 'К'],
  ['Л', 'М', 'Н', 'О', 'П', 'Р'],
  ['С', 'Т', 'У', 'Ф', 'Х', 'Ц'],
  ['Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь'],
  ['Э', 'Ю', 'Я', '+', '-', '*'],
];
let RuSqDown = [
  ['а', 'б', 'в', 'г', 'д', 'е'],
  ['ё', 'ж', 'з', 'и', 'й', 'к'],
  ['л', 'м', 'н', 'о', 'п', 'р'],
  ['с', 'т', 'у', 'ф', 'х', 'ц'],
  ['ч', 'ш', 'щ', 'ъ', 'ы', 'ь'],
  ['э', 'ю', 'я', '+', '-', '*'],
];
let EnSqUp = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z'],
];
let EnSqDown = [
  ['a', 'b', 'c', 'd', 'e'],
  ['f', 'g', 'h', 'i', 'k'],
  ['l', 'm', 'n', 'o', 'p'],
  ['q', 'r', 's', 't', 'u'],
  ['v', 'w', 'x', 'y', 'z'],
];
let NumberMark = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', ',', '.', '_', '\n'];

export const PolybiusFunc = (strIn) => {
  let strShifr = '';
  let str = '' + strIn;
  let indChar = [];
  let indSpace = [];
  str = str.replace(/j/gi, 'i');
  str = str.replace(/J/gi, 'I');
  let arr = str.split('');
  console.log(str);
  arr = str.split('');
  str = '';
  let vertical = [];
  let horizontal = [];

  let lang = true;
  arr.map((value, ind) => {
    RuSqUp.map((val, index) => {
      if (val.includes(value)) {
        vertical.push(val.indexOf(value));
        horizontal.push(index);
        indChar.push({ registr: 'up', language: 'ru', ind: ind, symbol: '' });
        // indChar[ind].language = 'ru';
        // indChar[ind].ind = ind;
        // indChar[ind].symbol = false;
      }
    });
    RuSqDown.map((val, index) => {
      if (val.includes(value)) {
        vertical.push(val.indexOf(value));
        horizontal.push(index);
        indChar.push({ registr: 'down', language: 'ru', ind: ind, symbol: '' });
      }
    });

    EnSqUp.map((val, index) => {
      if (val.includes(value)) {
        vertical.push(val.indexOf(value));
        horizontal.push(index);
        indChar.push({ registr: 'up', language: 'en', ind: ind, symbol: '' });

        lang = false;
      }
    });
    EnSqDown.map((val, index) => {
      if (val.includes(value)) {
        vertical.push(val.indexOf(value));
        horizontal.push(index);
        indChar.push({ registr: 'down', language: 'en', ind: ind, symbol: '' });
        lang = false;
      }
    });
    if (NumberMark.includes(value)) {
      indChar.push({ registr: '', language: '', ind: ind, symbol: value });
      indSpace[ind] = value;
      console.log(value);
    }
  });

  let coor = vertical.concat(horizontal);
  console.log(coor);
  let j = 0;
  for (let i = 0; i < indChar.length; i++) {
    console.log(indChar[i]);
    let vert = parseInt(coor[j]);
    let gor = parseInt(coor[j + 1]);
    if (indChar[i].language === 'ru') {
      if (indChar[i].registr === 'up') {
        strShifr += RuSqUp[gor][vert];
        j = j + 2;
      } else {
        strShifr += RuSqDown[gor][vert];
        j = j + 2;
      }
    } else if (indChar[i].language === 'en') {
      if (indChar[i].registr === 'up') {
        console.log(j);
        strShifr += EnSqUp[gor][vert];
        j = j + 2;
      } else {
        console.log(j);
        strShifr += EnSqDown[gor][vert];
        j = j + 2;
      }
    } else if (indChar[i].language === '') {
      strShifr += indChar[i].symbol;
    }
  }
  // for (let i = 0; i < coor.length; ) {
  //   let vert = parseInt(coor[i]);
  //   let gor = parseInt(coor[i + 1]);

  //   if (lang) {
  //     if (indSpace[strShifr.length]) strShifr += indSpace[strShifr.length];
  //     else {
  //       strShifr += RuSqDown[gor][vert];
  //       i = i + 2;
  //     }
  //   } else {
  //     if (indSpace[strShifr.length]) strShifr += indSpace[strShifr.length];
  //     else {
  //       console.log(gor);
  //       console.log(vert);

  //       strShifr += EnSqDown[gor][vert];
  //       i = i + 2;
  //     }
  //   }
  // }
  // for (let i = strShifr.length; i < indSpace.length; i++) {
  //   if (indSpace[i]) {
  //     let g = indSpace[i];
  //     strShifr += g;
  //   }
  // }
  console.log(strShifr);
  return [strShifr, indSpace, indChar];
};
export const dePolybius = (strIn, indSpace, indChar) => {
  console.log(indSpace);
  console.log(strIn);
  let strShifr = '';
  let str = '' + strIn;
  let arr = str.split('');
  str = '';
  let vertical = [];
  let horizontal = [];
  let lang = true;
  arr.map((value, ind) => {
    // RuSqUp.map((val, index) => {
    //   if (val.includes(value)) {
    //     vertical.push(val.indexOf(value));
    //     horizontal.push(index);
    //   }
    // });
    RuSqDown.map((val, index) => {
      if (val.includes(value.toLowerCase())) {
        vertical.push(val.indexOf(value.toLowerCase()));
        horizontal.push(index);
      }
    });

    EnSqUp.map((val, index) => {
      if (val.includes(value)) {
        vertical.push(val.indexOf(value));
        horizontal.push(index);

        lang = false;
      }
    });
    EnSqDown.map((val, index) => {
      if (val.includes(value)) {
        vertical.push(val.indexOf(value));
        horizontal.push(index);

        lang = false;
      }
    });
    if (NumberMark.includes(value)) {
      indSpace[ind] = value;
    }
  });
  let coor = [];

  for (let i = 0; i < vertical.length; i++) {
    coor.push(vertical[i]);
    coor.push(horizontal[i]);
  }

  vertical = coor.slice(0, coor.length / 2);
  horizontal = coor.slice(coor.length / 2);
  console.log(vertical);
  console.log(horizontal);
  console.log(indChar.length);
  console.log(indChar);
  let j = 0;
  if (indChar.length != 0) {
    for (let i = 0; i < indChar.length; i++) {
      console.log(indChar[i]);
      if (indChar[i].language === 'ru') {
        if (indChar[i].registr === 'up') {
          strShifr += RuSqUp[horizontal[j]][vertical[j]];
          j++;
        } else {
          strShifr += RuSqDown[horizontal[j]][vertical[j]];
          j++;
        }
      } else if (indChar[i].language === 'en') {
        if (indChar[i].registr === 'up') {
          console.log(j);
          strShifr += EnSqUp[horizontal[j]][vertical[j]];
          j = j + 1;
        } else {
          console.log(j);
          strShifr += EnSqDown[horizontal[j]][vertical[j]];
          j = j + 1;
        }
      } else if (indChar[i].language === '') {
        strShifr += indChar[i].symbol;
      }
    }
  } else {
    for (let i = 0; i < vertical.length; )
      if (lang) {
        if (indSpace[strShifr.length]) strShifr += indSpace[strShifr.length];
        else {
          strShifr += RuSqDown[horizontal[i]][vertical[i]];
          i++;
        }
      } else {
        if (indSpace[strShifr.length]) {
          strShifr += indSpace[strShifr.length];
        } else {
          strShifr += EnSqDown[horizontal[i]][vertical[i]];
          i++;
        }
      }
  }
  // for (let i = strShifr.length; i < indSpace.length; i++) {
  //   if (indSpace[i]) {
  //     let g = indSpace[i];
  //     strShifr += g;
  //   }
  // }
  return strShifr;
};
