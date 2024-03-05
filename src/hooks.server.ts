import Pocketbase from "pocketbase"

export const handle = async ({ event, resolve }) => {
	event.locals.pb = new Pocketbase('http://localhost:8090')

	const response = await resolve(event)

	return response
}
