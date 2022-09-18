// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CURRENCY_URL } from "constants/env"
import { fetchWithFallback } from "lib/fallback-fetch"
import type { NextApiRequest, NextApiResponse } from "next"

const convertCurrency = async (req: NextApiRequest, res: NextApiResponse) => {
	const url = CURRENCY_URL || "currencies"
	const { from, to } = req.body
	const result = await fetchWithFallback(`${url}/${from}/${to}`)

	res.status(200).json({ date: result.date, amount: result[to] })
}

export default convertCurrency
