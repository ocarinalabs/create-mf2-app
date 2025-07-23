import chalk from 'chalk';

export const logger = {
  info: (message: string) => {
    console.log(message);
  },
  
  success: (message: string) => {
    console.log(chalk.green(message));
  },
  
  error: (message: string) => {
    console.error(chalk.red(message));
  },
  
  warn: (message: string) => {
    console.warn(chalk.yellow(message));
  },
  
  dim: (message: string) => {
    console.log(chalk.dim(message));
  }
};