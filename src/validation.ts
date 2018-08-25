export function validateProjectName(projectName: string): boolean {
  return projectName.match(/^[$A-Z_][0-9A-Z_$]*$/i) !== null;
}
