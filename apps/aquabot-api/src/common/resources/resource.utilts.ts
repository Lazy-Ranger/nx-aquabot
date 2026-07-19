export function buildResourcePathTemplate(pathTemplate, name, mappingVars) {
  const template = pathTemplate[name];

  let mappingVarCounter = 0;

  return template
    .split("/")
    .reduce((acc, path) => {
      if (path.startsWith("{")) {
        acc.push(mappingVars[mappingVarCounter++]);
      } else {
        acc.push(path);
      }

      return acc;
    }, [])
    .join("/");
}
