import { NextApiRequest, NextApiResponse } from 'next';
import cors from '../../../middleware/cors';
import { User } from '../../../models';
import runMiddleware from '../../../utils/runMiddleware';
import connectDB from '../../../middleware/connectDB';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	const { token } = req.query;
	// console.log(req.headers.referer.split('/'));
	switch (req.method) {
		case 'GET':
			if (!token)
				return res.status(400).json({ msg: 'No security token provided' });

			res.json({ msg: 'String received' });

			break;
		default:
			res.status(405).end(); //Method Not Allowed
			break;
	}
};

export default connectDB(handler);
