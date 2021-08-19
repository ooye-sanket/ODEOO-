import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from '../../../middleware/cors';
import { User } from '../../../models';
import runMiddleware from '../../../utils/runMiddleware';
import connectDB from '../../../middleware/connectDB';
import withUser from '../../../middleware/withUser';
import { deleteFile, uploadFile } from '../../../utils/s3';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	// @ts-ignore
	const usr = req.user;
	// console.log(req.headers.referer.split('/'));
	switch (req.method) {
		case 'GET':
			break;
		case 'PUT':
			const form = new formidable.IncomingForm();
			// @ts-ignore
			form.keepExtensions = true;
			// @ts-ignore
			form.parse(req, async (err, fields, files) => {
				if (!files) {
					return res.status(400).json({ msg: 'Provide a relevant image file' });
				} else if (err) {
					return res.status(400).json({ msg: err });
				}
				console.log(files.image);
				try {
					const { img } = await User.findById(usr._id, 'img');
					if (img.url) await deleteFile(img._key);
					const uploaded = await uploadFile(
						files.image,
						`image_${usr.username}`
					);
					const updated = await User.findByIdAndUpdate(usr._id, {
						img: { url: uploaded.Location, _key: uploaded.Key },
					}).select('username img');
					return res.json({
						msg: 'Image uploaded successfully',
						imgUrl: uploaded.Location,
						updated,
					});
				} catch (error) {
					console.error(error);
					return res.status(400).json({ msg: 'Something went wrong' });
				}
			});
			break;
		default:
			res.status(405).end(); //Method Not Allowed
			break;
	}
};

export default connectDB(withUser(handler));

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
