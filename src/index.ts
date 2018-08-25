import * as program from "commander";

import { registerCommand as registerInitCommand } from "./commands/init";
import { registerCommand as registerHelpCommand } from "./commands/help";

program
  .version("2.0.0")
  .description("Create React Native project with Skygear");

registerInitCommand(program);
registerHelpCommand(program);

program.on("command:*", () => {
  console.error("Invalid command: %s", program.args.join(" "));
  program.help();
});

program.parse(process.argv);
if (program.args.length === 0) {
  console.error(
    "You didn't pass any command\nSee --help for a list of available commands."
  );
}
