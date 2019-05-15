export function nonEmptyPredicate(str: string): boolean {
  return !!str && str.trim().length > 0;
}
