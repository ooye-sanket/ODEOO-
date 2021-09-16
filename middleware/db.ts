import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const db =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		connectDB()
			.then(async (connection) => {
				return await handler(req, res);
			})
			.catch((err) => {
				return res.status(500).send('Database is not working :(');
			});
	};

export const connectDB = () =>
	new Promise((resolve, reject) => {
		if (mongoose.connections[0].readyState) {
			// Use current db connection
			return resolve(mongoose.connections[0]);
		}
		// Use new db connection
		mongoose
			.connect(process.env.MONGO_URI as any, {
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
				useNewUrlParser: true,
			})
			.then((connection) => {
				console.log('🚀 Database Connected');
				return resolve(connection);
			})
			.catch((err) => {
				return reject(err);
			});
	});

export default db;
