import { CommanderStatic } from "commander";

export function registerCommand(program: CommanderStatic) {
  program.command("help").action(() => {
    program.help();
  });
}
