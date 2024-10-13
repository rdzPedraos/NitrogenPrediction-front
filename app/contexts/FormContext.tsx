import { createContext, useContext, useMemo, useState } from "react";
import { FilterImage, NitrogenPredict } from "@/types/models";

import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

import { FormMockup } from "@/helpers/mockups";
import { nitrogenPredict, processImages } from "@/helpers/requests";
import { useDisclosure } from "@nextui-org/react";

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
    predict: () => Promise<void>;
    prediction?: NitrogenPredict;
    modalDisclosure: ReturnType<typeof useDisclosure>;
};

const FormContext = createContext({} as FormContextType);

export default function FormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const modalDisclosure = useDisclosure();
    const { allFilled, register } = useForm(FormMockup());
    const [filterImages, setFilterImages] = useState<FilterImage[]>([]);
    const [prediction, setPrediction] = useState<NitrogenPredict>();
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

    const predict = async () => {
        if (!prediction) {
            const result = await nitrogenPredict();
            setPrediction(result);
        }
        modalDisclosure.onOpen();
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
                predict,
                prediction,
                modalDisclosure,
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
