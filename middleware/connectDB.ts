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
		await mongoose
			.connect(process.env.MONGO_URI as any, {
				useUnifiedTopology: true,
				// useFindAndModify: false,
				useCreateIndex: true,
				useNewUrlParser: true,
			})
			.then(() => console.log('🚀 Database Connected'))
			.catch((err) => {
				console.error(err);
				return res.status(500).send('Database is not working :(');
			});
		return await handler(req, res);
	};

export default connectDB;
