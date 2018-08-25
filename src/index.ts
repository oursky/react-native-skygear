import * as program from "commander";

program
  .version("2.0.0")
  .description("Create React Native project with Skygear");

program.parse(process.argv);
if (program.args.length === 0) {
  console.error(
    "You didn't pass any command\nSee --help for a list of available commands."
  );
}
