"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BookingStep {
  name: string
  step: string
  enabled: boolean
  active: boolean
}

interface BookingBreadcrumbProps {
  onStepClick: (step: string) => void
  currentStep: string
  enabledSteps: string[]
}

export default function BookingBreadcrumb({ onStepClick, currentStep, enabledSteps }: BookingBreadcrumbProps) {
  const steps: BookingStep[] = [
    {
      name: "Storitev",
      step: "1",
      enabled: true, // Services is always enabled
      active: currentStep === "1",
    },
    {
      name: "Brivec",
      step: "2",
      enabled: enabledSteps.includes("2"),
      active: currentStep === "2",
    },
    {
      name: "Termin",
      step: "3",
      enabled: enabledSteps.includes("3"),
      active: currentStep === "3",
    },
    {
      name: "Predogled",
      step: "4",
      enabled: enabledSteps.includes("4"),
      active: currentStep === "4",
    },
  ]

  return (
    <div className="flex items-center gap-2 text-sm mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.step}>
          {index > 0 && <span className="text-muted-foreground">›</span>}
          <button
            onClick={() => step.enabled && onStepClick(step.step)}
            className={cn(
              "transition-colors",
              step.enabled ? "cursor-pointer hover:text-yellow-300" : "cursor-default",
              step.active
                ? "text-white font-medium"
                : step.enabled
                  ? "text-neutral-400"
                  : "text-neutral-400",
            )}
            disabled={!step.enabled}
          >
            {step.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

