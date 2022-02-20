export interface QuestionsResponse {
	response_code: number;
	results: ResponseQuestion[];
}

export interface ResponseQuestion {
	category: string;
	type: string;
	difficulty: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

export interface FormattedQuestion {
	question: string;
	correct_answer: string;
	answers: string[];
}
