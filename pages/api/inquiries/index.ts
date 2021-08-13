import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/connectDB';
import cors from '../../../middleware/cors';
import { Inquiry } from '../../../models';
import runMiddleware from '../../../utils/runMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);

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

			try {
				const inquiries = await Inquiry.find();
				return res
					.status(200)
					.json({ msg: 'Inquiries fetched successfully', data: inquiries });
			} catch (err) {
				console.error('Inquiries Error:', err);
				return res.status(500).json({ msg: 'Something went wrong' });
			}
			break;
		case 'POST':
			if (!req.body) return res.status(400).json({ msg: 'Request Invalid' });

			const {
				name,
				phone,
				email,
				genre,
				event,
				evntDate,
				budget,
				city,
				state,
				country,
				artist,
			} = req.body;

			if (
				!name ||
				!phone ||
				!genre ||
				!event ||
				!evntDate ||
				!budget ||
				!country ||
				!state ||
				!city
			)
				return res
					.status(422)
					.json({ msg: 'Please enter all the required fields' });

			try {
				const newInq = new Inquiry({
					name,
					phone,
					email,
					genre,
					event,
					evntDate,
					budget,
					country,
					state,
					city,
					artist,
				});

				const createdInq = await newInq.save();

				return res.status(200).json({
					msg: 'Inquiry submitted successfully, we will reach out to you soon.',
					data: {
						id: createdInq.id,
						name: createdInq.name,
						phone: createdInq.phone,
						email: createdInq.email,
						genre: createdInq.genre,
						event: createdInq.event,
						evntDate: createdInq.evntDate,
						budget: createdInq.budget,
						country: createdInq.country,
						state: createdInq.state,
						city: createdInq.city,
						artist: createdInq.artist,
					},
				});
			} catch (err) {
				console.error('Inquiry Error:', err);
				return res.status(500).json({ msg: 'Something went wrong' });
			}

			break;
		default:
			res.status(405).end('Method Not Allowed'); //Method Not Allowed
			break;
	}
};

export default connectDB(handler);
