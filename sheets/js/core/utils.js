export function capitalize(str) {
  if (typeof str !== 'string') return '';

  const formatedStr = str.charAt(0).toUpperCase() + str.slice(1);
  return formatedStr;
}