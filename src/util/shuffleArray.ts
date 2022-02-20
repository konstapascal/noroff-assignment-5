export default function shuffleArray(arr: any[]) {
	return arr.sort(() => 0.5 - Math.random());
}
