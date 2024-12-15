import { getAnimalInfo } from '../actions/getAnimalInfo'
import AnimalInfo from '@/components/AnimalInfo'

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { id: string }
}) {
  const animalInfo = await getAnimalInfo(searchParams.id)

  return (
    <main className="text-white bg-gradient-to-r from-gray-500 via-green-500 to-emerald-400 flex min-h-screen flex-col items-center justify-center p-5 nmd:p-24">
      <h1 className="text-center  text-4xl font-bold mb-8">Animal Information</h1>
      <AnimalInfo info={animalInfo} />
    </main>
  )
}

