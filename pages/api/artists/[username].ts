import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/connectDB';
import cors from '../../../middleware/cors';
import withUser from '../../../middleware/withUser';
import { User } from '../../../models';
import runMiddleware from '../../../utils/runMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	// @ts-ignore
	const usr = req.user;

	switch (req.method) {
		case 'GET':
			const { username } = req.query;
			const query =
				usr?.role === 'ADMIN'
					? {
							role: 'ARTIST',
							username,
					  }
					: {
							role: 'ARTIST',
							username,
							$and: [
								{ 'verification.email': true },
								{ 'verification.profile': true },
							],
					  };
			const select =
				usr?.role === 'ADMIN'
					? '-password -__v'
					: '-password -dateOfBirth -address -phone -__v';
			try {
				const artist = await User.findOne(query, select);
				console.log(artist);
				if (artist) {
					return res
						.status(200)
						.json({ msg: 'Artist fetched successfully', data: artist });
				} else return res.status(404).json({ msg: 'Not Found' });
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

export default connectDB(withUser(handler));
