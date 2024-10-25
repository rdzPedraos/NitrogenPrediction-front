import { useMemo, useState } from "react";
import { BasicForm, ProcessingStatus } from "@/types/models";

import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

import { FormMockup, ProcessingStatusMockup } from "@/helpers/mockups";
import {
    processRequest,
    statusRequest,
    uploadRequest,
} from "@/helpers/requests";

type NitrogenControllerProps = ReturnType<typeof useForm<BasicForm>> & {
    BandTypes: typeof BandTypes;
    alreadyUploadImages: boolean;
    images: {
        multispectral: ReturnType<typeof useBandImages>;
        refractance: ReturnType<typeof useBandImages>;
    };

    processing: boolean;
    processImages: () => Promise<void>;
    status: ProcessingStatus;

    predict: () => Promise<void>;
};

function useNitrogenController(): NitrogenControllerProps {
    const { register, setData, data } = useForm(FormMockup());
    const multispectral = useBandImages("bands");
    const refractance = useBandImages("panels");

    const [status, setStatus] = useState(ProcessingStatusMockup());

    const alreadyUploadImages = useMemo(
        () => multispectral.uploadedImages && refractance.uploadedImages,
        [multispectral, refractance]
    );

    const processing = useMemo(() => {
        if (!status.length) return false;
        return status.some(({ status }) => !status);
    }, [status]);

    const processImages = async () => {
        if (data.session_id) return;
        if (!alreadyUploadImages) {
            throw new Error("No se han subido las imágenes");
        }

        const session_id = await uploadRequest(
            multispectral.images as unknown as File[],
            refractance.images as unknown as File[]
        );

        setData("session_id", session_id);

        new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                const status = await statusRequest(session_id);
                setStatus(status);
            }, 1000);

            processRequest(session_id)
                .then(resolve)
                .catch(reject)
                .finally(() => clearInterval(interval));
        });
    };

    const predict = async () => {};

    return {
        BandTypes,

        register,
        setData,
        data,
        images: { multispectral, refractance },
        alreadyUploadImages,

        processing,
        processImages,
        status,

        predict,
    };
}

export default useNitrogenController;
