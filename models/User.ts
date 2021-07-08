import { Document, Schema, model, models } from 'mongoose';
import { Event, Genre, Role } from '../@types';

export interface IUser extends Document {
	fullName: string;
	username: string;
	email: string;
	phone: string;
	dateOfBirth: string;
	address: string;
	aadhar: string;
	imageUrl: string;
	contentToDisplay: ContentToDisplay[];
	youtubeLinks: string[];
	role: Role;
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
		fullName: String,
		username: String,
		email: String,
		phone: String,
		password: String,
		dateOfBirth: String,
		address: String,
		aadhar: String,
		imageUrl: String,
		contentToDisplay: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					index: true,
					required: true,
					auto: true,
				},
				title: String,
				description: String,
				mediaUrl: String,
			},
		],
		youtubeLinks: [String],
		role: {
			type: String,
			enum: Object.values(Role),
			required: true,
			default: Role.UnverifiedArtist,
			auto: true,
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
