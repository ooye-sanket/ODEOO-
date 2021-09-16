import { NextApiRequest, NextApiResponse } from 'next';
import cors from '../../../middleware/cors';
import { User } from '../../../models';
import runMiddleware from '../../../utils/runMiddleware';
import db from '../../../middleware/db';
import { verify } from 'jsonwebtoken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	const { token } = req.query;
	// console.log(req.headers.referer.split('/'));
	switch (req.method) {
		case 'GET':
			if (!token)
				return res.status(400).json({ msg: 'No security token provided' });

			verify(
				// @ts-ignore
				token,
				process.env.JWT_SECRET,
				async (err: any, decoded: any) => {
					if (!err && decoded) {
						try {
							const usr = await User.findByIdAndUpdate(decoded.idToBeVerified, {
								$set: { 'verification.email': true },
							});
							res.write(
								`<h1>Hey ${usr.firstName}, your email is verified.</h1>`
							);
						} catch (error) {
							console.error('Verify Error: ', error);
							return res.status(302).json({ msg: 'No authorisation token' });
						}
					} else return res.status(403).json({ msg: 'Invalid token' });
				}
			);

			break;
		default:
			res.status(405).end(); //Method Not Allowed
			break;
	}
};

export default db(handler);
