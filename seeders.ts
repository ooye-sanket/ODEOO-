import { Role } from './@types';
import { User, IUser } from './models';

export const UserSeed = async () => {
	// for (const user of users) {
	const user = new User(user1);
	var createdUser;
	user
		.save()
		.then((see: any) => {
			console.log('Save ho gaya', see);
			createdUser = see;
			return createdUser;
		})
		.catch((e: any) => console.error(e));

	// .then((r: any) => console.log(r))
	// .catch((e: any) => console.error(e));
	// }
};

const user1 = {
	fullName: 'John Doe',
	username: 'johndoe',
	email: 'abc@xyz.com',
	phone: '+919876543210',
	password: '12345678',
	dateOfBirth: '20-05-2000',
	address: 'Your Heart',
	aadhar: '123445679876',
	imageUrl: 'https://picsum.photos/200',
	role: Role.UnverifiedArtist,
	contentToDisplay: [
		{
			title: 'Youtube Video',
			description: 'My Youtube Video',
			mediaUrl: 'https://picsum.photos/200',
		},
	],
	youtubeLinks: ['https://picsum.photos/200', 'https://picsum.photos/200'],
	meta: {
		genre: ['Bollywood'],
		events: ['Ring Ceremony'],
	},
};
