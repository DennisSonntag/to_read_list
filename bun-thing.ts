import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

pb.autoCancellation(false);

const readListFile = Bun.file("./ParsedReadList1.md");

const readList = (await readListFile.text()).trim();

type Book = {
	title: string;
	authors: string;
}

const books: Book[] = readList.split('\n').map((line: string) => ({ title: line.split(' | ')[0], authors: line.split(' | ')[1] }))


books.forEach(async book => {
	await pb.collection('BooksRaw').create(book);
})

