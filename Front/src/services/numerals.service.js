export const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return value + " " + words[2];
  if (num > 1 && num < 5) return value + " " + words[1];
  if (num == 1) return value +" "+ words[0];
  return value + " " + words[2];
}