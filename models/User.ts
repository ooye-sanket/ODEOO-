import { Document, Schema, model, models, Types } from 'mongoose';
import { Event, Genre, Role } from '../@types';

export interface IUser extends Document {
	id: string;
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
	hidden: boolean;
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
		username: { type: String, required: true, unique: true },
		email: {
			type: String,
			required: true,
			match: /.+\@.+\..+/,
			unique: true,
		},
		phone: { type: String, required: true, unique: true },
		password: String,
		dateOfBirth: String,
		description: String,
		address: String,
		aadhar: String,
		img: { url: String, _key: String },
		youtubeLinks: [String],
		meta: {
			genre: { type: [String], enum: Object.values(Genre) },
			events: { type: [String], enum: Object.values(Event) },
		},
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
		hidden: { type: Boolean, required: true, default: false, auto: true },
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
