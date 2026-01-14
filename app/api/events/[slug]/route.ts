import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/database";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ req, params }: { req: NextRequest, params: Promise<{ slug: string }> }) {
  try {
    
    await connectDB();
    
    const { slug } = await params;
    if (!slug) return NextResponse.json({ message: 'Event slug is required' }, { status: 400 });
    
    const sanitizedSlug = slug.trim().toLowerCase();

    const event = await Event.findOne({ slug: sanitizedSlug }).lean();
    if (!event) return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    
    return NextResponse.json({message: 'Event fetched successfully',event }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 }
    );
  }
}