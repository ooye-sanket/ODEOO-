import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const connectDB =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		if (mongoose.connections[0].readyState) {
			// Use current db connection
			return await handler(req, res);
		}
		// Use new db connection
		try {
			const connection = await mongoose.connect(process.env.MONGO_URI as any, {
				useUnifiedTopology: true,
				// useFindAndModify: false,
				useCreateIndex: true,
				useNewUrlParser: true,
			});
			if (connection) {
				console.log('🚀 Database Connected');
				return await handler(req, res);
			}
		} catch (err) {
			console.error('DB Error:', err);
			return res.status(500).send('Database is not working :(');
		}
	};

export default connectDB;
