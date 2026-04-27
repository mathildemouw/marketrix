export const COLORS = [
  '#4f8ef7', '#f76f4f', '#4ff79e', '#f7d94f', '#c44ff7',
  '#4ff7f0', '#f74fa8', '#a8f74f', '#f7a84f', '#4f4ff7',
];

export const getColor = (index) => COLORS[index % COLORS.length];
