'use client'

import { useState } from "react"
import { createBooking } from "@/lib/actions/booking.actions"
import posthog from "posthog-js"

const EventBookingCta = ({ eventId, eventSlug }: { eventId: string, eventSlug: string }) => {

    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { success } = await createBooking({ eventId, email })
        if (success) {
            setSubmitted(true)
            posthog.capture('event_booked', { eventId, email, eventSlug })
        } else {
            console.error('Failed to create booking ')
            posthog.captureException('Failed to create booking')
        }
    }

  return (
    <div className="w-full max-w-full sm:max-w-[400px] h-fit bg-[#0D161A] rounded-xl border border-[#182830] p-6 sm:p-8">

      <h3 className="text-xl sm:text-2xl font-bold">Book Your Spot</h3>
      <p className="text-[#E7F2FF] mt-3 text-sm sm:text-base">
        Be the first to attend this event.
      </p>

      <div>
        {
            submitted ? (
                <p className="text-[#59DECA] mt-3 text-sm font-semibold sm:text-base">
                    Thank you for your submission!
                </p>
            ) : (
                <form className="mt-4" onSubmit={handleSubmit}>
                    <label 
                        htmlFor="email" 
                        className="block text-[#E7F2FF] text-sm sm:text-base"
                    >
                        Email Address
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="mt-3 sm:mt-4 w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#243B47] bg-[#182830] text-white text-sm sm:text-base" 
                    />
                    <button 
                        className="block cursor-pointer mt-4 w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#59DECA] text-[#030708] font-semibold text-sm sm:text-base hover:bg-[#4CC9B5] transition-colors duration-300"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            )
        }
      </div>
    </div>
  )
}

export default EventBookingCta