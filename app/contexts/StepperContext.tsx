import { createContext, useContext, useState } from "react";

type StepperContextType = {
    step: number;
    setStep: (step: number) => void;
    next: () => void;
    prev: () => void;
};

const StepperContext = createContext({} as StepperContextType);

export default function StepperProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [step, setStep] = useState<number>(0);

    const next = () => setStep((s) => s + 1);
    const prev = () => setStep((s) => s - 1);

    return (
        <StepperContext.Provider
            value={{
                step,
                setStep,
                next,
                prev,
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
