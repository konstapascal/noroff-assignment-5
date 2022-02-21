export default function decodeHtmlEntities(str: string) {
	let parser = new DOMParser().parseFromString(str, 'text/html');
	return parser.documentElement.textContent;
}
