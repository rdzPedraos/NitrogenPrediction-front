import { useMemo } from "react";
import { useDisclosure } from "@nextui-org/react";
import { FilterImage, NitrogenPredict } from "@/types/models";

import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

import { FormMockup } from "@/helpers/mockups";
import { processRequest, uploadRequest } from "@/helpers/requests";

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
        if (!alreadyUploadImages) return;

        if (!data.session_id) {
            const session_id =
                data.session_id ||
                (await uploadRequest(
                    multispectral.images as unknown as File[],
                    refractance.images as unknown as File[]
                ));

            setData("session_id", session_id);
            processRequest(session_id);
        }
    };

    const predict = async () => {};

    return {
        BandTypes,
        register,
        alreadyUploadImages,
        images: { multispectral, refractance },
        process,
        filterImages: [],
        predict,
        prediction: undefined,
        modalDisclosure,
    };
}

export default useNitrogenController;
