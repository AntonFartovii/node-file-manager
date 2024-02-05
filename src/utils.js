export function getFileName(filePath) {
  let str = filePath.replace(/\\/g, '/');
  return  str.split('/').at(-1);
}
