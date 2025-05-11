interface StepsProps {
    currentStep: number;
    totalSteps: number;
}

export function Steps({ currentStep, totalSteps }: StepsProps) {
    const steps = [
        { id: 1, name: 'Data Diri' },
        { id: 2, name: 'Orang Tua' },
        { id: 3, name: 'Asal Sekolah' },
        { id: 4, name: 'Upload Foto' },
        { id: 5, name: 'Ringkasan' },
    ];

    return (
        <div className="mb-6 w-full">
            <div className="flex items-center justify-between">
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                                step.id === currentStep
                                    ? 'bg-primary text-primary-foreground'
                                    : step.id < currentStep
                                      ? 'bg-primary/20 text-primary border-primary border'
                                      : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            {step.id}
                        </div>
                        <span
                            className={`mt-2 text-xs sm:text-sm ${
                                step.id === currentStep ? 'text-primary font-medium' : step.id < currentStep ? 'font-medium' : 'text-muted-foreground'
                            }`}
                        >
                            {step.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="bg-muted mt-4 h-2 overflow-hidden rounded-full">
                <div
                    className="bg-primary h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                />
            </div>
        </div>
    );
}
