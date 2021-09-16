import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../middleware/db';
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
			const page = parseInt((req.query?.page as string) || '1');
			const limit = parseInt((req.query?.limit as string) || '10');
			const sortBy = req.query?.sortBy;
			const sortDirection = req.query?.sortDirection as
				| 'asc'
				| 'desc'
				| undefined;
			const q = new RegExp(req.query?.q as string, 'i');

			const query =
				usr?.role === 'ADMIN'
					? {
							role: 'ARTIST',
							$or: [
								{ firstName: { $regex: q } },
								{ lastName: { $regex: q } },
								{ username: { $regex: q } },
							],
					  }
					: {
							role: 'ARTIST',
							$and: [
								{ 'verification.email': true },
								{ 'verification.profile': true },
							],
							$or: [
								{ firstName: { $regex: q } },
								{ lastName: { $regex: q } },
								{ username: { $regex: q } },
							],
					  };
			const select =
				usr?.role === 'ADMIN'
					? '-password'
					: 'firstName lastName username meta.genre img.url pro';

			try {
				const artists = await User.find(query, select);
				console.log(artists);
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

export default withUser(handler);
