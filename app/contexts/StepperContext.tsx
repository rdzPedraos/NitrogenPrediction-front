import { createContext, useContext, useState } from "react";

type Steps = "upload" | "processing" | "result";
type StepperContextType = {
    step: Steps;
    setStep: (step: Steps) => void;
    stepPercentage: number;
};

const StepperContext = createContext({} as StepperContextType);

export default function StepperProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [step, setStep] = useState<Steps>("upload");
    const steps = ["upload", "processing", "result"];
    const stepPercentage = ((steps.indexOf(step) + 1) * 100) / steps.length;

    return (
        <StepperContext.Provider
            value={{
                step,
                setStep,
                stepPercentage,
            }}
        >
            {children}
        </StepperContext.Provider>
    );
}

export function useStepperContext() {
    const context = useContext(StepperContext);

    if (Object.keys(context).length === 0) {
        throw new Error(
            "useStepperContext must be used within a StepperProvider"
        );
    }

    return context;
}
