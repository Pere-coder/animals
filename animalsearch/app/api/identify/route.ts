import { NextResponse } from 'next/server'
import { identifyAnimal } from '../../actions/getAnimalInfo'

export async function POST(request: Request) {
  const formData = await request.formData()
  try {
    const result = await identifyAnimal(formData)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to identify animal' }, { status: 500 })
  }
}

