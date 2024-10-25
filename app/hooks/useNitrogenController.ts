import { useMemo, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { FilterImage, NitrogenPredict } from "@/types/models";

import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

import { FormMockup } from "@/helpers/mockups";
import { nitrogenPredict, processImages } from "@/helpers/requests";

type NitrogenControllerProps = {
    BandTypes: typeof BandTypes;
    register: ReturnType<typeof useForm>["register"];
    alreadyUploadImages: boolean;
    images: {
        multispectral: ReturnType<typeof useBandImages>;
        refractance: ReturnType<typeof useBandImages>;
    };

    process: () => Promise<void>;
    filterImages: FilterImage[];

    predict: () => Promise<void>;
    prediction?: NitrogenPredict;
    modalDisclosure: ReturnType<typeof useDisclosure>;
};

function useNitrogenController(): NitrogenControllerProps {
    const { register, setData, data } = useForm(FormMockup());
    const multispectral = useBandImages("bands");
    const refractance = useBandImages("panels");
    const modalDisclosure = useDisclosure();

    const alreadyUploadImages = useMemo(
        () => multispectral.uploadedImages && refractance.uploadedImages,
        [multispectral, refractance]
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

    return {
        BandTypes,
        register,
        alreadyUploadImages,
        images: { multispectral, refractance },
        process,
        filterImages,
        predict,
        prediction,
        modalDisclosure,
    };
}

export default useNitrogenController;
