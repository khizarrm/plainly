"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center max-w-xl space-y-6">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Plainly
        </h1>

        <h2 className="text-xl font-medium text-gray-400">
          Google Translate doesn't do this.
        </h2>

        <p className="text-base text-gray-400">
          Speak in any language. Get a smooth, natural English translation.
          Rant, vent, stutter, swear — we’ll turn it into a clear, calm, and professional message.
        </p>

        <Link href="/record" passHref>
          <Button
            size="lg"
            className="mt-6 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition duration-300 ease-in-out rounded-full shadow-md hover:shadow-lg"
          >
            Try it →
          </Button>
        </Link>
      </div>
    </div>
  )
}
