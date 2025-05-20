"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RecordPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [volume, setVolume] = useState(0)
  const [isIOS, setIsIOS] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  useEffect(() => {
    const ua = window.navigator.userAgent
    if (/iPad|iPhone|iPod/.test(ua)) {
      setIsIOS(true)
    }
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)

    const formData = new FormData()
    formData.append("file", file, file.name)

    const res = await fetch("/api/whisper", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      console.error("Transcription failed")
      return
    }

    const data = await res.json()
    localStorage.setItem("translationResult", JSON.stringify(data))
    router.push("/results")
  }

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const audioChunks: Blob[] = []
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunks.push(event.data)
    }

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
      const formData = new FormData()
      formData.append("file", audioBlob, "audio.wav")

      const url = URL.createObjectURL(audioBlob)
      const audio = new Audio(url)
      audio.play()

      const res = await fetch("/api/whisper", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        console.error("Transcription failed")
        return
      }

      const data = await res.json()
      localStorage.setItem("translationResult", JSON.stringify(data))
      router.push("/results")
    }

    const audioContext = new AudioContext()
    const source = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    source.connect(analyser)
    analyser.fftSize = 256
    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    analyserRef.current = analyser

    const tick = () => {
      analyser.getByteFrequencyData(dataArray)
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
      setVolume(avg / 256)
      animationRef.current = requestAnimationFrame(tick)
    }
    tick()

    mediaRecorderRef.current = mediaRecorder
    audioChunksRef.current = audioChunks
    mediaRecorder.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    analyserRef.current?.disconnect()
    cancelAnimationFrame(animationRef.current!)
    setIsRecording(false)
    setIsProcessing(true)
  }

  const toggleRecording = () => {
    const today = new Date().toDateString()
    const lastUsedDate = localStorage.getItem("usageDate")
    let usageCount = parseInt(localStorage.getItem("usageCount") || "0")

    if (lastUsedDate !== today) {
      usageCount = 0
      localStorage.setItem("usageCount", "0")
      localStorage.setItem("usageDate", today)
    }

    if (isRecording) {
      localStorage.setItem("usageCount", String(usageCount + 1))
      stopRecording()
    } else {
      if (usageCount >= 10) {
        alert("You’ve hit your free limit for today. Try again tomorrow!")
        return
      }

      if (isIOS && fileInputRef.current) {
        fileInputRef.current.click()
      } else {
        startRecording()
      }
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Speak freely, in any language</h1>
      <p className="text-gray-400 text-sm">We’ll turn it into natural, easy-to-understand English.</p>

      <div className="flex flex-col items-center justify-center mt-16 mb-10">
        <Button
          onClick={toggleRecording}
          disabled={isProcessing}
          className={`
            w-32 h-32 rounded-full flex items-center justify-center transition-all duration-100
            ${
              isRecording
                ? "bg-red-600 hover:bg-red-700 shadow-xl shadow-red-500/30"
                : "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
            }
          `}
          style={{
            transform: isRecording ? `scale(${1 + volume * 0.3})` : undefined,
          }}
        >
          <Mic size={48} />
        </Button>

        <p className="mt-6 text-sm text-gray-400">
          {isProcessing
            ? "Processing..."
            : isRecording
            ? "Tap again to stop recording"
            : "Tap to start recording"}
        </p>

        {/* iOS fallback input */}
        <input
          type="file"
          accept="audio/*"
          capture="user"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}
