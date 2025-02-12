"use client"

import type React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RiAppleLine, RiBankCardLine, RiPaypalLine } from "@remixicon/react";
import { useId, useState } from "react";

type StepProps = {
  next?: (value?: string) => void;
};

const Step1_SelectService: React.FC<StepProps> = ({ next }) => {
  const services = [
    { value: "Striženje", icon: <RiBankCardLine className="opacity-60 text-white" size={20} aria-hidden="true" /> },
    { value: "Britje", icon: <RiPaypalLine className="opacity-60 text-white" size={20} aria-hidden="true" /> },
    { value: "Oboje", icon: <RiAppleLine className="opacity-60 text-white" size={20} aria-hidden="true" /> }
  ];

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const id = useId();

  const handleSelect = (value: string) => {
    setSelectedService(value);
  };

  return (
    <div className="w-[1280px] flex items-start justify-start flex-col">
      <h2 className="text-xl font-semibold mb-4 text-white">Izberi storitev</h2>

      <RadioGroup value={selectedService} onValueChange={handleSelect} className="grid-cols-3 w-fit">
        {services.map((service, index) => (
          <label
            key={index}
            className="relative hover:bg-white/[0.1] flex cursor-pointer flex-col items-center gap-3 rounded-lg border  px-2 py-3 text-center shadow-sm  outline-offset-2 transition-colors  has-[[data-state=checked]]:bg-yellow-200/[0.1] has-[[data-state=checked]]:border-yellow-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:border-white"
          >
            <RadioGroupItem id={`${id}-${index}`} value={service.value} className="sr-only after:absolute after:inset-0" />
            {service.icon}
            <p className="text-xs font-medium text-white leading-none text-foreground">{service.value}</p>
          </label>
        ))}
      </RadioGroup>

     
        <button
          onClick={() => next?.(selectedService)}
          className="block  px-4 py-2 bg-yellow-200/[0.7] text-white  my-2 rounded"
        >
          Naprej
        </button>
      
    </div>
  );
};

export default Step1_SelectService;
