import dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config();

const initOptions = {
	connect(e) {
		const { client } = e;
		console.log(
			'Connected to database:',
			client.connectionParameters.host,
			client.connectionParameters.port
		);
	},
	disconnect() {
		console.log('Disconnecting from database');
	}
};

const pgp = pgPromise(initOptions);
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

export { db };
