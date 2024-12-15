'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Upload, X } from 'lucide-react'
import Image from 'next/image'

export default function ImageUpload() {
  const [image, setImage] = useState<File | string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [opencamera, setOpencamera] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  const startCamera = async () => {
    setOpencamera(true)
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    })
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }

  const captureImage = () => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (canvas && video) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

      const dataUrl = canvas.toDataURL('image/png')
      setImage(dataUrl)
      setPreview(dataUrl)
      setOpencamera(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!image) return

    const formData = new FormData()
    formData.append('image', image)

    const response = await fetch('/api/identify', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      router.push(`/result?id=${result.id}`)
    } else {
      console.error('Error identifying animal')
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setImage(null)
    setPreview(null)
    setOpencamera(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center justify-center">
      {!image && !opencamera && (
        <div className="flex gap-4">
          <Button type="button" onClick={() => document.getElementById('fileInput')?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
          <Button type="button" onClick={startCamera}>
            <Camera className="mr-2 h-4 w-4" /> Take Picture
          </Button>
        </div>
      )}
      <Input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {opencamera && (
        <div className="relative">
          <video ref={videoRef} autoPlay className="rounded-lg" />
          <canvas ref={canvasRef} className="hidden" />
          <Button 
            type="button" 
            onClick={captureImage}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            Capture
          </Button>
        </div>
      )}
      {preview && (
        <div className="relative mt-4">
          <Image src={preview} alt="Preview" width={300} height={300} className="rounded-lg" />
          <Button
            type="button"
            onClick={handleCancel}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {image && (
        <Button type="submit" disabled={loading}>
          {loading ? "Identifying..." : "Identify Animal"}
        </Button>
      )}
    </form>
  )
}

