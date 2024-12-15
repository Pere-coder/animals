import ImageUpload from '@/components/ImageUpload'

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-gray-500 via-green-500 to-emerald-400 text-white flex min-h-screen flex-col items-center justify-center md:p-24 text-center">
      <h1 className="text-4xl font-bold mb-8">Animal Identifier</h1>
      <ImageUpload />
    </main>
  )
}

