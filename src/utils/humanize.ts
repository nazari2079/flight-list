export const humanize = (input: number | string) => {
  input = input.toString();
  input = input.replace(/[^-.\d]/g, "");
  input = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return input;
};
