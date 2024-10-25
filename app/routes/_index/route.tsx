import type { MetaFunction } from "@remix-run/node";
import { Progress } from "@nextui-org/react";

import FormProvider from "@/contexts/FormContext";
import StepperProvider, { useStepperContext } from "@/contexts/StepperContext";
import { FormView, Preview, Prediction } from "./partials";

export const meta: MetaFunction = () => {
    return [
        { title: "Prediccion de nitrogeno" },
        { name: "description", content: "Prediccion de nitrogeno en cultivos" },
    ];
};

export default function Index() {
    return (
        <StepperProvider>
            <FormProvider>
                <RenderProgress />
                <div className="max-w-6xl px-4 mx-auto my-16">
                    <RenderComponent />
                </div>
            </FormProvider>
        </StepperProvider>
    );
}

function RenderProgress() {
    const { stepPercentage } = useStepperContext();

    return (
        <Progress
            aria-label="Loading..."
            value={stepPercentage}
            radius="none"
            classNames={{
                base: "fixed top-0 w-full z-50",
                track: "bg-default-300/90 h-4",
                indicator: "bg-gradient-primary",
            }}
        />
    );
}

function RenderComponent() {
    const { step } = useStepperContext();

    return {
        upload: <FormView />,
        processing: <Preview />,
        result: <Prediction />,
    }[step];
}
