import dotenv from 'dotenv';

dotenv.config();
const mongoUserName = process.env.MONGO_USER;
const mongoPWD = process.env.MONGO_PWD;

export const connectionString= `mongodb+srv://${mongoUserName}:${mongoPWD}@cluster0.qtybgjl.mongodb.net/sake?retryWrites=true&w=majority&appName=Cluster0`