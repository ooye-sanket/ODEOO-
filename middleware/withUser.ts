import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { User } from '../models';

const withUser =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			if (req.headers.authorization) {
				verify(
					// @ts-ignore
					req.headers.authorization.split(' ')[1],
					// @ts-ignore
					process.env.JWT_SECRET,
					async (err, decoded) => {
						if (!err && decoded) {
							try {
								const usr = await User.findById(decoded.userId).select(
									'id username email password role'
								);
								// @ts-ignore
								req.user = usr;
								return await handler(req, res);
							} catch (error) {
								console.error('Authenticate Middleware:', error);
							}
						} else
							return res.status(403).json({ msg: 'No authorisation token' });
					}
				);
			} else {
				// @ts-ignore
				req.user = null;
				return await handler(req, res);
			}
		} catch (err) {
			console.log(err);
			return res.status(403).json({ msg: 'No authorisation token' });
		}
	};

export default withUser;
