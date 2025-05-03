interface StepsProps {
  currentStep: number
  totalSteps: number
}

export function Steps({ currentStep, totalSteps }: StepsProps) {
  const steps = [
    { id: 1, name: "Data Diri" },
    { id: 2, name: "Orang Tua" },
    { id: 3, name: "Asal Sekolah" },
    { id: 4, name: "Upload Foto" },
    { id: 5, name: "Ringkasan" },
  ]

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium ${
                step.id === currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.id < currentStep
                    ? "bg-primary/20 text-primary border border-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step.id}
            </div>
            <span
              className={`mt-2 text-xs sm:text-sm ${
                step.id === currentStep
                  ? "font-medium text-primary"
                  : step.id < currentStep
                    ? "font-medium"
                    : "text-muted-foreground"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}
