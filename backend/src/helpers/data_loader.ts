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

	async insert_data(itemName: string) {
		try {
			const response = await this.fetch_url();
			const data = response[itemName]

			// Ensure data is an array
			const itemsToInsert = Array.isArray(data) ? data : [data];

			// Insert data into the collection
			const insertResult = await this.collection.insertMany(itemsToInsert);
			console.log(`Successfully inserted ${insertResult.insertedCount} items.`);
		} catch (e) {
			console.error(`Inserting data failed: ${e}`);
		}
	}
}
