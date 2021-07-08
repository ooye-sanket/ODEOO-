import { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from '../../lib/runMiddleware';
import connectDB from '../../middleware/connectDB';
import cors from '../../middleware/cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, IUser } from '../../models';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

	switch (req.method) {
		case 'POST':
			if (!req.body) return res.status(400).json({ error: 'Request Invalid' });

			const {
				fullName,
				username,
				email,
				phone,
				password,
				confirmPassword,
				dateOfBirth,
				address,
				aadhar,
				imageUrl,
				contentToDisplay,
				meta,
			} = req.body;

			if (
				!fullName ||
				!username ||
				!email ||
				!phone ||
				!password ||
				!confirmPassword ||
				!dateOfBirth ||
				!address ||
				!imageUrl ||
				!contentToDisplay ||
				!meta
			)
				return res
					.status(400)
					.json({ error: 'Please enter all the required fields' });

			if (password !== confirmPassword)
				return res.status(400).json({ error: "Passwords don't match" });

			const unameExists = await User.findOne({ username });
			const emailExists = await User.findOne({ email });
			const phoneExists = await User.findOne({ phone });
			const aadharExists = await User.findOne({ aadhar });

			if (unameExists)
				return res.status(400).json({ error: 'Username already exists' });
			if (emailExists)
				return res.status(400).json({ error: 'Email already registered' });
			if (phoneExists)
				return res
					.status(400)
					.json({ error: 'Phone Number already registered' });
			if (aadharExists)
				return res
					.status(400)
					.json({ error: 'Aadhar Number already registered' });

			try {
				const hashedPwd = await bcrypt.hash(password, 12);
				const newUsr = new User({
					fullName,
					username,
					email,
					phone,
					password: hashedPwd,
					dateOfBirth,
					address,
					imageUrl,
					contentToDisplay,
					meta,
				});

				const createdUsr = await newUsr
					.save()
					.then((r) => console.log(r))
					.catch((e) => console.error(e));

				if (createdUsr)
					return res.status(200).json({
						token: jwt.sign(
							createdUsr,
							// @ts-ignore
							process.env.JWT_SECRET
						),
						username,
						email,
						phone,
					});
			} catch (error) {
				console.error('SignUp Error:');
				return res.status(500).json({ error: 'Something went wrong' });
			}

		default:
			return res.status(405).end('Method Not Allowed'); //Method Not Allowed
	}
};

export default connectDB(handler);
