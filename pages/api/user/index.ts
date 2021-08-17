import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from '../../../middleware/cors';
import { User } from '../../../models';
import runMiddleware from '../../../utils/runMiddleware';
import connectDB from '../../../middleware/connectDB';
import withUser from '../../../middleware/withUser';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	// @ts-ignore
	const usr = req.user;
	// console.log(req.headers.referer.split('/'));
	switch (req.method) {
		case 'GET':
			if (usr) {
				if (req.query.all) {
					try {
						const usrAll = await User.findById(
							usr.id,
							'-password -hidden -createdAt -updatedAt -__v'
						);
						return res.status(200).json({
							msg: 'User signed in successfully',
							data: usrAll,
						});
					} catch (err) {
						console.log(err);
						return res.status(400).json({ msg: 'Something went wrong' });
					}
				} else {
					try {
						const token = await sign(
							{
								userId: usr.id,
							},
							// @ts-ignore
							process.env.JWT_SECRET,
							{ expiresIn: '7d' }
						);
						return res
							.status(200)
							.setHeader('Authorization', 'Bearer ' + token)
							.json({
								msg: 'User signed in successfully',
								data: usr,
							});
					} catch (err) {
						console.log(err);
						return res.status(400).json({ msg: 'Something went wrong' });
					}
				}
			}
			return res.status(403).json({ msg: 'No authorisation token' });

			break;
		default:
			res.status(405).end(); //Method Not Allowed
			break;
	}
};

export default connectDB(withUser(handler));
