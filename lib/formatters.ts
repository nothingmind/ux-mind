export const convertToArray = (text: string | undefined) => {
  if (text === undefined) return [];
  return text.split(',').map((value) => value.trim());
};
