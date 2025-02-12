"use client"

import type React from "react"
import Image from "next/image"
import { Users } from "lucide-react"
import { Card } from "@/components/ui/card"

type StepProps = {
  next?: (value?: string) => void
  prev?: () => void
  selectedService?: string
}

interface Professional {
  id: string
  name: string
  role: string
  image?: string
}

const Step2_SelectBarber: React.FC<StepProps> = ({ next, prev, selectedService }) => {
  const professionals: Professional[] = [
    { id: "any", name: "Any professional", role: "for maximum availability" },
    { id: "mustafa", name: "Mustafa", role: "Barber", image: "/placeholder.svg?height=80&width=80" },
    { id: "alex", name: "Alex", role: "Barber", image: "/placeholder.svg?height=80&width=80" },
    { id: "rima", name: "Rima", role: "Barber", image: "/placeholder.svg?height=80&width=80" },
    { id: "danny", name: "Danny", role: "Barber", image: "/placeholder.svg?height=80&width=80" },
    { id: "dimitry", name: "Dimitry", role: "Barber", image: "/placeholder.svg?height=80&width=80" },
    { id: "slava", name: "Slava", role: "Barber", image: "/placeholder.svg?height=80&width=80" },
  ]

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-8">Select professional</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {professionals.map((professional) => (
            <Card
              key={professional.id}
              className="p-6 cursor-pointer hover:border-primary transition-colors"
              onClick={() => next?.(professional.name)}
            >
              <div className="flex flex-col items-center text-center">
                {professional.id === "any" ? (
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <Image
                      src={professional.image || "/placeholder.svg?height=80&width=80"}
                      alt={professional.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="font-medium">{professional.name}</h3>
                <p className="text-sm text-muted-foreground">{professional.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-96 border-l p-6">
        <div className="flex items-start gap-4 mb-6">
          <Image
            src="/placeholder.svg?height=60&width=60"
            alt="Elite Barbers NYC"
            width={60}
            height={60}
            className="rounded-lg"
          />
          <div>
            <h2 className="font-semibold">Elite Barbers NYC</h2>
            <div className="flex items-center gap-1">
              <span>5.0</span>
              <span>★★★★★</span>
              <span className="text-muted-foreground">(1)</span>
            </div>
            <p className="text-sm text-muted-foreground">Manhattan, New York</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Regular Haircut</p>
              <p className="text-sm text-muted-foreground">20 mins with Rima</p>
            </div>
            <p>US$45</p>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>$45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2_SelectBarber

