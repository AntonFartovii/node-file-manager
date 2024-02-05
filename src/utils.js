export function getFileName(filePath) {
  let str = filePath.replace(/\\/g, '/');
  return  str.split('/').at(-1);
}

export function parseArgs(str) {
  let acc = [];
  str = str.trim();

  function arg (str) {
    if (str !== '') {
      let condition = " ";
      let k = 0;
      if (str[0] === `'` || str[0] === `"`) {
        condition = str[0];
        k = 1;
      }

      for (let i = k; i < str.length; i++) {
        if (str[i] === condition) {
          acc.push(str.slice(k, i));
          if (i + k < str.length) {
            arg(str.slice(i + 1, str.length).trim());
          }
          return;
        }
      }
      acc.push(str.slice(0, str.length));
      return;
    }
    acc.push('');
  }
  arg(str);
  return acc;
}
