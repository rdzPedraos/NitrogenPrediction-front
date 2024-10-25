import type { MetaFunction } from "@remix-run/node";
import { Progress } from "@nextui-org/react";

import FormProvider, { useFormContext } from "@/contexts/FormContext";
import { FormView, Preview, Prediction, Drawable } from "./partials";

export const meta: MetaFunction = () => {
    return [
        { title: "Prediccion de nitrogeno" },
        { name: "description", content: "Prediccion de nitrogeno en cultivos" },
    ];
};

export default function Index() {
    return (
        <FormProvider>
            <div className="grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] h-screen">
                <div className="col-span-2 shadow">
                    <RenderProgress />
                </div>

                <Drawable />

                <div className="overflow-y-auto">
                    <div className="px-6 py-4 xl:py-16 max-w-6xl mx-auto">
                        <RenderComponent />
                    </div>
                </div>
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
