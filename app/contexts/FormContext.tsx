import { createContext, useContext, useEffect, useState } from "react";
import { loadCache, saveCache } from "@/helpers/session";
import useNitrogenController from "@/hooks/useNitrogenController";
import useStepper from "@/hooks/useStepper";
import useSideBar from "@/hooks/useSideBar";

type FormContextType = ReturnType<typeof useNitrogenController> &
    ReturnType<typeof useStepper> &
    ReturnType<typeof useSideBar>;

const FormContext = createContext({} as FormContextType);

export default function FormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    const sidebarprops = useSideBar();
    const { setStep, ...sprops } = useStepper();
    const { data, setData, ...ncprops } = useNitrogenController();

    useEffect(() => {
        const session = loadCache("session_id");
        if (session) setData("session_id", session);

        setTimeout(() => {
            setLoading(false);
        }, 5);
    }, []);

    useEffect(() => {
        setStep(data.session_id ? "processing" : "upload");
        saveCache("session_id", data.session_id);
    }, [data.session_id, setStep]);

    return (
        <FormContext.Provider
            value={{
                setData,
                data,
                setStep,
                ...sprops,
                ...ncprops,
                ...sidebarprops,
            }}
        >
            {!loading && children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    const context = useContext(FormContext);

    if (Object.keys(context).length === 0) {
        throw new Error("useFormContext must be used within a FormProvider");
    }

    return context;
}
