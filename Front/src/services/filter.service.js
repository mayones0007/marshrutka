
export function filterService(array, filters) {
  let result = [...array];
  filters.forEach(appliedFilter => result = [...appliedFilter.filterFunc(result)])
  return result
}