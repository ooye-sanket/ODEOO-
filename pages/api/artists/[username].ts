import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/connectDB';
import cors from '../../../middleware/cors';
import { User } from '../../../models';
import runMiddleware from '../../../utils/runMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	switch (req.method) {
		case 'GET':
			const { username } = req.query;
			try {
				const artist = await User.findOne({
					role: 'ARTIST',
					username,
				}).select('-password -dateOfBirth -address -phone -__v');
				console.log(artist);
				return res
					.status(200)
					.json({ msg: 'Artist fetched successfully', data: artist });
			} catch (err) {
				console.error('Artist Error:', err);
				return res.status(500).json({ msg: 'Something went wrong' });
			}
			break;
		default:
			res.status(405).end('Method Not Allowed'); //Method Not Allowed
			break;
	}
};

export default connectDB(handler);
