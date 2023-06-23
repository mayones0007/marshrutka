export const numWord = (value, [single, second, multi]) => {
  value = Math.abs(value) % 100
  const num = value % 10
  return num >= 1 && num < 5 ? num === 1 ? single : second : multi
}