export const numWord = (value: number, [single, second, multi]: string[]) => {
  value = Math.abs(value) % 100
  const num = value % 10
  return `${num} ${num >= 1 && num < 5 ? num === 1 ? single : second : multi}`
}