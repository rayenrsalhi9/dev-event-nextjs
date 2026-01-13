import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/database";

export async function POST(req: NextRequest) {
  try {

    await connectDB();
    const formData = await req.formData();

    let event;

    try {
        event = Object.fromEntries(formData.entries());
    } catch (e) {
        console.error('Error parsing form data:', e);
        return NextResponse.json({message: 'Invalid form data'}, { status: 400 });
    }

    const generatedEvent = await Event.create(event);

    return NextResponse.json({ 
        message: 'Event created successfully',
        event: generatedEvent
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ 
        message: 'Failed to create event',
        error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}