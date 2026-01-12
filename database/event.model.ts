import mongoose, { Schema, Document, model } from 'mongoose';
import { parseISO, format, isValid } from 'date-fns';

// Interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Event Schema
const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [1, 'Description cannot be empty'],
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
      minlength: [1, 'Overview cannot be empty'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
      minlength: [1, 'Venue cannot be empty'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [1, 'Location cannot be empty'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      trim: true,
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be either online, offline, or hybrid',
      },
      trim: true,
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
      minlength: [1, 'Audience cannot be empty'],
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (agenda: string[]) => agenda.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
      minlength: [1, 'Organizer cannot be empty'],
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (tags: string[]) => tags.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Generate URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Pre-save hook for slug generation, date normalization, and time formatting
EventSchema.pre('save', function (next: (err?: Error) => void) {
  const event = this as IEvent;

  // Generate slug only if title is modified or slug doesn't exist
  if (event.isModified('title') || !event.slug) {
    event.slug = generateSlug(event.title);
  }

  // Normalize date to ISO format (YYYY-MM-DD) without UTC conversion
  if (event.date) {
    // Validate and accept only strict YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (dateRegex.test(event.date)) {
      // If already in correct format, validate it's a real date
      const parsedDate = parseISO(event.date);
      if (isValid(parsedDate)) {
        event.date = format(parsedDate, 'yyyy-MM-dd');
      }
    } else {
      // Try to parse other formats and convert to date-only string
      const parsedDate = parseISO(event.date);
      if (isValid(parsedDate)) {
        event.date = format(parsedDate, 'yyyy-MM-dd');
      }
    }
  }

  // Normalize time to 24-hour format (HH:MM)
  if (event.time) {
    // Remove any extra whitespace and ensure consistent format
    event.time = event.time.trim();
    
    // If time contains AM/PM, convert to 24-hour format
    const timeMatch = event.time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      const minutes = timeMatch[2];
      const period = timeMatch[3]?.toUpperCase();
      
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      event.time = `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
  }

  next();
});

// Add unique index on slug
EventSchema.index({ slug: 1 }, { unique: true });

// Export Event model
export const Event = mongoose.models.Event || model<IEvent>('Event', EventSchema);