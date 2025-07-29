// Use a simple approach for colors without chalk to avoid ESM issues
const colors = {
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  dim: (text: string) => `\x1b[2m${text}\x1b[0m`,
};

export const logger = {
  info: (message: string) => {
    console.log(message);
  },

  success: (message: string) => {
    console.log(colors.green(message));
  },

  error: (message: string) => {
    console.error(colors.red(message));
  },

  warn: (message: string) => {
    console.warn(colors.yellow(message));
  },

  dim: (message: string) => {
    console.log(colors.dim(message));
  },
};
