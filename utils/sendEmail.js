import nodemailer from 'nodemailer';

export const verifyEmail = async (email, token) => {
	return new Promise(async (resolve, reject) => {
		const Transporter = nodemailer.createTransport({
			host: 'smtppro.zoho.in',
			port: 465,
			secure: true,
			auth: {
				user: process.env.NO_REPLY_EMAIL,
				pass: process.env.NO_REPLY_PASSWORD,
			},
		});

		let mailOptions = {
			from: '"Odeo.in" <no-reply@odeo.in>',
			to: email,
			subject: 'Verify your Email | Odeo.in',
			html: `Press click <a href='${
				process.env.NODE_ENV == 'production'
					? process.env.PROD_BASE_URL
					: process.env.DEV_BASE_URL
			}/api/verify/${token}'> here</a> to verify your email.`,
		};

		await Transporter.sendMail(mailOptions, (err, obj) => {
			if (err) {
				reject(err);
			} else {
				resolve(obj);
				console.log(obj);
			}
		});
	});
};
