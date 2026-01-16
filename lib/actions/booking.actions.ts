'use server'
import { Booking } from "@/database"
import { connectDB } from "../mongodb"

type CreateBookingParams = {
  eventId: string;
  email: string;
}

export const createBooking = async ({ eventId, email }: CreateBookingParams) => {
    try {
        await connectDB();
        await Booking.create({ eventId, email });
        return { success: true };
    } catch (error) {
        console.error("Error creating booking:", error);
        return { success: false };
    }
}
