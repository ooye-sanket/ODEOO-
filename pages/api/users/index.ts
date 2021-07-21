import { sign, verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from '../../../middleware/cors';
import { User } from '../../../models';
import runMiddleware from '../../../utils/runMiddleware';
import connectDB from '../../../middleware/connectDB';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	switch (req.method) {
		case 'GET':
			const { authorization } = req.headers;
			try {
				verify(
					// @ts-ignore
					authorization.split(' ')[1],
					// @ts-ignore
					process.env.JWT_SECRET,
					async (err, decoded) => {
						if (!err && decoded) {
							const { id } = decoded;
							const usr = await User.findOne({ id }).select(
								'-password -dateOfBirth -address -phone -__v'
							);
							const { firstName, lastName, username } = usr;
							const token = sign(
								{
									user: usr.id,
								},
								// @ts-ignore
								process.env.JWT_SECRET,
								{ expiresIn: '15d' }
							);
							return res
								.status(200)
								.setHeader('Authorization', 'Bearer ' + token)
								.json({
									msg: 'User signed in successfully',
									data: {
										firstName,
										lastName,
										username,
										email: usr.email,
										phone: usr.phone,
									},
								});
						} else
							return res.status(403).json({ msg: 'No authorisation token' });
					}
				);
			} catch (err) {
				return res.status(400).json({ msg: 'Something went wrong' });
			}

			break;
		// case 'POST':
		// 	if (!req.body) {
		// 		res.statusCode = 404;
		// 		res.end('Error');
		// 		return;
		// 	}
		// 	//...
		// 	break;
		default:
			res.status(405).end(); //Method Not Allowed
			break;
	}
};

export default connectDB(handler);
