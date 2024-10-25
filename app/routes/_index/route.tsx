import type { MetaFunction } from "@remix-run/node";
import { Progress } from "@nextui-org/react";

import FormProvider, { useFormContext } from "@/contexts/FormContext";
import { FormView, Preview, Prediction } from "./partials";

export const meta: MetaFunction = () => {
    return [
        { title: "Prediccion de nitrogeno" },
        { name: "description", content: "Prediccion de nitrogeno en cultivos" },
    ];
};

export default function Index() {
    return (
        <FormProvider>
            <RenderProgress />
            <div className="max-w-6xl px-4 mx-auto my-16">
                <RenderComponent />
            </div>
        </FormProvider>
    );
}

function RenderProgress() {
    const { stepPercentage } = useFormContext();

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
    const { step } = useFormContext();

    return {
        upload: <FormView />,
        processing: <Preview />,
        result: <Prediction />,
    }[step];
}
