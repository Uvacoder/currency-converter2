import axios from "axios"
import { SITE_URL } from "constants/env"

export const apiFetch = async () => {
	const controller = new AbortController()
	const request = axios.create({
		baseURL: `${SITE_URL}/api/`,
		signal: controller.signal,
	})

	return { request, controller }
}
