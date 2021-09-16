import { compare } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from '../../../utils/runMiddleware';
import db from '../../../middleware/db';
import cors from '../../../middleware/cors';
import { sign } from 'jsonwebtoken';
import { User, IUser } from '../../../models';
import { capitalise } from '../../../utils/helpers';
import withUserStrict from '../../../middleware/withUserStrict';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	if (!req.body) return res.status(400).json({ msg: 'Request Invalid' });

	const {
		id,
		firstName,
		lastName,
		username,
		email,
		phone,
		description,
		password,
		address,
		dateOfBirth,
		aadhar,
		youtubeLinks,
		verification,
		meta,
	} = req.body;

	// @ts-ignore
	const usr = req.user;

	switch (req.method) {
		case 'POST':
			if (
				!phone ||
				!description ||
				!address ||
				!dateOfBirth ||
				!youtubeLinks ||
				!meta
			)
				return res
					.status(400)
					.json({ msg: 'Please enter all the required fields' });

			if (usr?.role !== 'ADMIN' && (id || verification))
				return res.status(401).json({ msg: 'Request unauthorized' });

			try {
				const updatedUsr = await User.findByIdAndUpdate(usr.id, {
					phone,
					description,
					address,
					dateOfBirth,
					aadhar,
					youtubeLinks,
					meta,
				}).select(
					'phone description address dateOfBirth aadhar imgUrl youtubeLinks meta.genre meta.events'
				);
				return res.status(200).json({
					msg: 'Good to go! Profile updated',
					data: updatedUsr,
				});
			} catch (err: any) {
				console.error('Profile Update Error:', err);
				return res
					.status(500)
					.json({ msg: "Oops! Something's wrong, try again" });
			}
			// compare(password, usr.password, async (err: any, obj: any) => {
			// 	if (!err && obj) {

			// 	} else {
			// 		return res.status(401).json({ msg: 'Password invalid' });
			// 	}
			// });
			break;

		case 'PUT':
			if (usr?.role !== 'ADMIN' && (id || verification))
				return res.status(401).json({ msg: 'Request unauthorized' });

			if (usr?.role === 'ADMIN' && id) {
				console.log('Admin Operation');
				try {
					const updatedUsr = await User.findByIdAndUpdate(id, {
						firstName,
						lastName,
						username,
						email,
						phone,
						address,
						dateOfBirth,
						aadhar,
						// imgUrl,
						youtubeLinks,
						meta,
						verification,
					});
					return res.status(200).json({
						msg: 'Profile updated successfully',
						data: updatedUsr,
					});
				} catch (err) {
					console.error('Profile Update Error:', err);

					return res.status(500).json({ msg: 'Something went wrong' });
				}
			}

			try {
				const updatedUsr = await User.findByIdAndUpdate(usr.id, {
					firstName,
					lastName,
					username,
					email,
					phone,
					description,
					address,
					dateOfBirth,
					aadhar,
					youtubeLinks,
					meta,
				}).select('-password -verification -__v');
				return res.status(200).json({
					msg: 'Profile updated',
					data: updatedUsr,
				});
			} catch (err: any) {
				console.error('Profile Update Error:', err);
				return res
					.status(500)
					.json({ msg: "Oops! Something's wrong, try again" });
			}
			// compare(password, usr.password, async (err: any, obj: any) => {
			// 	if (!err && obj) {

			// 	} else {
			// 		return res.status(401).json({ msg: 'Password invalid' });
			// 	}
			// });
			break;
		default:
			return res.status(405).end('Method Not Allowed'); //Method Not Allowed
	}
};

export default db(withUserStrict(handler));
