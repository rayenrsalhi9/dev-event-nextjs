import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/database";
import { v2 as cloudinary } from 'cloudinary';

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

    const requiredFields = ['title', 'description', 'overview', 'image', 'venue', 'location', 'date', 'time', 'mode', 'audience', 'agenda', 'organizer', 'tags'];

    const missingFields = requiredFields.filter(field => !event[field]);
    if (missingFields.length > 0) {
        return NextResponse.json(
          { message: `Missing required fields: ${missingFields.join(', ')}`}, 
          { status: 400 }
        );
    }

    const file = formData.get('image') as File;
    if (!file) return NextResponse.json({message: 'File is required'}, { status: 400 });

    // validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.'}, { status: 400 }
        );
    }

    // validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return NextResponse.json(
          {message: 'File size exceeds 5MB limit.'}, { status: 400 }
        );
    }

    let tags, agenda

    try {
        tags = JSON.parse(event.tags as string);
        agenda = JSON.parse(event.agenda as string);
    } catch (e) {
        console.error('Error parsing tags or agenda:', e);
        return NextResponse.json(
            { message: 'Invalid JSON format for tags or agenda' }, 
            { status: 400 }
        );
    }

    if(!Array.isArray(tags) || !Array.isArray(agenda)) {
        return NextResponse.json(
            { message: 'Tags and agenda must be arrays' }, 
            { status: 400 }
        );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'DevEvent' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const generatedEvent = await Event.create({ ...event, tags, agenda });

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

export async function GET() {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 });
        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ 
            message: 'Failed to fetch events',
            error: e instanceof Error ? e.message : 'Unknown error'
        }, { status: 500 });
    }
}