import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from '../../../lib/runMiddleware';
import connectDB from '../../../middleware/connectDB';
import cors from '../../../middleware/cors';
import { UserSeed } from '../../../seeders';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	switch (req.method) {
		case 'GET':
			if (req.query.entity == 'user') {
				const r = await UserSeed();

				return res.status(200).json({ r });
			}
			res.end('Request Invalid');
			break;
		default:
			res.status(405).end(); //Method Not Allowed
			break;
	}
};

export default connectDB(handler);
