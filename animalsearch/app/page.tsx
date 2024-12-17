import ImageUpload from '@/components/ImageUpload'

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 text-white min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold mb-4 animate-fade-in-down">
          Animal Identifier
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 animate-fade-in-up">
          Upload an image to identify the animal species
        </p>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg animate-fade-in">
          <ImageUpload />
        </div>
      </div>
    </main>
  )
}

