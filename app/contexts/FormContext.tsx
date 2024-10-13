import { createContext, useContext, useMemo, useState } from "react";
import { CalendarDate } from "@internationalized/date";

import { use_mockup } from "@/env";
import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

type FormContextType = {
    BandTypes: typeof BandTypes;
    register: ReturnType<typeof useForm>["register"];
    alreadyUploadImages: boolean;
    processImages: () => Promise<void>;
    filterImages: FilterImage[];
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

async function _processImages(): Promise<FilterImage[]> {
    if (use_mockup) {
        return [
            {
                key: "default",
                label: "Imagen original",
                preview: "/mockup/preview/normal.png",
            },
            {
                key: "GNDVI",
                label: "Green Normalized Difference Vegetation Index",
                histogram: "/mockup/histograms/GNDVI.png",
                preview: "/mockup/preview/GNDVI.png",
            },
            {
                key: "NDVI",
                label: "Normalized difference vegetation index",
                histogram: "/mockup/histograms/NDVI.png",
                preview: "/mockup/preview/NDVI.png",
            },
        ];
    }

    return [];
}

export default function FormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { allFilled, register } = useForm(defaultValues());
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

    const processImages = async () => {
        const images = await _processImages();
        setFilterImages(images);
    };

    return (
        <FormContext.Provider
            value={{
                BandTypes,
                register,
                alreadyUploadImages,
                images: { multispectral, refractance },
                processImages,
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
