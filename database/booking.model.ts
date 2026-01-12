import mongoose, { Schema, Document, model, Types } from 'mongoose';
import validator from 'validator';
import { Event } from './event.model';

// Interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Schema
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true, // Add index for faster queries
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          return validator.isEmail(email, { allow_utf8_local_part: true });
        },
        message: 'Invalid email',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to validate event existence
BookingSchema.pre('save', async function (next) {
  const booking = this as IBooking;

  // Skip validation for existing documents when eventId hasn't changed
  if (!this.isNew && !this.isModified('eventId')) {
    return next();
  }

  try {
    // Check if the referenced event exists using lightweight existence check
    const eventExists = await Event.exists({ _id: booking.eventId });
    
    if (!eventExists) {
      throw new Error(`Event with ID ${booking.eventId} does not exist`);
    }

    next();
  } catch (error) {
    next(error as Error);
  }
});

// Export Booking model
export const Booking = mongoose.models.Booking || model<IBooking>('Booking', BookingSchema);