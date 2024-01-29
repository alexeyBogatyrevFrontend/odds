// odds
export type GamesInterface = {
	id: string
	sport_key: string
	sport_title: string
	commence_time: string
	home_team: string
	away_team: string
	bookmakers: Bookmaker[]
	gptText?: string
}

export type Bookmaker = {
	key: string
	title: string
	last_update: string
	markets: Market[]
}

export type Market = {
	key: string
	last_update: string
	outcomes: Outcome[]
}

export type Outcome = {
	name: string
	price: number
}

// news
export type newsType = {
	_id?: string
	h1: string
	title: string
	description: string
	textEditor: string
	isTop: boolean
	date: Date | null | string
	image: File | null
}

export type RootState = {
	news: {
		newsList: newsType[]
		status: string
		error: string
	}
}

export type sportState = {
	sport: {
		category: string
	}
}
