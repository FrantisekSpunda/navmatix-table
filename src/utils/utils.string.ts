/**
 * Join all STRING params into one string.
 * @example cn('w-full h-10 mx-2', height && 'my-2')
 * @param classes - strings
 * @returns string
 */
export function cn(...classes: any[]): string {
	const strings: string[] = classes.filter((item) => typeof item === 'string');

	return strings.join(' ').trim();
}
