import nodemailer from 'nodemailer';

export const verifyEmail = async (email, token) => {
	const Transport = nodemailer.createTransport({
		service: 'Zoho',
		host: 'smtp.zoho.com',
		port: '465',
		secure: true,
		secureConnection: false,
		auth: {
			user: 'noreply@odeo.in',
			pass: process.env.NO_REPLY_PASSWORD,
		},
	});

	let mailOptions = {
		from: 'Odeo.in',
		to: email,
		subject: 'Verify your Email | Odeo.in',
		html: `Press <a href='${
			process.env.NODE_ENV == 'production'
				? process.env.PROD_BASE_URL
				: process.env.DEV_BASE_URL
		}/api/verify/${token}'> here</a> to verify your email.`,
	};

	await Transport.sendMail(mailOptions, (err, obj) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Message Sent');
		}
	});
};
