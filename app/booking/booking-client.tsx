"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Step1_SelectService from "./step1-select-service"
import Step2_SelectBarber from "./step2-select-barber"
import Step3_SelectDate from "./step3-select-date"
import Summary from "./summary"
import BookingBreadcrumb from "@/components/booking-breadcrumb"

type QueryParams = {
  step?: string
  service?: string
  barber?: string
  date?: string
}

export default function BookingClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState("1")
  const [selectedService, setSelectedService] = useState("")
  const [selectedBarber, setSelectedBarber] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  useEffect(() => {
    setCurrentStep(searchParams.get("step") || "1")
    setSelectedService(searchParams.get("service") || "")
    setSelectedBarber(searchParams.get("barber") || "")
    setSelectedDate(searchParams.get("date") || "")
  }, [searchParams])

  const updateQuery = (newParams: QueryParams) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })
    router.push(`/booking?${params.toString()}`, { scroll: false })
  }

  // Determine which steps are enabled based on selections
  const getEnabledSteps = () => {
    const steps = ["1"] // Step 1 is always enabled
    if (selectedService) {
      steps.push("2")
      if (selectedBarber) {
        steps.push("3")
        if (selectedDate) {
          steps.push("4")
        }
      }
    }
    return steps
  }

  // Handle breadcrumb navigation
  const handleStepClick = (step: string) => {
    updateQuery({ step })
  }

  return (
    <div className="min-h-screen bg-black py-12 flex items-center justify-start w-screen flex-col">
      <div className="  min-w-[1280px] ">
          <BookingBreadcrumb onStepClick={handleStepClick} currentStep={currentStep} enabledSteps={getEnabledSteps()} />
      </div>

      <div className="max-w-7xl">
        {currentStep === "1" && <Step1_SelectService next={(service) => updateQuery({ step: "2", service })} />}
        {currentStep === "2" && (
          <Step2_SelectBarber
            next={(barber) => updateQuery({ step: "3", barber })}
            prev={() => updateQuery({ step: "1" })}
            selectedService={selectedService}
          />
        )}
        {currentStep === "3" && (
          <Step3_SelectDate next={(date) => updateQuery({ step: "4", date })} prev={() => updateQuery({ step: "2" })} />
        )}
        {currentStep === "4" && (
          <Summary
            prev={() => updateQuery({ step: "3" })}
            next={() => {}}
            service={selectedService}
            barber={selectedBarber}
            date={selectedDate}
          />
        )}
      </div>
    </div>
  )
}

