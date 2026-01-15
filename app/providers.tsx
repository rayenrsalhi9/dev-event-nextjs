'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY!
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST!

if (typeof window !== 'undefined') {
  if (!posthogKey || !posthogHost) {
    console.error("PostHog key or host are not defined. Analytics will not be initialized.");
  } else {
    posthog.init(posthogKey, { api_host: posthogHost })
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}