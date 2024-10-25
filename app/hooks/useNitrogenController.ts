import { useEffect, useMemo, useState } from "react";
import {
    BasicForm,
    NitrogenPrediction,
    ProcessingStatus,
} from "@/types/models";

import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

import { saveCache } from "@/helpers/session";
import { FormMockup, ProcessingStatusMockup } from "@/helpers/mockups";
import {
    predictRequest,
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

    clearSession: () => void;

    processing: boolean;
    processImages: () => Promise<void>;
    status: ProcessingStatus;

    predict: () => Promise<void>;
    prediction: NitrogenPrediction;
};

function useNitrogenController(): NitrogenControllerProps {
    const { register, setData, data } = useForm(FormMockup());
    const multispectral = useBandImages("bands");
    const refractance = useBandImages("panels");

    const [status, setStatus] = useState(ProcessingStatusMockup());
    const [prediction, setPrediction] = useState({} as NitrogenPrediction);

    const alreadyUploadImages = useMemo(
        () => multispectral.uploadedImages && refractance.uploadedImages,
        [multispectral, refractance]
    );

    const processing = useMemo(() => {
        if (!status.length) return false;
        return status.some(({ status }) => !status);
    }, [status]);

    useEffect(() => {
        if (!data.session_id) return;
        statusRequest(data.session_id).then(setStatus);
    }, [data.session_id]);

    useEffect(() => {
        if (!(data.session_id && processing)) return;

        const interval = setInterval(() => {
            statusRequest(data.session_id as string).then(setStatus);
        }, 2000);

        return () => clearInterval(interval);
    }, [processing, data.session_id]);

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
        processRequest(session_id);
    };

    const clearSession = () => {
        setData("session_id", "");
        saveCache("session_id", "");
    };

    const predict = async () => {
        if (!data.session_id) return;

        const prediction = await predictRequest(data.session_id, data);
        setPrediction(prediction);
    };

    return {
        BandTypes,

        register,
        setData,
        data,
        images: { multispectral, refractance },
        alreadyUploadImages,

        clearSession,

        processing,
        processImages,
        status,

        predict,
        prediction,
    };
}

export default useNitrogenController;
