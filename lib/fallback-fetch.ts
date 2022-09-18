import {
	BASE_URL,
	FALLBACK_URL,
	FILE_FORMAT_1,
	FILE_FORMAT_2,
} from "constants/env"

type ApiCurrency = {
	[key: string]: string
}
export const fetchWithFallback = async (url: string): Promise<ApiCurrency> => {
	const initialFetchResult = await fetch(`${BASE_URL}/${url}.${FILE_FORMAT_1}`)
	const fallbackFetchList = [
		fetch(`${BASE_URL}/${url}.${FILE_FORMAT_2}`),
		fetch(`${FALLBACK_URL}/${url}.${FILE_FORMAT_1}`),
		fetch(`${FALLBACK_URL}/${url}.${FILE_FORMAT_2}`),
	]

	const response = initialFetchResult.ok
		? initialFetchResult
		: await Promise.race(fallbackFetchList)

	const data = await response.json()
	return data
}
