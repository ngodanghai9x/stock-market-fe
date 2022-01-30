export function hasUtilsClass(className: string | undefined, ...utilsPrefixes: string[]) {
  return utilsPrefixes.find((prefix) => className?.includes(prefix))
}