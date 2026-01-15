import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/database";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    
    await connectDB();
    
    const { slug } = await params;
    if (!slug) return NextResponse.json({ message: 'Event slug is required' }, { status: 400 });
    
    const sanitizedSlug = slug.trim().toLowerCase();

    const event = await Event.findOne({ slug: sanitizedSlug }).lean();
    if (!event) return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    
    return NextResponse.json({ message: 'Event fetched successfully',event }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ message: 'Failed to fetch event' }, { status: 500 });
  }
}