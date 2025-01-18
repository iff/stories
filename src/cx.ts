export function cx(...xs: Array<string | boolean | null | undefined>): string {
  return [...xs].filter(Boolean).join(" ");
}
