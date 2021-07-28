import { Document, Schema, model, models } from 'mongoose';
import { Event, Genre, Role } from '../@types';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	phone: string;
	dateOfBirth: string;
	address: string;
	aadhar: string;
	imgUrl: string;
	youtubeLinks: string[];
	role: Role;
	verification: { email: boolean; phone: boolean; profile: boolean };
	meta: {
		genre: Genre[];
		events: Event[];
	};
}

interface ContentToDisplay {
	_id: Number;
	title: string;
	description: string;
	mediaUrl: string;
}

const UserSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		username: String,
		email: String,
		phone: String,
		password: String,
		dateOfBirth: String,
		address: String,
		aadhar: String,
		imgUrl: String,
		youtubeLinks: [String],
		role: {
			type: String,
			enum: Object.values(Role),
			required: true,
			default: Role.Artist,
			auto: true,
		},
		verification: {
			email: { type: Boolean, required: true, default: false, auto: true },
			phone: { type: Boolean, required: true, default: false, auto: true },
			profile: { type: Boolean, required: true, default: false, auto: true },
		},
		meta: {
			genre: { type: [String], enum: Object.values(Genre) },
			events: { type: [String], enum: Object.values(Event) },
		},
	},
	{ timestamps: true }
);

// UserSchema.pre('save', function save(next) {
// 	const user = this;
// 	if (!user.isModified('password')) return next();
// });

export const User = models['User'] || model('User', UserSchema);

/*
  id

  fullName
  username
  email
  phone
  dateOfBirth
  address
  aadhar
  image
  contentToDisplay
  youtubeLinks

  role
    admin
    artist
    verified
  meta
    events
    genre
  createdAt
  updatedAt
*/
