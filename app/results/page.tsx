"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Share } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface TranslationResult {
  urdu: string
  translated: string
  plain: string
}

export default function ResultsPage() {
  const [result, setResult] = useState<TranslationResult | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedResult = localStorage.getItem("translationResult")
    if (savedResult) {
      setResult(JSON.parse(savedResult))
    } else {
      router.push("/record")
    }
  }, [router])

  const handleShare = () => {
    alert("Sharing functionality would go here!")
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-10 text-center">Your Translation</h1>

      <Card className="w-full max-w-xl bg-[#111111] border border-white/10 shadow-md mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-white flex items-center gap-2">
            <span className="text-xl">🎙</span> Transcription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{result.urdu}</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-xl bg-[#111111] border border-white/10 shadow-md mb-10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-white flex items-center gap-2">
            <span className="text-xl">✨</span> Plain English Version
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{result.plain}</p>
        </CardContent>
      </Card>

      <div className="flex gap-4 w-full max-w-xl">
        <Link href="/record" className="flex-1">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-white/20 text-black hover:bg-white/10 hover:text-white"
          >
            <RefreshCw size={16} />
            Try Again
          </Button>
        </Link>

        <Button
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition duration-300"
          onClick={handleShare}
        >
          <Share size={16} />
          Share
        </Button>
      </div>
    </div>
  )
}
