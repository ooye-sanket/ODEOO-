import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/connectDB';
import cors from '../../../middleware/cors';
import { User } from '../../../models/User';
import runMiddleware from '../../../utils/runMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	switch (req.method) {
		case 'PUT':
			if (!req.query || !req.body)
				return res.status(400).json({ msg: 'Request Invalid' });

			const { action } = req.query;
			const { email, password, newPassword, passwordConfirm } = req.body;

			if (
				(action == 'change' &&
					(!email || !password || !newPassword || !passwordConfirm)) ||
				(action == 'reset' && !email)
			)
				return res
					.status(422)
					.json({ msg: 'Please enter all the required fields' });

			if (action == 'change') {
				if (newPassword !== passwordConfirm)
					return res.status(400).json({ msg: "Passwords don't match" });
				if (password === newPassword)
					return res.status(400).json({ msg: 'Please create a new password' });

				try {
					const usr = await User.findOne({ email }).select(
						'-firstName -lastName -dateOfBirth -address -phone -__v'
					);

					compare(password, usr.password, async (err: any, obj: any) => {
						if (!err && obj) {
							const { id } = usr;
							const hashedPwd = await hash(newPassword, 10);

							const updatedUsr = await User.findByIdAndUpdate(id, {
								password: hashedPwd,
							});
							return res.status(200).json({
								msg: 'Password changed successfully',
							});
						} else {
							return res
								.status(401)
								.json({ msg: "Email & Password don't match" });
						}
					});
				} catch (err) {
					return res.status(400).json({ msg: 'Something went wrong' });
				}
			}
			if (action == 'reset') {
				return res.status(200).json({
					msg: `Password reset link sent to ${email}`,
				});
			}
			break;
		default:
			return res.status(405).end('Method Not Allowed'); //Method Not Allowed
	}
};

export default connectDB(handler);
