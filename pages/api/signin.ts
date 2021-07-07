import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from '../../lib/runMiddleware';
import connectDB from '../../middleware/connectDB';
import cors from '../../middleware/cors';
import jwt from 'jsonwebtoken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!req.body) {
		res.statusCode = 404;
		res.end('Error');
		return;
	}
	await runMiddleware(req, res, cors);

	switch (req.method) {
		case 'POST':
			const { username, password } = req.body;
			res.json({
				token: jwt.sign(
					{
						username,
					},
					process.env.JWT_SECRET
				),
			});
			break;
		default:
			res.status(405).end(); //Method Not Allowed
			break;
	}
};

export default connectDB(handler);
