// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CURRENCY_URL } from "constants/env"
import { currencies } from "currencies.json"
import countries from "data/countries"
import { fetchWithFallback } from "lib/fallback-fetch"
import type { NextApiRequest, NextApiResponse } from "next"

const getCurrenciesList = async (_: NextApiRequest, res: NextApiResponse) => {
	const url = CURRENCY_URL || "currencies"
	const result = await fetchWithFallback(url)

	const legalTenders = currencies.filter((currency) => {
		const currencyCode = currency.code.toLocaleLowerCase()
		const isCurrencyExists = Object.keys(result).includes(currencyCode)
		const isCountryCurrency = !!countries.find(
			(country) => country.code === currencyCode.slice(0, 2)
		)
		return isCurrencyExists && isCountryCurrency
	})

	res.status(200).json({ currencies: legalTenders })
}

export default getCurrenciesList
