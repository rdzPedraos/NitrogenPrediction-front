import { useEffect, useMemo, useState } from "react";
import {
    BasicForm,
    NitrogenPrediction,
    ProcessingStatus,
    RoiStatistics,
} from "@/types/models";

import useForm from "@/hooks/useForm";
import useBandImages, { BandTypes } from "@/hooks/useBandImages";

import { saveCache } from "@/helpers/session";

import {
    defaultForm,
    defaultPrediction,
    defaultProcessingStatus,
} from "@/helpers/mockups";

import {
    getStatisticsRequest,
    predictRequest,
    processRequest,
    statusRequest,
    uploadRequest,
} from "@/helpers/requests";

type NitrogenControllerProps = {
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

    getStatistics: (
        roi: BasicForm["roi_coordinates"],
        band: string
    ) => Promise<RoiStatistics>;
} & ReturnType<typeof useForm<BasicForm>>;

function useNitrogenController(): NitrogenControllerProps {
    const { register, setData, data } = useForm(defaultForm());
    const multispectral = useBandImages();
    const refractance = useBandImages();

    const [status, setStatus] = useState(defaultProcessingStatus());
    const [prediction, setPrediction] = useState(defaultPrediction());

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

    const getStatistics = async (
        roi: BasicForm["roi_coordinates"],
        band: string
    ) => {
        if (!data.session_id) {
            throw new Error("No hay una sesión activa");
        }

        const statistics = await getStatisticsRequest(
            data.session_id,
            roi,
            band
        );
        return statistics;
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

        getStatistics,
    };
}

export default useNitrogenController;
