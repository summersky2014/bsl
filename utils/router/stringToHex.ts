export default function stringToHex(str: string): string {
  const arr = [];
  const encode = encodeURIComponent(str);

  for (let i = 0; i < encode.length; i++) {
    arr[i] = (encode.charCodeAt(i).toString(16)).slice(-4);
  }

  return arr.join('');
}