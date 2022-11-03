import chalk from "chalk";

const colors = {
  system: chalk.red,
};

const log = console.log;

const systemLog = (text) => log(colors.system(text));

export { systemLog };
