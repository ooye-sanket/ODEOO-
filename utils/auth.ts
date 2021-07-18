import { compare } from 'bcrypt';
import { User } from '../models/User';

export const loginViaEmail = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const usr = await User.findOne({ email }, (err: any, obj: any) =>
		console.log(obj)
	);
	compare(password, usr.password, (err: any, obj: any) => {
		if (!err && obj) {
			res.json({ msg: 'User signed in successfully' });
		} else {
		}
	});
};
