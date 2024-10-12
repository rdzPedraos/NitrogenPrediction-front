import { createContext, useContext, useMemo } from "react";
import { CalendarDate } from "@internationalized/date";

import { use_mockup } from "@/env";
import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

type FormContextType = {
    BandTypes: typeof BandTypes;
    register: ReturnType<typeof useForm>["register"];
    alreadyUploadImages: boolean;
    images: {
        multispectral: ReturnType<typeof useBandImages>;
        refractance: ReturnType<typeof useBandImages>;
    };
};

const FormContext = createContext({} as FormContextType);

function defaultValues() {
    const now = new Date();

    return {
        clorofila: use_mockup ? 1 : null,
        startDate: new CalendarDate(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        ),
        captureDate: new CalendarDate(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate()
        ),
    };
}

export default function FormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { allFilled, register } = useForm(defaultValues());

    const multispectral = useBandImages();
    const refractance = useBandImages();

    const alreadyUploadImages = useMemo(
        () =>
            multispectral.uploadedImages &&
            refractance.uploadedImages &&
            allFilled,
        [multispectral, refractance, allFilled]
    );

    return (
        <FormContext.Provider
            value={{
                BandTypes,
                register,
                alreadyUploadImages,
                images: { multispectral, refractance },
            }}
        >
            {children}
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
