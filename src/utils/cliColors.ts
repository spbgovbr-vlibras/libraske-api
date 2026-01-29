const wrap = (code: number) => (message: string) => `\u001b[${code}m${message}\u001b[0m`;

export const cliColors = {
  white: wrap(37),
  green: wrap(32),
  red: wrap(31),
  yellow: wrap(33),
};

export const colorize = (color: keyof typeof cliColors, message: string) => {
  return cliColors[color](message);
};

export default cliColors;
