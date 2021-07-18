import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

const authenticate =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			verify(
				// @ts-ignore
				req.headers.authorization.split(' ')[1],
				// @ts-ignore
				process.env.JWT_SECRET,
				async (err, decoded) => {
					if (!err && decoded) return await handler(req, res);
					else return res.status(403).json({ msg: 'No authorisation token' });
				}
			);
		} catch (err) {
			console.log(err);
			return res.status(403).json({ msg: 'No authorisation token' });
		}
	};

export default authenticate;
