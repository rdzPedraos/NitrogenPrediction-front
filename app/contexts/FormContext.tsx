import { createContext, useContext, useMemo, useState } from "react";
import { FilterImage } from "@/types/models";

import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

import { FormMockup } from "@/helpers/mockups";
import { processImages } from "@/helpers/requests";

type FormContextType = {
    BandTypes: typeof BandTypes;
    register: ReturnType<typeof useForm>["register"];
    alreadyUploadImages: boolean;
    process: () => Promise<void>;
    filterImages: FilterImage[];
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
    const { allFilled, register } = useForm(FormMockup());
    const [filterImages, setFilterImages] = useState<FilterImage[]>([]);
    const multispectral = useBandImages();
    const refractance = useBandImages();

    const alreadyUploadImages = useMemo(
        () =>
            multispectral.uploadedImages &&
            refractance.uploadedImages &&
            allFilled,
        [multispectral, refractance, allFilled]
    );

    const process = async () => {
        const images = await processImages();
        setFilterImages(images);
    };

    return (
        <FormContext.Provider
            value={{
                BandTypes,
                register,
                alreadyUploadImages,
                images: { multispectral, refractance },
                process,
                filterImages,
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
