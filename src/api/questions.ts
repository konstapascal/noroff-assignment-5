import axios from 'axios';
import { FormattedQuestion, QuestionsResponse } from '../interfaces/questions';
import formatQuestions from '../util/formatQuestions';

const QUESTIONS_URL =
	'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple';

export default async function getQuestions(): Promise<FormattedQuestion[]> {
	const req = await axios.get<QuestionsResponse>(QUESTIONS_URL);
	const data = req.data;

	const formattedQuestions = formatQuestions(data.results);

	return formattedQuestions;
}
