'use server'
'use cache'
import { cacheLife } from "next/cache"
import { connectDB } from "../mongodb"
import { Event } from "@/database"

export const getSimilarEventsBySlug = async (slug: string) => {
    cacheLife('hours')
    try {       
        await connectDB()
        const event = await Event.findOne({ slug })
        if (!event) return []
        return await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags }
        }).limit(3).lean()
    } catch {
        console.log('Error fetching similar events')
        return []
    }
}