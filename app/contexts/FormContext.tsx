import { createContext, useContext, useMemo } from "react";

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

export default function FormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { register } = useForm({
        clorofila: "",
        startDate: "",
        captureDate: "",
    });

    const multispectral = useBandImages();
    const refractance = useBandImages();

    const alreadyUploadImages = useMemo(
        () => multispectral.uploadedImages() && refractance.uploadedImages(),
        [multispectral, refractance]
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
