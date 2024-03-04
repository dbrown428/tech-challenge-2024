
/**
 * Style helper for joining classes together.
 */
export default function Style(values: string[]): string {
  return values.map(v => v.trim()).join(' ')
}
