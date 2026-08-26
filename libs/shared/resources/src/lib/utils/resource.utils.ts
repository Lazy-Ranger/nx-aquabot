type ResourcePathTemplate = Record<string, string> & {
  DEFAULT: string;
};

export function buildResourcePathTemplate<T extends ResourcePathTemplate>(
  pathTemplate: T,
  name: keyof T = "DEFAULT",
  mappingVars: string[] = [],
) {
  const template = pathTemplate[name];

  let mappingVarCounter = 0;

  return template
    .split("/")
    .reduce((acc: string[], path: string) => {
      if (path.startsWith("{")) {
        acc.push(mappingVars[mappingVarCounter++]);
      } else {
        acc.push(path);
      }

      return acc;
    }, [])
    .join("/");
}
