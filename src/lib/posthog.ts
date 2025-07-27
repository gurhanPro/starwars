import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: {
      recordCrossOriginIframes: false,
    },
    autocapture: {
      dom_event_allowlist: ['click', 'submit'],
      url_allowlist: [window.location.origin],
    },
  })
}

export default posthog