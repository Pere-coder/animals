'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Upload } from 'lucide-react'
import Image from 'next/image'

export default function ImageUpload() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

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
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex-col items-center justify-center">
      <div className="flex gap-5  md:gap-0 items-center justify-center flex-col md:flex-row md:space-x-4">
        <Button type="button" onClick={() => document.getElementById('fileInput')?.click()}>
          <Upload className="mr-2 h-4 w-4" /> Upload Image
        </Button>
        <Button type="button">
          <Camera className="mr-2 h-4 w-4" /> Take Picture
        </Button>
        <Input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {preview && (
        <div className="mt-4 flex items-center justify-center">
          <Image src={preview} className='rounded' alt="Preview" width={700} height={700} />
        </div>
      )}
      {image && (
        <Button type="submit">{loading ? "loading" : "Identify Animal"}</Button>
      )}
    </form>
  )
}

