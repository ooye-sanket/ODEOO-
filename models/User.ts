import { Schema, model, models } from 'mongoose';
import { Event, Genre, Role } from '../@types';

interface UserI {
	fullName: String;
	username: String;
	email: String;
	phone: String;
	dateOfBirth: Date;
	address: String;
	aadhar: String;
	contentToDisplay: [
		{ _id: Number; title: String; description: String; mediaUrl: String }
	];
	youtubeLinks: [String];
	role: Role;
	meta: {
		genre: [Genre];
		events: [Event];
	};
}

const userSchema = new Schema<UserI>(
	{
		fullName: String,
		username: String,
		email: String,
		phone: String,
		dateOfBirth: Date,
		address: String,
		aadhar: String,
		imageUrl: String,
		contentToDisplay: [
			{ _id: Number, title: String, description: String, mediaUrl: String },
		],
		youtubeLinks: [String],
		role: {
			type: String,
			enum: Object.values(Role),
			required: true,
			default: Role.UnverifiedArtist,
		},
		meta: {
			genre: { type: String, enum: Object.values(Genre) },
			events: { type: String, enum: Object.values(Event) },
		},
	},
	{ timestamps: true }
);

export const User = models['User'] || model<UserI>('User', userSchema);

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
