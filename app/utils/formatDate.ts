// export const formatDate = (commenceTime: string): string => {
// 	const date = new Date(commenceTime)
// 	const now = new Date()

// 	if (
// 		date.getDate() === now.getDate() &&
// 		date.getMonth() === now.getMonth() &&
// 		date.getFullYear() === now.getFullYear()
// 	) {
// 		return `Today, ${date.toLocaleTimeString([], {
// 			hour: '2-digit',
// 			minute: '2-digit',
// 			hour12: false,
// 		})}`
// 	} else {
// 		const options: Intl.DateTimeFormatOptions = {
// 			day: 'numeric',
// 			month: 'long',
// 		}

// 		return `${date.toLocaleDateString(
// 			undefined,
// 			options
// 		)}, ${date.toLocaleTimeString([], {
// 			hour: '2-digit',
// 			minute: '2-digit',
// 			hour12: false,
// 		})}`
// 	}
// }

type FormattedDateType = {
	isToday: boolean
	dayOfWeek: string
	dayOfMonth: number
	month: string
	time: string
}

export const formatDate = (commenceTime: string): FormattedDateType => {
	const date = new Date(commenceTime)
	const now = new Date()

	const isToday =
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear()

	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
	}

	const formattedDate: FormattedDateType = {
		isToday,
		dayOfWeek: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
			date
		),
		dayOfMonth: date.getDate(),
		month: date.toLocaleDateString(undefined, { month: 'long' }),
		time: date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}),
	}

	return formattedDate
}
