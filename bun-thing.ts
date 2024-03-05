import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

pb.autoCancellation(false);


const readListFile = Bun.file("./ParsedReadListPart1.json"); // relative to cwd

const contents = JSON.parse(await readListFile.text()) as any[]

contents.forEach(async book => {
	const data = {
		"title": book.title,
		"authors": book.authors ? book.authors : ""
	};

	await pb.collection('BooksRaw').create(data);

})


