import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { User } from '../models';

const withUser =
	(handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		if (req.headers.authorization) {
			try {
				verify(
					// @ts-ignore
					req.headers.authorization.split(' ')[1],
					// @ts-ignore
					process.env.JWT_SECRET,
					async (err, decoded) => {
						if (!err && decoded) {
							try {
								const usr = await User.findById(
									decoded.userId,
									'_id firstName lastName username email role verification'
								);
								// @ts-ignore
								req.user = usr;
								return await handler(req, res);
							} catch (error) {
								if (
									// @ts-ignore
									req.headers.referer.split('/')[3] == ('admin' || 'profile')
								) {
									return res
										.status(302)
										.json({ msg: 'No authorisation token' });
								}
								console.error('withUser Middleware:', error);
							}
						} else
							return res.status(403).json({ msg: 'No authorisation token' });
					}
				);
			} catch (err) {
				console.log(err);
				return res.status(403).json({ msg: 'No authorisation token' });
			}
		} else {
			// @ts-ignore
			req.user = null;
			return await handler(req, res);
		}
	};

export default withUser;
