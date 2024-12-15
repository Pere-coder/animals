import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Leaf, AlertTriangle } from 'lucide-react'
import Elephant from '@/public/elephant.jpg'

interface AnimalInfoProps {
  info: {
    type: string
    location: string
    status: string
    habitat: string
    images: string[]
  }
}

export default function AnimalInfo({ info }: AnimalInfoProps) {
  return (
    <Card className="w-full max-w-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="bg-primary/10 dark:bg-primary/20">
        <CardTitle className="text-3xl font-bold text-primary">{info.type}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{info.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <Badge variant="outline" className="text-sm font-medium">
              {info.status}
            </Badge>
          </div>
          <div className="flex items-center space-x-2 md:col-span-2">
            <Leaf className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">{info.habitat}</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {info.images.map((src, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={Elephant}
                  alt={`${info.type} ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

