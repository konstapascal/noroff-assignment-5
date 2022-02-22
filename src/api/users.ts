import { User } from '../interfaces/users';

const TRIVIA_URL = 'https://kp-noroff-assignment-api.herokuapp.com/trivia';
const API_KEY = 'nNRCAFo9Vox8b1qW8PrEzOxPTUB4K56XGNn6gC41OpYPgcAdSPHfu4TbMk3mdZ7K';

export async function getUser(username: String): Promise<User | undefined> {
	const req = await fetch(`${TRIVIA_URL}?username=${username}`);
	if (!req.ok) throw new Error('Could not get user!');

	const usersArr: User[] = await req.json();
	const user: User | undefined = usersArr.pop();

	return user;
}

export async function getAllUsers(): Promise<User[] | undefined> {
	const req = await fetch(TRIVIA_URL);
	if (!req.ok) throw new Error('Could not get all users!');

	const usersArr: User[] = await req.json();

	return usersArr;
}

export async function postUser(username: string, score: number): Promise<User> {
	const req = await fetch(TRIVIA_URL, {
		method: 'POST',
		body: JSON.stringify({ username, score }),
		headers: {
			'X-Api-Key': API_KEY,
			'Content-Type': 'application/json'
		}
	});
	if (!req.ok) throw new Error('Could not post new user!');

	const createdUser = await req.json();

	return createdUser;
}

export async function patchUser(id: number, score: number): Promise<User> {
	const req = await fetch(`${TRIVIA_URL}/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({ score }),
		headers: {
			'X-Api-Key': API_KEY,
			'Content-Type': 'application/json'
		}
	});
	if (!req.ok) throw new Error('Could not patch user!');

	const patchedUser = await req.json();

	return patchedUser;
}
