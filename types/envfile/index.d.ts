declare module "envfile" {
  export function stringifySync(object: any): string;
  export function parseFileSync(path: string): object;
}
