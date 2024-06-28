import * as mongoDB from 'mongodb';
import dotenv from 'dotenv';

export async function connectToDatabase(dbName: string) {
	try {
		dotenv.config();

		const mongoUserName = process.env.MONGO_USER;
		const mongoPWD = process.env.MONGO_PWD;
		const connectionString = `mongodb+srv://${mongoUserName}:${mongoPWD}@cluster0.qtybgjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
		const client: mongoDB.MongoClient = new mongoDB.MongoClient(
			connectionString
		);
		// Connect to the MongoDB cluster
		await client.connect();
		console.log('Connected successfully to MongoDB');

		// Select the database through the connection
		const db: mongoDB.Db = client.db(dbName);

		return db;
	} catch (error) {
		console.error('Could not connect to database:', error);
		throw error;
	}
}
