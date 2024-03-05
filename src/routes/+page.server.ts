import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	// you can also fetch all records at once via getFullList
	const records = await locals.pb.collection('BooksRaw').getFullList({
		sort: '-created',
	});

	return {
		records
	}

}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const bookJson = JSON.parse(formData.get("json")?.toString()!);
		console.log(bookJson);
	}
}
