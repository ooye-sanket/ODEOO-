import { Document, Schema, model, models, Types } from 'mongoose';
import { Event, Genre, Role } from '../@types';

export interface IInquiry extends Document {
	id: string;
	name: string;
	phone: string;
	email: string;
	genre: Genre;
	event: Event;
	evntDate: string;
	budget: Number;
}

const InquirySchema = new Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		email: {
			type: String,
			match: /.+\@.+\..+/,
			unique: true,
		},
		genre: { type: String, enum: Object.values(Genre), required: true },
		event: { type: String, enum: Object.values(Event), required: true },
		evntDate: { type: String, required: true },
		budget: { type: Number, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		country: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Inquiry = models['Inquiry'] || model('Inquiry', InquirySchema);
