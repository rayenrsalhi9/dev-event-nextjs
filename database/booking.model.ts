import mongoose, { Schema, Document, model, Types } from 'mongoose';
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
          // Email validation regex pattern
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
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

  try {
    // Check if the referenced event exists
    const eventExists = await Event.findById(booking.eventId);
    
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