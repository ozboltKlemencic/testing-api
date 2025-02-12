"use client"

import type React from "react"

type StepProps = {
  next?: (value?: string) => void
  prev?: () => void
}

const Step3_SelectDate: React.FC<StepProps> = ({ next, prev }) => {
  const dates = ["10. februar", "11. februar", "12. februar"]

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Izberi datum</h2>
      {dates.map((d) => (
        <button key={d} onClick={() => next?.(d)} className="block w-full bg-yellow-500 text-white py-2 my-2 rounded">
          {d}
        </button>
      ))}
      <button onClick={prev} className="mt-4 bg-gray-400 text-white py-2 px-4 rounded">
        Nazaj
      </button>
    </div>
  )
}

export default Step3_SelectDate

