import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from '../../lib/runMiddleware';
import connectDB from '../../middleware/connectDB';
import cors from '../../middleware/cors';
import jwt from 'jsonwebtoken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	switch (req.method) {
		case 'POST':
			if (!req.body) return res.status(400).json({ error: 'Request Invalid' });

			if (
				!req.body.username ||
				!req.body.email ||
				!req.body.phone ||
				!req.body.password
			)
				return res
					.status(400)
					.json({ error: 'Please enter all the required fields' });

			if (req.body.email) {
				const { email, password } = req.body;
				try {
				} catch (err) {}
			}

			res.json({
				token: jwt.sign(
					{
						username,
					},
					// @ts-ignore
					process.env.JWT_SECRET
				),
			});
			break;
		default:
			return res.status(405).end('Method Not Allowed'); //Method Not Allowed
	}
};

export default connectDB(handler);
