import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	// you can also fetch all records at once via getFullList
	const records = await locals.pb.collection('BooksRaw').getFullList({
		sort: '-created',
	});

	const indexOld = await locals.pb.collection('Other').getOne('i6r8f71fgtpzudb', {
		expand: 'relField1,relField2.subRelField',
	});

	return {
		records,
		indexOld: indexOld.index
	}

}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const { volumeInfo } = JSON.parse(formData.get("json")?.toString()!);

		const data = {
			"title": volumeInfo.title,
			"author": volumeInfo.authors.join(","),
			"pageCount": volumeInfo.pageCount,
			"cover": volumeInfo.imageLinks.thumbnail,
			"categories": volumeInfo.categories.join(","),
			"description": volumeInfo.description,
			"isbn": volumeInfo.industryIdentifiers.find(x => x.type === "ISBN_10").identifier,
		};

		await locals.pb.collection('Books').create(data);

		const indexOld = await locals.pb.collection('Other').getOne('i6r8f71fgtpzudb', {
			expand: 'relField1,relField2.subRelField',
		});

		await locals.pb.collection('Other').update('i6r8f71fgtpzudb', {
			"index": indexOld.index + 1
		});
	}
}
