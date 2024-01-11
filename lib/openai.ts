import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: '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',
	dangerouslyAllowBrowser: true,
})

const generateText = async (first: string, second: string, date: string) => {
	const text = `Напиши анонс спортивного матча ${first} VS ${second} который состоится ${date} (Перевед команд и даты на русский, не больше 7 предложений)`

	const chatCompletion = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: text,
			},
		],
	})
	const result = chatCompletion.choices[0].message.content

	return result
}

export default generateText
