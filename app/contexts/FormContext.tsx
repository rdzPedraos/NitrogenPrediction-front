import { createContext, useContext, useEffect } from "react";
import useNitrogenController from "@/hooks/useNitrogenController";
import { useStepperContext } from "./StepperContext";
import { loadCache, saveCache } from "@/helpers/session";

type FormContextType = ReturnType<typeof useNitrogenController>;

const FormContext = createContext({} as FormContextType);

export default function FormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setStep } = useStepperContext();
    const data = useNitrogenController();

    useEffect(() => {
        const session = loadCache("session_id");
        if (session) data.setData("session_id", session);
    }, []);

    useEffect(() => {
        setStep(data.data.session_id ? "processing" : "upload");
        saveCache("session_id", data.data.session_id);
    }, [data.data.session_id, setStep]);

    return <FormContext.Provider value={data}>{children}</FormContext.Provider>;
}

export function useFormContext() {
    const context = useContext(FormContext);

    if (Object.keys(context).length === 0) {
        throw new Error("useFormContext must be used within a FormProvider");
    }

    return context;
}
