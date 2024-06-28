import * as mongoDB from 'mongodb';
export class DataLoaderFromAPIToMongoDB {
	db: mongoDB.Db;
	collection: mongoDB.Collection;
	url: string;

	constructor(db: mongoDB.Db, collectionName: string, url: string) {
		this.db = db;
		this.collection = this.db.collection(collectionName);
		this.url = url;
	}

	async fetch_url() {
		try {
			const response = await fetch(this.url);
			return response.json();
		} catch (e) {
			console.log(`Fetching API failed: ${e}`);
		}
	}

	// insert_data() {

	// }
}
