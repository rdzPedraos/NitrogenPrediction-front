import { createContext, useContext } from "react";
import useNitrogenController from "@/hooks/useNitrogenController";

type FormContextType = ReturnType<typeof useNitrogenController>;

const FormContext = createContext({} as FormContextType);

export default function FormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const data = useNitrogenController();
    return <FormContext.Provider value={data}>{children}</FormContext.Provider>;
}

export function useFormContext() {
    const context = useContext(FormContext);

    if (Object.keys(context).length === 0) {
        throw new Error("useFormContext must be used within a FormProvider");
    }

    return context;
}
