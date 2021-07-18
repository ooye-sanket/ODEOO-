import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/connectDB';
import runMiddleware from '../../utils/runMiddleware';
import cors from '../../middleware/cors';
import { User } from '../../models';
import authenticate from '../../middleware/authenicate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	switch (req.method) {
		case 'GET':
			const page = parseInt((req.query?.page as string) || '1');
			const limit = parseInt((req.query?.limit as string) || '10');
			const sortBy = req.query?.sortBy;
			const sortDirection = req.query?.sortDirection as
				| 'asc'
				| 'desc'
				| undefined;
			const q = new RegExp(req.query?.q as string, 'i');

			try {
				const artists = await User.find({
					role: 'VERIFIED_ARTIST',
					$or: [{ fullName: { $regex: q } }, { username: { $regex: q } }],
				}).select('-password -dateOfBirth -address -phone -__v');

				return res
					.status(200)
					.json({ msg: 'Artists fetched successfully', data: artists });
			} catch (err) {
				console.error('Artists Error:', err);
				return res.status(500).json({ msg: 'Something went wrong' });
			}

			// .select('name')
			// .limit(limit)
			// .skip(limit * page)
			// .sort({
			// 	name: 'asc',
			// });

			break;
		default:
			res.status(405).end('Method Not Allowed'); //Method Not Allowed
			break;
	}
};

export default connectDB(handler);
