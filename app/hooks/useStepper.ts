import { useState } from "react";
type Steps = "upload" | "processing" | "result";

function useStepper() {
    const [step, setStep] = useState<Steps>("upload");
    const steps = ["upload", "processing", "result"];
    const stepPercentage = ((steps.indexOf(step) + 1) * 100) / steps.length;

    return {
        step,
        setStep,
        stepPercentage,
    };
}

export default useStepper;
