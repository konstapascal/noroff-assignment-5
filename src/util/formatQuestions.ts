import { FormattedQuestion, Question } from '../interfaces/questions';
import shuffleArray from './shuffleArray';

export default function formatQuestions(questionsArr: Question[]): FormattedQuestion[] {
	return questionsArr.map(question => ({
		question: question.question,
		correct_answer: question.correct_answer,
		answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
	}));
}
